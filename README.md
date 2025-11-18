# Simple E-Commerce Cart (Laravel + React + Inertia)

This is a simple e-commerce demonstration project built using:  
**Laravel (Backend), Inertia.js, React + TypeScript, TailwindCSS, Laravel Fortify, MySQL, and Laravel Queues & Scheduled Jobs.**

---

## Features

### **1. Public Homepage**
- Displays a grid of products  
- Clean navbar with search, cart badge, and login/logout  

### **2. Authentication**
- User registration & login (Laravel Fortify)  
- Redirects users to the homepage after login  

### **3. Shopping Cart**
- Add items to cart  
- Update quantity (debounced updates)  
- Remove items  
- Stock automatically decreases after checkout  

### **4. Email Notifications**
- Low Stock Notification Job  
- Daily Sales Report (scheduled command)  

### **5. Admin Light Features**
- Low stock threshold check (≤5)  
- Automatic email alerts  

---

## Installation

```bash
git clone https://github.com/alt1nn/ecommerce-task.git
cd ecommerce-task

cp .env.example .env
composer install
npm install
php artisan key:generate
