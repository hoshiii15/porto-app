import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
    return function AuthenticatedComponent(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [isLoading, setIsLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/admin/login');
            } else {
                // Optionally verify token with backend
                setIsAuthenticated(true);
            }
            setIsLoading(false);
        }, [router]);

        if (isLoading) {
            return (
                <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                    <div className="text-white text-lg">Loading...</div>
                </div>
            );
        }

        if (!isAuthenticated) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
