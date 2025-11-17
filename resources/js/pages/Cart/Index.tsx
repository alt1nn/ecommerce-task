export default function Index({ items }: any) {
    return (
        <div>
            <h1>Cart</h1>

            {items.length === 0 && <p>Your cart is empty.</p>}

            {items.map((item: any) => (
                <div key={item.id}>
                    {item.product.name} - {item.quantity} pcs
                </div>
            ))}
        </div>
    );
}
