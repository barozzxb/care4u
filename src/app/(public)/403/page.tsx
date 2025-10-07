import { Link } from "lucide-react";

const Forbidden = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-9xl font-bold text-red-600 mb-4">403</h1>
            <p className="text-2xl text-gray-700 mb-8">Access Forbidden</p>
            <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">Go to Home</Link>
        </div>
    );
}

export default Forbidden;