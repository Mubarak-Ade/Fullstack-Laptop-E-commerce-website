import z from 'zod';
const DashboardSchema = z.object({
    stats: z.object({
        totalRevenue: z.number(),
        todayRevenue: z.number(),
        todayOrders: z.number(),
        pendingOrders: z.number(),
    }),
    revenueLast7Days: z.array(z.object({
        _id: z.string(),
        revenue: z.number(),
    })),
    recentOrders: z.array(z.object({
        _id: z.string(),
        user: z.object({
            _id: z.string(),
            firstName: z.string(),
            lastName: z.string()
        }),
        total: z.number(),
        status: z.enum(['PENDING_PAYMENT', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED']),
        createdAt: z.string(),
    })),
});
