<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Models\OrderItem;
use Carbon\Carbon;

class SendDailySalesReport extends Command
{
    protected $signature = 'report:daily-sales';
    protected $description = 'Send daily sales report to admin email';

    public function handle()
    {
        $today = Carbon::today();

        $items = OrderItem::with('product')
            ->whereDate('created_at', $today)
            ->get();

        if ($items->isEmpty()) {
            return Command::SUCCESS;
        }

        $report = "Daily Sales Report - {$today->toDateString()}\n\n";

        foreach ($items as $item) {
            $total = $item->quantity * $item->price;
            $report .= "{$item->product->name} - Qty: {$item->quantity} - Total: \${$total}\n";
        }

        Mail::raw($report, function ($message) {
            $message->to('altinramadani3@gmail.com')
                ->subject('Daily Sales Report');
        });
        $this->info('Daily sales report sent.');
        return Command::SUCCESS;
    }
}
