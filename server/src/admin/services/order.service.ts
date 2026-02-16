import mongoose, {
    Aggregate,
    CustomAggregationExpressionOperator,
    PipelineStage,
    UpdateWithAggregationPipeline,
} from 'mongoose';
import Order from '../../models/Order.js';

const today = new Date();
today.setHours(0, 0, 0, 0);

const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
sevenDaysAgo.setHours(0, 0, 0, 0);

const revenueStatuses = ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'];

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
                {$unwind: "$user"},
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

    static async getOrders() {
        const result = await Order.find({}).lean();
        return result;
    }
}

export default AdminOrderServices;
