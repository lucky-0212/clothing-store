# NOIR & CO — Full-Stack Clothing Store

A complete MERN (MongoDB, Express, React, Node.js) e-commerce site for a
clothing brand, with authentication, a product catalog, cart, checkout,
and order history — animated with Framer Motion and styled with Tailwind CSS.

## Folder structure

```
clothing-store/
├── server/                 # Node + Express + MongoDB API
│   ├── config/db.js        # Mongo connection
│   ├── models/             # User, Product, Order (Mongoose)
│   ├── controllers/        # Route handler logic
│   ├── routes/             # Express routers
│   ├── middleware/         # JWT auth, admin guard, error handling
│   ├── utils/               # Token generation
│   ├── seed/seedData.js    # Sample products + admin user
│   ├── server.js           # App entrypoint
│   ├── package.json
│   └── .env.example
│
└── client/                 # React + Vite frontend
    ├── src/
    │   ├── api/axios.js         # Axios instance with auth header
    │   ├── store/               # Zustand: cart + auth state (persisted)
    │   ├── components/          # Navbar, Footer, ProductCard, etc.
    │   ├── pages/                # Home, Shop, ProductDetail, Cart, Checkout...
    │   ├── App.jsx               # Routes
    │   ├── main.jsx              # Entry point
    │   └── index.css             # Tailwind + global styles
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

## Tech stack

- **Frontend:** React 18, Vite, React Router v6, Tailwind CSS, Framer Motion, Zustand, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT auth, bcrypt

## Features

- Product catalog with category filters, search, sorting, and pagination
- Product detail pages with color/size selection and an image gallery
- Persistent shopping cart (Zustand + localStorage)
- JWT authentication (register/login), protected checkout flow
- Order placement and order history
- Admin-only endpoints for managing products and order status
- Editorial, fashion-forward UI with page-load and scroll animations,
  hover-triggered image swaps, and reduced-motion support

## Getting started

### 1. Backend

```bash
cd server
cp .env.example .env    # then edit MONGO_URI / JWT_SECRET as needed
npm install
npm run seed             # loads sample products + an admin user
npm run dev               # starts on http://localhost:5000
```

You'll need a MongoDB instance — either a local `mongod`, or a free
[MongoDB Atlas](https://www.mongodb.com/atlas) cluster (paste its
connection string into `MONGO_URI`).

Seeded admin login: `admin@noirandco.com` / `admin123`

### 2. Frontend

```bash
cd client
npm install
npm run dev               # starts on http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`,
so run both servers at once during development.

### 3. Build for production

```bash
cd client
npm run build             # outputs static files to client/dist
```

Serve `client/dist` from any static host (Vercel, Netlify, Nginx) and
deploy `server/` to any Node host (Render, Railway, Fly.io), pointing
`CLIENT_URL` and your frontend's API base URL at each other.

## Notes

- Payment is a placeholder "Cash on Delivery" flow — swap in Stripe/Razorpay
  in `orderController.js` and `Checkout.jsx` for real payments.
- Product images are hosted on Unsplash for demo purposes — replace with
  your own product photography before going live.
