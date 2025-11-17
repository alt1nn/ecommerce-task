import PublicLayout from '@/layouts/public-layout';
import { router } from '@inertiajs/react';

export default function Home({ products }) {

    const addToCart = (id: number) => {
        router.post('/cart', { product_id: id, quantity: 1 });
    };

    return (
        <PublicLayout>

            <div className="max-w-7xl mx-auto px-4 py-10">

                <h1 className="text-3xl font-bold mb-6">Our Products</h1>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                    {products.map((p) => (
                        <div key={p.id} className="bg-white shadow-sm rounded-lg p-5">
                            <h3 className="text-lg font-semibold">{p.name}</h3>
                            <p className="text-gray-600">${p.price}</p>
                            <p className="text-sm text-gray-500">Stock: {p.stock_quantity}</p>

                            <button
                                onClick={() => addToCart(p.id)}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}

                </div>
            </div>

        </PublicLayout>
    );
}
