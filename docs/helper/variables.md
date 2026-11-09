# Vercel

NEXT_PUBLIC_API_URL = https://sena-mn5s.onrender.com

# Render

DB_TARGET = neon
NODE_ENV = production

FRONTEND_URL = https://sena-web.vercel.app
ADMIN_URL = https://sena-admin-delta.vercel.app

DATABASE_URL = postgresql://neondb_owner:npg_SPuV9yT4IOiH@ep-floral-moon-befqfqdv-pooler.c-9.us-east-2.aws.neon.tech/Sena?sslmode=require&channel_binding=require

Build Command = apps/api/ $ npm install; npm run build
Start Command = apps/api/ $ node dist/main.js