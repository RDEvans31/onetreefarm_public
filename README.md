This is the public repo for the One Tree Farm website.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## This project will serve to enable One Tree Farm's e-commerce.

Intended functionality:

1. Basic website to display info and make bookings to events and session (handled by Wordpress)
2. Faciliate the sale of food.

MVP Features:

1. Ability to buy food and pay by card
2. Login and user data persistance
3. Be able to login and pay by cash after selecting delivery.

Notes:
Connects to supabase and handles auth that way (Auth.js). This is done with Prisma currently.
Run `npm exec prisma migrate dev` everytime schema changes.

Next steps:

1. Enable collection on farm orders
2. Move away from supabase, then eventually away from Prisma. Aiming for Hasura + Postgres stack.
