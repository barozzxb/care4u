import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth(protectedRole?: string) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token) {
            router.push('/login');
        } else if (protectedRole && role !== protectedRole) {
            router.push('/403');
        } else {
            setLoading(false);
        }
    }, [protectedRole, router]);
    return { loading };
}