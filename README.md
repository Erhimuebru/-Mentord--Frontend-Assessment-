# Blessed Store - Product Catalog Take-home

## Overview
A small product catalog app built with Next.js, TailwindCSS and Redux Toolkit. Products are fetched from the Fake Store API. Cart state uses Redux and persists.

##  Features
- **Landing Page / Hero Section** with a headline + CTA
- **Products Grid**
  - Responsive cards (image, title, price)
  - Grouped by category
  - “Add to Cart/Remove from Cart” button
- **Cart Page**
  - Add/remove products
  - Increase/decrease quantity
  - Prevent decreasing below `1`
  - Clear entire cart (with confirmation modal)
  - Automatic total price calculation
- **Product Details Page** *(Bonus)*
- **Responsive UI**
- **Loading states & modals** for better UX

## Tech Stack
- Next.js
- TailwindCSS
- Redux Toolkit
- redux-persist


## Setup
1. Clone repo
2. npm install
3. cp .env.example .env
4. npm run dev
5. Open: http://localhost:3000

## Notes
- API: https://fakestoreapi.com
- State: Redux Toolkit and Redux-persist. To manage and to persist across refresh.
- Styling: TailwindCSS

## Approach
- Components are small & focused: `ProductCard`, `Hero`, `Navbar`, `Footer`.
- Redux handles cart actions to keep UI reactive.
- Loading states improve UX while fetching data.
