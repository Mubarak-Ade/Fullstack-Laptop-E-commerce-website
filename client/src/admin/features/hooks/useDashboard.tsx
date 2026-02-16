import { queryOptions } from "@tanstack/react-query";
import { dashboard } from "../api/dashboard";
import type { Dashboard } from "@/admin/schema/dashboardSchema";

export const useDashboard = () => {
    return queryOptions<Dashboard>({
        queryKey: ['dashboard'],
        queryFn: dashboard
    })
}