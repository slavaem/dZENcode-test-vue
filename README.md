# Vue Orders Test

SPA application built with Vue 3 (Composition API) for managing Orders and Products.

## Features

- Orders list with details panel
- Products list with filtering by type
- Global state management using Vuex
- Vue Router navigation
- WebSocket active sessions counter
- Animated transitions between components

## Installation

Install dependencies:

npm install

## Run frontend

npm run dev

The application will be available at:

http://localhost:5173

## Run WebSocket server

node server.js

or

npm run socket

WebSocket server runs on:

http://localhost:3001

## Run with Docker

docker compose up --build

After starting Docker, the application will be available at:

http://localhost:5173

## Technologies

- Vue 3
- Vuex
- Vue Router
- Socket.io
- Vite
- ES6

## Project structure

├─ server.js – websocket server  
├─ src  
│  
├─ assets  
│ └─ vue.svg  
│  
├─ components  
│ ├─ ConfirmModal.vue  
│ ├─ Layout.vue  
│ ├─ OrderCard.vue  
│ ├─ OrderDetails.vue  
│ ├─ ProductCard.vue  
│ ├─ Sidebar.vue  
│ └─ TopMenu.vue  
│  
├─ data  
│ └─ mockData.js  
│  
├─ router  
│ └─ index.js  
│  
├─ store  
│ └─ index.js  
│  
├─ views  
│ ├─ OrdersPage.vue  
│ └─ ProductsPage.vue  
│  
├─ App.vue  
├─ package.json  
└─ vite.config.js
