# Vue Orders Test

Test project built with Vue 3.

## Installation

Install dependencies:

npm install

## Run frontend

npm run dev

The app will be available at:
http://localhost:5173

## Run websocket server

node server.js

or

npm run socket

Websocket server runs on:
http://localhost:3001

## Project structure

├─ server.js – websocket server  
├─ src  
│  
├─ assets  
│   └─ vue.svg  
│  
├─ components  
│   ├─ ConfirmModal.vue  
│   ├─ Layout.vue  
│   ├─ OrderCard.vue  
│   ├─ OrderDetails.vue  
│   ├─ ProductCard.vue  
│   ├─ Sidebar.vue  
│   └─ TopMenu.vue  
│  
├─ data  
│   └─ mockData.js  
│  
├─ router  
│   └─ index.js  
│  
├─ store  
│   └─ index.js  
│  
├─ views  
│   ├─ OrdersPage.vue  
│   └─ ProductsPage.vue  
│  
├─ App.vue  
│  
├─ server.js
├─ package.json  
└─ vite.config.js

