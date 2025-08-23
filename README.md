<div align="center">

# Furniro — Furniture E‑commerce UI (Next.js 15 + React 19)

Interactive, responsive furniture storefront with product browsing, rich product details, cart, wishlist, checkout, blog, and contact pages. Powered by Next.js App Router, Tailwind CSS, Framer Motion, and Supabase.

</div>

## Features

- Modern landing page with animated hero, category highlights, and product carousel
- Product catalog with cards, discounts, and “New!” badges
- Product details page with specs, warranty tabs, ratings, related items, and share/like actions
- Cart and Wishlist with persistent state (localStorage) and slide-in modals
- Checkout form with validation and loading states
- Blog page with pagination and recent posts sidebar (data from `public/data/blogs.json`)
- About and Contact pages with motion effects and “Services” highlights
- Global navbar with search, wishlist, and cart counters; responsive layout
- Image optimization via Next/Image with remotePatterns for Supabase/Unsplash/Pixabay

## Tech Stack

- Framework: Next.js 15 (App Router), React 19
- Styling: Tailwind CSS v4 (@tailwindcss/postcss)
- Animations: Framer Motion
- State: React Context (Cart, Liked Items) + localStorage persistence
- Backend: Supabase (tables: `Furniro_Furnitures`, `Furniro_FurnitureDetails`)
- Icons: lucide-react, react-icons
- Utilities: clsx, tailwind-merge, react-spinners

## Requirements

- Node.js 18+ (recommended 18.18 or 20+)
- A Supabase project with the tables listed below

## Getting Started

1. Install dependencies

2. Copy environment file and set values

3. Run the dev server and open http://localhost:3000

Package scripts:

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm start` — start production server
- `npm run lint` — lint with ESLint

> Important: `NEXT_PUBLIC_SUPABASE_URL` must be set even for local dev. `next.config.ts` derives the image hostname from this URL; leaving it empty will break the build config.

## Environment Variables

Create a `.env.local` in the project root (or use the provided `.env.example`):

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Data Model (Supabase)

Furniro expects two tables with a 1‑to‑many relation (a furniture item has one details row):

- `Furniro_Furnitures`

  - id (int, PK)
  - name (text)
  - description (text)
  - price (numeric)
  - discount_price (numeric, nullable)
  - discount_percent (numeric, nullable)
  - image_url (text)
  - tag (text) — category label e.g. "Dining", "Living", "Bedroom"
  - new (text/bool, nullable) — flag to show “New!” badge

- `Furniro_FurnitureDetails`
  - short_description (text)
  - full_description (text)
  - sales_package (text)
  - model_number (text)
  - secondary_material (text)
  - config (text)
  - upholstery_material (text)
  - upholstery_color (text)
  - filling_material (text)
  - finish_type (text)
  - maximum_load_capacity (text)
  - origin_of_manufacture (text)
  - width (text)
  - height (text)
  - depth (text)
  - weight (text)
  - seat_height (text, nullable)
  - leg_height (text, nullable)
  - warranty_summary (text)
  - covered_in_warranty (text)
  - not_covered_in_warranty (text)
  - domestic_warranty (text)
  - review (numeric) — e.g. 4.5
  - sku (text)

The app fetches data via:

- `src/api/FetchFurnitureDetails.ts` — list query joining details
- `src/api/FetchFurnitureById.ts` — single item by `id`

## Project Structure (selected)

```
src/
	app/
		page.tsx                 # redirects / -> /home
		home/page.tsx            # Home
		shop/page.tsx            # Catalog
		furniture/[id]/page.tsx  # Product details
		cart/page.tsx            # Cart
		checkout/page.tsx        # Checkout
		blog/page.tsx            # Blog
		contact/page.tsx         # Contact
		about/page.tsx           # About
		layout.tsx               # Providers + Navbar + global styles
	components/
		home/homepage.tsx        # Home sections
		shop/ShopHomepage.tsx    # Shop page
		FurnitureCard.tsx        # Product card
		FurnitureDetails.tsx     # Product details view
		Cart.tsx / CartModal.tsx # Cart page + slide-in
		WishlistModal.tsx        # Wishlist slide-in
		Blog.tsx                 # Blog listing (json-backed)
		contact/contact-page.tsx # Contact page
		about/AboutHomepage.tsx  # About page
		layout/navbar.tsx        # Navbar with search/cart/wishlist
		Services.tsx / Footer.tsx
	context/
		CartContext.tsx          # Cart state (localStorage)
		LikedItemsContext.tsx    # Wishlist state (localStorage)
	api/
		FetchFurnitureDetails.ts
		FetchFurnitureById.ts
	config/
		supabaseClient.js        # Supabase client (reads env)
public/
	images/                    # Local images
	data/blogs.json            # Blog seed data
```

## Images and Optimization

`next.config.ts` allows images from:

- your Supabase storage bucket domain (derived from `NEXT_PUBLIC_SUPABASE_URL`)
- `images.unsplash.com`
- `cdn.pixabay.com`

Local assets live under `public/images`.

## Styling and Animations

- Tailwind CSS v4 via `@tailwindcss/postcss` (see `postcss.config.mjs` and `src/app/globals.css`)
- Motion variants in `src/components/animations/motion.tsx`

## Routing Overview

- `/` → redirects to `/home`
- `/home`, `/shop`, `/about`, `/blog`, `/contact`, `/cart`, `/checkout`
- `/furniture/[id]` → dynamic product details

## Deployment

- Vercel recommended for Next.js
- Set env vars in the deployment environment:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Development Notes

- The cart and wishlist persist in-browser via localStorage keys:
  - `furniro-cart-items`
  - `furniro-liked-items`
- Without Supabase data, shop and product pages will show skeletons/placeholders and may render limited content.

## Contributing

Issues and pull requests are welcome. Please run `npm run lint` before opening a PR.

## License

No license specified yet. Consider adding a LICENSE file (e.g., MIT) to clarify reuse.
