import { AdminCard } from '../components/AdminCard';
import { useQuery } from '@tanstack/react-query';
import { useDashboard } from '../features/dashboard/hooks';
import { Banknote, Coins, ShoppingBag, ShoppingBasket } from 'lucide-react';
import { priceFormat, resolveStatus } from '@/utils/format';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format, formatDistance } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const AdminOverview = () => {
    const { data: dashboard } = useQuery(useDashboard());

    const data = {
        labels: dashboard?.revenueLast7Days.map(revenue => format(revenue._id, 'EEEE')),
        datasets: [
            {
                height: '1000px',
                backgroundColor: '#0b66fe23',
                label: 'Sales Performance',
                data: dashboard?.revenueLast7Days.map(revenue => revenue.revenue),
            },
        ],
    };

    console.log(dashboard);

    return (
        <div>
            <div className="p-5 grid grid-cols-4 gap-5">
                <AdminCard
                    title="Total Revenue"
                    value={priceFormat(dashboard?.stats.totalRevenue as number)}
                    icon={{ type: Banknote, color: 'bg-primary/10 text-primary' }}
                />
                <AdminCard
                    title="Todays Order"
                    value={dashboard?.stats.todayOrders}
                    icon={{ type: ShoppingBag, color: 'bg-amber-600/10 text-amber-600' }}
                />
                <AdminCard
                    title="Todays Revenue"
                    value={dashboard?.stats.todayRevenue}
                    icon={{ type: Coins, color: 'bg-green-600/10 text-green-600' }}
                />
                <AdminCard
                    title="Pending Orders"
                    value={dashboard?.stats.pendingOrders}
                    icon={{ type: ShoppingBasket, color: 'bg-purple-600/10 text-purple-600' }}
                />
            </div>

            <div className="p-5 flex h-full overflow-hidden gap-5">
                <div className="max-w-2xl w-full border rounded-xl bg-light-fg dark:bg-dark-surface p-5">
                    {dashboard?.revenueLast7Days && (
                        <Bar data={data} options={{ maintainAspectRatio: false }} />
                    )}
                </div>
                <div className="p-5 border w-full max-w-xs rounded-xl overflow-hidden h-full bg-light-fg dark:bg-dark-surface">
                    <h2 className="text-xl font-bold text-black dark:text-white">Recent Orders</h2>
                    <ul className="mt-5 space-y-2">
                        {dashboard?.recentOrders.map(order => {
                            const status = resolveStatus(order.status);
                            const fullname =
                                order.user.firstName && order.user.lastName
                                    ? order.user.firstName + ' ' + order.user.lastName
                                    : 'unknown';

                            return (
                                <li key={order._id} className="flex justify-between items-center">
                                    <div className="">
                                        <h4 className="font-bold text-primary">
                                            {fullname || 'unknown'}
                                        </h4>
                                        <h6 className="text-secondary text-sm">
                                            {formatDistance(order.createdAt, Date.now())}
                                        </h6>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <h4 className="font-bold text-black dark:text-white">
                                            {priceFormat(order.total)}
                                        </h4>
                                        <h6
                                            className={`${status.className} text-center px-2 py-0.5 text-sm rounded-xl`}
                                        >
                                            {status.label}
                                        </h6>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <button className="px-4 w-full py-2 border mt-2 rounded-xl border-primary/20 text-primary">
                        View All Orders
                    </button>
                </div>
            </div>
        </div>
    );
};
