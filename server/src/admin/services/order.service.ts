import mongoose, {
    Aggregate,
    CustomAggregationExpressionOperator,
    PipelineStage,
    UpdateWithAggregationPipeline,
} from 'mongoose';
import Order from '../../models/Order.js';
import createHttpError from 'http-errors';

const today = new Date();
today.setHours(0, 0, 0, 0);

const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
sevenDaysAgo.setHours(0, 0, 0, 0);

const revenueStatuses = ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
const validStatuses = [
    'PENDING_PAYMENT',
    'PAID',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
] as const;

const dashboardPipeline: PipelineStage[] = [
    {
        $facet: {
            // =========================
            // 1️⃣ OVERALL STATS
            // =========================
            stats: [
                {
                    $group: {
                        _id: null,

                        totalRevenue: {
                            $sum: {
                                $cond: [{ $in: ['$status', revenueStatuses] }, '$total', 0],
                            },
                        },

                        todayRevenue: {
                            $sum: {
                                $cond: [
                                    {
                                        $and: [
                                            { $in: ['$status', revenueStatuses] },
                                            { $gte: ['$createdAt', today] },
                                        ],
                                    },
                                    '$total',
                                    0,
                                ],
                            },
                        },

                        todayOrders: {
                            $sum: {
                                $cond: [{ $gte: ['$createdAt', today] }, 1, 0],
                            },
                        },

                        pendingOrders: {
                            $sum: {
                                $cond: [{ $eq: ['$status', 'PENDING_PAYMENT'] }, 1, 0],
                            },
                        },
                    },
                },
            ],

            // =========================
            // 2️⃣ REVENUE LAST 7 DAYS
            // =========================
            revenueLast7Days: [
                {
                    $match: {
                        status: { $in: revenueStatuses },
                        createdAt: { $gte: sevenDaysAgo },
                    },
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: '%Y-%m-%d',
                                date: '$createdAt',
                            },
                        },
                        revenue: { $sum: '$total' },
                    },
                },
                { $sort: { _id: 1 } },
            ],

            // =========================
            // 3️⃣ RECENT ORDERS
            // =========================
            recentOrders: [
                { $sort: { createdAt: -1 } },
                { $limit: 5 },
                {
                    $lookup: {
                        from: 'users',
                        as: 'user',
                        localField: 'userId',
                        foreignField: '_id',
                    },
                },
                { $unwind: '$user' },
                {
                    $project: {
                        _id: 1,
                        user: {
                            _id: 1,
                            firstName: 1,
                            lastName: 1,
                        },
                        total: 1,
                        status: 1,
                        createdAt: 1,
                    },
                },
            ],
        },
    },
];

class AdminOrderServices {
    static async getDashboard() {
        let [result] = await Order.aggregate(dashboardPipeline);

        result = {
            stats: (result.stats[0] as any) || {
                totalRevenue: 0,
                todayRevenue: 0,
                todayOrders: 0,
                pendingOrders: 0,
            },
            revenueLast7Days: result.revenueLast7Days || [],
            recentOrders: result.recentOrders || [],
        };
        return result;
    }

    static async getOrders(query: any) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const filter: any = {};
        if (query.status && query.status !== 'ALL') {
            filter.status = query.status;
        }
        if (query.paymentProvider && query.paymentProvider !== 'ALL') {
            filter.paymentProvider = query.paymentProvider;
        }
        if (query.from || query.to) {
            const fromDate = query.from ? new Date(query.from) : null;
            const toDate = query.to ? new Date(query.to) : null;

            if (fromDate) {
                fromDate.setHours(0, 0, 0, 0);
            }
            if (toDate) {
                toDate.setHours(23, 59, 59, 999);
            }

            filter.createdAt = {
                ...(fromDate ? { $gte: fromDate } : {}),
                ...(toDate ? { $lte: toDate } : {}),
            };
        }
        const hasMinTotal = query.minTotal !== undefined && query.minTotal !== '';
        const hasMaxTotal = query.maxTotal !== undefined && query.maxTotal !== '';

        if (hasMinTotal || hasMaxTotal) {
            const minTotal = Number(query.minTotal);
            const maxTotal = Number(query.maxTotal);
            const totalFilter: Record<string, number> = {};

            if (Number.isFinite(minTotal)) {
                totalFilter.$gte = minTotal;
            }
            if (Number.isFinite(maxTotal)) {
                totalFilter.$lte = maxTotal;
            }

            if (Object.keys(totalFilter).length > 0) {
                filter.total = totalFilter;
            }
        }
        if (query.search) {
            const search = String(query.search).trim();
            if (search.length > 0) {
                if (mongoose.Types.ObjectId.isValid(search)) {
                    filter._id = new mongoose.Types.ObjectId(search);
                } else {
                    filter.$or = [
                        { orderNumber: { $regex: search, $options: 'i' } },
                        { paymentReference: { $regex: search, $options: 'i' } },
                        { 'shippingAddress.email': { $regex: search, $options: 'i' } },
                    ];
                }
            }
        }
        const [order, total] = await Promise.all([
            Order.find(filter)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),
            Order.countDocuments(filter),
        ]);
        return { order, total };
    }

    static async updateOrderStatus(orderId: string, status: (typeof validStatuses)[number]) {
        if (!validStatuses.includes(status)) {
            throw new Error('Invalid order status');
        }
        const order = await Order.findById(orderId);

        if (!order) {
            throw createHttpError(404, 'Order Not Found');
        }

        order.status = status;

        await order.save();

        return order;
    }

    static async updateOrdersStatus(orderIds: string[], status: (typeof validStatuses)[number]) {
        if (!validStatuses.includes(status)) {
            throw new Error('Invalid order status');
        }
        const result = await Order.updateMany(
            { _id: { $in: orderIds } },
            { $set: { status } }
        );
        return result.modifiedCount;
    }   

    static async getOrderById(orderId: string) {
        const order = await Order.findById(orderId);
        if (!order) {
            throw createHttpError(404, 'Order Not Found');
        }
        return order;
    }

    static async deleteOrder(orderId: string) {
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            throw createHttpError(404, 'Order Not Found');
        }
        return order;
    }

    static async deleteMany(orderIds: string[]) {
        const result = await Order.deleteMany({ _id: { $in: orderIds } });
        return result.deletedCount;
    }
}

export default AdminOrderServices;
