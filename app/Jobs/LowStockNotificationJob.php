<?php

namespace App\Jobs;

use App\Models\Product;
use Illuminate\Support\Facades\Mail;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class LowStockNotificationJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::raw(
            "Low stock alert: {$this->product->name} has only {$this->product->stock_quantity} left.",
            function ($message) {
                $message->to('altinramadani3@gmail.com')->subject('Low Stock Notification');
            }
        );
    }
}
