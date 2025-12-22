import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Care4U - Sức khỏe và đặt lịch",
  description: "Nền tảng chăm sóc sức khỏe và đặt lịch hẹn",
};

import { isTokenExpired } from "@/utils/checkToken";
import { logout } from "@/services/authService";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }
            if (isTokenExpired(token)) {
                const message = await logout();
                console.log(message);
                toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            }
        }
        checkAuth();
    }, [pathname]);

    return <>{children}</>;
}
