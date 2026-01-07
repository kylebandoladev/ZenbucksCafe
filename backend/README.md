# Zenbucks Cafe POS Backend

A comprehensive Point of Sale (POS) system backend built with Node.js, Express, Prisma, and PostgreSQL.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access control
- 📦 **Product Management** - Categories, products, variants, and inventory tracking
- 🛒 **Order Processing** - Complete POS workflow with payment processing
- 📊 **Inventory Management** - Real-time inventory tracking with transactions
- 👥 **User Management** - Admin, Manager, and Cashier roles
- 🏪 **Multi-tenant Ready** - Designed for multiple locations
- 📈 **Audit Logging** - Complete audit trail for all operations

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL 16
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Validation**: Zod
- **Logging**: Pino
- **Security**: Helmet, CORS, Rate Limiting

## Quick Start

### Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose
- Git

### 1. Clone and Install

```bash
cd backend
npm install
```

### 2. Environment Setup

Copy the example environment file and update the values:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
DATABASE_URL="postgresql://zenbucks:zenbucks_pw@localhost:5432/zenbucksdb?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=4000
NODE_ENV=development
CORS_ORIGIN="http://localhost:5173"
```

### 3. Start Database

Start PostgreSQL and pgAdmin using Docker Compose:

```bash
docker-compose up -d
```

This will start:

- PostgreSQL on port 5432
- pgAdmin on port 5050 (admin@zenbucks.local / admin123)

### 4. Database Setup

Generate Prisma client and run migrations:

```bash
npm run db:generate
npm run db:migrate
```

### 5. Seed Database

Populate the database with sample data:

```bash
npm run db:seed
```

### 6. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:4000`

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile

### Products

- `GET /api/products` - List products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Manager+)
- `PUT /api/products/:id` - Update product (Manager+)
- `DELETE /api/products/:id` - Delete product (Manager+)
- `GET /api/products/categories` - List categories
- `POST /api/products/categories` - Create category (Manager+)

### Orders

- `POST /api/orders` - Create order (Cashier+)
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders/:id/payment` - Process payment (Cashier+)
- `POST /api/orders/:id/void` - Void order (Cashier+)

## Default Users

After seeding, you can login with:

- **Admin**: admin@zenbucks.com / admin123
- **Manager**: manager@zenbucks.com / admin123
- **Cashier**: cashier@zenbucks.com / admin123

## Database Management

### Access pgAdmin

1. Open http://localhost:5050
2. Login with admin@zenbucks.local / admin123
3. Add server:
   - Host: db
   - Port: 5432
   - Database: zenbucksdb
   - Username: zenbucks
   - Password: zenbucks_pw

### Prisma Studio

View and edit data in a web interface:

```bash
npm run db:studio
```

### Reset Database

To reset the database and re-seed:

```bash
npx prisma migrate reset
npm run db:seed
```

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:deploy` - Deploy migrations to production
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

### Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js           # Database seed script
├── src/
│   ├── config/
│   │   ├── database.js   # Prisma client
│   │   └── logger.js     # Logger configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   └── routes/          # API routes
├── docker-compose.yml    # Database services
├── package.json
└── README.md
```

## Security Features

- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation with Zod
- SQL injection protection via Prisma

## Next Steps

1. **Frontend Integration** - Connect your React frontend to these APIs
2. **Payment Processing** - Integrate with Stripe, Square, or other payment providers
3. **Reporting** - Add sales reports and analytics
4. **Inventory Alerts** - Low stock notifications
5. **Receipt Printing** - Thermal printer integration
6. **Multi-location** - Support for multiple store locations

## Troubleshooting

### Database Connection Issues

- Ensure Docker containers are running: `docker-compose ps`
- Check database URL in `.env` file
- Verify PostgreSQL is accessible on port 5432

### Migration Issues

- Reset database: `npx prisma migrate reset`
- Check Prisma schema for syntax errors
- Ensure database is running before migrations

### Authentication Issues

- Verify JWT_SECRET is set in `.env`
- Check token expiration settings
- Ensure user has correct roles assigned

## Support

For issues and questions, please check the logs and ensure all prerequisites are met.

backend/
├── index.js # Main server entry point
├── prisma/
│ ├── schema.prisma # Database schema (PostgreSQL)
│ └── migrations/ # Database migration files
└── src/
├── config/ # Configuration files
│ ├── database.js # Prisma client setup
│ └── logger.js # Logging configuration
├── controllers/ # Business logic layer
│ ├── authController.js
│ ├── productController.js
│ └── orderController.js
├── middleware/ # Request processing middleware
│ ├── auth.js # Authentication & authorization
│ ├── errorHandler.js # Error handling
│ └── validation.js # Request validation
├── routes/ # API endpoints
│ ├── auth.js
│ ├── products.js
│ └── orders.js
└── services/ # Business services (empty for now)

┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Frontend │ │ Backend API │ │ Database │
│ (React) │ │ (Express) │ │ (PostgreSQL) │
└─────────────────┘ └─────────────────┘ └─────────────────┘
│ │ │
│ 1. HTTP Request │ │
│ GET /api/products │ │
├──────────────────────►│ │
│ │ │
│ │ 2. Prisma Query │
│ │ prisma.product.findMany│
│ ├──────────────────────►│
│ │ │
│ │ 3. Database Response │
│ │◄──────────────────────┤
│ │ │
│ 4. JSON Response │ │
│ { success: true, │ │
│ data: { products } }│ │
│◄──────────────────────┤ │
│ │ │
│ 5. Update UI State │ │
│ setProducts(data) │ │
│ │ │
