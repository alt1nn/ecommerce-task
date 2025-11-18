import { Link, usePage, router } from "@inertiajs/react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";

export default function PublicLayout({ children }) {

    const { cartCount, auth, flash } = usePage().props;
    const user = auth?.user;

    const [showFlash, setShowFlash] = useState(true);

    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e.target.value);

        router.get("/products", { search: e.target.value }, {
            preserveState: true,
            replace: true
        });
    };

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-gray-100">

            {showFlash && flash?.success && (
                <div className="fixed top-4 right-4 w-80 animate-in fade-in-0 slide-in-from-top-4 z-50">
                    <Alert>
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                </div>
            )}

            {showFlash && flash?.error && (
                <div className="fixed top-4 right-4 w-80 animate-in fade-in-0 slide-in-from-top-4 z-50">
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{flash.error}</AlertDescription>
                    </Alert>
                </div>
            )}

            <nav className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        <Link href="/" className="text-xl font-bold text-gray-900">
                            MyStore
                        </Link>

                        <div className="flex-1 px-6">
                            <input
                                type="text"
                                value={search}
                                onChange={handleSearch}
                                placeholder="Search products..."
                                className="w-full border rounded px-3 py-1"
                            />
                        </div>

                        <div className="flex items-center space-x-6">

                            <Link href="/cart" className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                    className="w-6 h-6 text-gray-700 hover:text-gray-900">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 
                                        1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 
                                        1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 
                                        0 0 1 5.513 7.5h12.974c.576 0 
                                        1.059.435 1.119 1.007ZM8.625 10.5a.375.375 
                                        0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 
                                        0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>

                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white
                                        text-xs rounded-full px-1.5">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {!user && (
                                <Link href="/login">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                        className="w-7 h-7 text-gray-700 hover:text-gray-900">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 
                                            3.75 3.75 0 0 1 7.5 0ZM4.501 
                                            20.118a7.5 7.5 0 0 1 14.998 
                                            0A17.933 17.933 0 0 1 12 
                                            21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </Link>
                            )}

                            {user && (
                                <button
                                    onClick={() => router.post('/logout')}
                                    className="text-red-600 hover:text-red-800 font-medium"
                                >
                                    Logout
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}
