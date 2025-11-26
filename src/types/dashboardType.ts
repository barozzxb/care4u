export interface DashboardStats {
    numberedData: {
        totalAccounts: number;
        activeAccounts: number;
    };
    chartData: object;
    recentAccounts: Array<{
        email: string;
        role: string;
        status: boolean;
    }>;
}