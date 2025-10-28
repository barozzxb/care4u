export interface DashboardStats {
    numberedData: {
        totalAccounts: number;
        activeAccounts: number;
    };
    chartData: {
        
    };
    recentAccounts: Array<{
        email: string;
        role: string;
        status: boolean;
    }>;
}