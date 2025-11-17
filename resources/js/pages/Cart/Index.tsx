import { router } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useRef } from 'react';

export default function Cart({ items }) {

    const timerRef = useRef<any>(null);

    const updateQuantity = (productId: number, quantity: number) => {
        router.put(`/cart/${productId}`, { quantity });
    };

    const removeItem = (productId: number) => {
        router.delete(`/cart/${productId}`);
    };

    const handleQuantityChange = (productId: number, value: string) => {
        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            const quantity = parseInt(value);
            if (quantity > 0) {
                updateQuantity(productId, quantity);
            }
        }, 300);
    };

    const total = items.reduce(
        (sum: number, i: any) => sum + i.quantity * i.product.price,
        0
    );

    return (
        <PublicLayout>
            <div className="max-w-5xl mx-auto px-4 py-10">

                <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

                {items.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="space-y-4">

                        {items.map((item: any) => (
                            <div
                                key={item.id}
                                className="bg-white rounded shadow-sm p-4 flex items-center justify-between"
                            >

                                {/* left */}
                                <div>
                                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                                    <p className="text-gray-600">${item.product.price}</p>
                                </div>

                                {/* quantity */}
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        min="1"
                                        defaultValue={item.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(item.product_id, e.target.value)
                                        }
                                        onBlur={(e) =>
                                            updateQuantity(item.product_id, parseInt(e.target.value))
                                        }
                                        className="border px-3 py-1 w-20 text-center rounded"
                                    />
                                </div>

                                {/* total per item */}
                                <div className="font-semibold">
                                    ${item.quantity * item.product.price}
                                </div>

                                {/* remove */}
                                <button
                                    onClick={() => removeItem(item.product_id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Remove
                                </button>

                            </div>
                        ))}

                        {/* TOTAL */}
                        <div className="flex justify-between items-center mt-8">
                            <h2 className="text-2xl font-bold">Total: ${total}</h2>
                            <button
                                onClick={() => router.post('/checkout')}
                                className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Checkout
                            </button>
                        </div>

                    </div>
                )}

            </div>
        </PublicLayout>
    );
}
