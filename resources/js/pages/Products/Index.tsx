import { router } from '@inertiajs/react';

export default function Index({ products }: { products: any }) {

    const addToCart = (productId: number) => {
        router.post('/cart', {
            product_id: productId,
            quantity: 1,
        });
    };

    return (
        <div>
            <h1>Products</h1>

            {products.map((p: any) => (
                <div key={p.id}>
                    {p.name} - ${p.price} - Stock: {p.stock_quantity}

                    <button
                        onClick={() => addToCart(p.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded ml-3"
                    >
                        Add to cart
                    </button>
                </div>
            ))}
        </div>
    );
}
