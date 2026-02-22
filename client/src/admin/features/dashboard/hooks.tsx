import { queryOptions } from "@tanstack/react-query";
import type { Dashboard } from "@/admin/schema/dashboardSchema";
import { dashboard } from "./api";

export const useDashboard = () => {
    return queryOptions<Dashboard>({
        queryKey: ['dashboard'],
        queryFn: dashboard
    })
}