import type { Dashboard } from "@/admin/schema/dashboardSchema";
import api from "@/utils/axios";

export const dashboard = async () : Promise<Dashboard> => {
    const res = await api.get("/admin/dashboard")
    return res.data
} 