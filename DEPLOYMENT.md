# Blogify deployment

## Architecture

- Client: Vercel
- Server: Render
- Database: MongoDB Atlas
- Images: Cloudinary

## 1. Rotate exposed credentials

The original ZIP contained `.env` files. Rotate the MongoDB password and any other real secrets before deployment. Never commit `.env`.

## 2. Deploy the server on Render

Create a Web Service from this repository with:

- Root Directory: `server`
- Build Command: `npm ci`
- Start Command: `npm start`

Environment variables:

- `NODE_ENV=production`
- `DB_URL=<MongoDB Atlas connection prefix without /BLOGIFY_DB>`
- `CLIENT_URL=<deployed Vercel client URL>`
- `JWT_SECRETE=<long random secret>`
- `CLOUDINARY_CLOUD_NAME=<cloud name>`
- `CLOUDINARY_API_KEY=<API key>`
- `CLOUDINARY_API_SECRET=<API secret>`

The API health check is `/health`.

## 3. Deploy the client on Vercel

Set the project root to `client`. Vercel will use Vite's production build.

Environment variables:

- `VITE_API_URL=https://<your-render-service>.onrender.com/api/v1`
- `VITE_FIREBASE_API_KEY=<Firebase web API key>`

The included `client/vercel.json` supports React Router direct navigation.

## 4. Authentication

The API uses an HTTP-only JWT cookie. In production the cookie is configured as `Secure` + `SameSite=None`, which is required when the Vercel frontend and Render API are on different sites. CORS is restricted to `CLIENT_URL`.
