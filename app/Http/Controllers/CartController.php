<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\CartItem;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Jobs\LowStockNotificationJob;

class CartController extends Controller
{

    public function index()
    {
        $items = CartItem::with('product')
            ->where('user_id', Auth::id())
            ->get();

        return Inertia::render('Cart/Index', [
            'items' => $items
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|integer',
            'quantity' => 'required|integer|min:1'
        ]);

        $item = CartItem::firstOrNew([
            'user_id' => Auth::id(),
            'product_id' => $data['product_id'],
        ]);

        $item->quantity = ($item->exists ? $item->quantity : 0) + $data['quantity'];
        $item->save();

        return back();
    }

    public function update(Request $request, $productId)
    {
        $data = $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $item = CartItem::where('user_id', Auth::id())
            ->where('product_id', $productId)
            ->firstOrFail();

        $item->quantity = $data['quantity'];
        $item->save();

        return back();
    }

    public function destroy($productId)
    {
        CartItem::where('user_id', Auth::id())
            ->where('product_id', $productId)
            ->delete();

        return back();
    }

    public function checkout()
    {
        $userId = Auth::id();

        $items = CartItem::with('product')->where('user_id', $userId)->get();

        if ($items->isEmpty()) {
            return back()->with('message', 'Cart is empty');
        }

        $order = Order::create([
            'user_id' => $userId,
        ]);

        foreach ($items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->price,
            ]);

            $item->product->update([
                'stock_quantity' => $item->product->stock_quantity - $item->quantity
            ]);

            if ($item->product->stock_quantity <= 5) {
                dispatch(new LowStockNotificationJob($item->product));
            }
        }

        CartItem::where('user_id', $userId)->delete();

        return back()->with('message', 'Order completed successfully');
    }
}
