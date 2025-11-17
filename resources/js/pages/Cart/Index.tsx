/* eslint-disable @typescript-eslint/no-explicit-any */
import { router } from '@inertiajs/react';
import { useRef } from 'react';

export default function Index({ items }: any) {
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

    return (
        <div>
            <h1>Cart</h1>

            {items.length === 0 && <p>Your cart is empty.</p>}

            {items.map((item: any) => (
                <div key={item.id} className="mb-3">
                    {item.product.name} – {item.quantity} pcs

                    <input
                        type="number"
                        min="1"
                        defaultValue={item.quantity}
                        onChange={(e) => handleQuantityChange(item.product_id, e.target.value)}
                        onBlur={(e) => updateQuantity(item.product_id, parseInt(e.target.value))}
                        className="border ml-3 px-2 py-1 w-16"
                    />

                    <button
                        onClick={() => removeItem(item.product_id)}
                        className="ml-3 text-red-600"
                    >
                        Remove
                    </button>
                </div>
            ))}

            <button
                onClick={() => router.post('/checkout')}
                className="mt-5 px-4 py-2 bg-green-600 text-white rounded"
            >
                Checkout
            </button>

        </div>
    );
}
