# Product Showcase & Enquiry App

A full-stack web application that allows users to browse products, search/filter, view details, and submit enquiries. Built with React (Vite), Node.js (Express), and SQLite.

## Features

### Frontend
- Product listing with search and category filtering
- Client-side pagination
- Responsive design (mobile & desktop)
- Product details page
- Enquiry form with validation
- Clean, modern UI

### Backend
- RESTful API with Express
- SQLite database
- Input validation
- Error handling
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/imthiyagu07/Product-Showcase-Enquiry-App.git
cd GVCC_task
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=3001
DB_PATH=./database.db
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Database Setup

Initialize the database with schema and seed data:

```bash
cd ../backend
node db/init.js
```

This will:
- Create `database.db` file
- Create `products` and `enquiries` tables
- Insert 12 sample products

## Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: `http://localhost:3001`

### Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:5173`

### Access the Application

Open your browser and navigate to: `http://localhost:5173`

## Project Structure

```
GVCC_task/
├── backend/
│   ├── controllers/
│   │   ├── products.controller.js
│   │   └── enquiries.controller.js
│   ├── db/
│   │   ├── database.js          # Database connection
│   │   └── init.js              # Database initialization script
│   ├── routes/
│   │   ├── products.route.js
│   │   └── enquiries.route.js
│   ├── server.js                # Express server entry point
│   ├── package.json
│   └── .env                     # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── EnquiryForm.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── ProductDetails.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── schema.sql                   # Database schema
├── seed.sql                     # Sample data
└── README.md
```

## API Endpoints

### Products

#### Get All Products
```
GET /api/products?search=&category=&page=1&limit=6
```

**Query Parameters:**
- `search` (optional): Search by product name or description
- `category` (optional): Filter by category (Electronics, Books)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "products": [...],
  "pagination": {
    "total": 12,
    "page": 1,
    "limit": 6,
    "totalPages": 2
  }
}
```

#### Get Product by ID
```
GET /api/products/:id
```

**Response:**
```json
{
  "id": 1,
  "name": "Laptop Pro 15",
  "category": "Electronics",
  "short_desc": "High-performance laptop",
  "long_desc": "Powerful 15-inch laptop...",
  "price": 1299.99,
  "image_url": "https://...",
  "created_at": "2024-12-06..."
}
```

### Enquiries

#### Create Enquiry
```
POST /api/enquiries
```

**Request Body:**
```json
{
  "product_id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "I'm interested in this product"
}
```

**Response:**
```json
{
  "message": "Enquiry submitted successfully",
  "enquiry": {
    "id": 1,
    "product_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "I'm interested in this product"
  }
}
```

#### Get All Enquiries (Admin)
```
GET /api/enquiries
```

**Response:**
```json
{
  "enquiries": [...],
  "total": 5
}
```

## Environment Variables

### Backend (.env)
```env
PORT=3001
DB_PATH=./database.db
```

## Key Decisions & Trade-offs

### Technology Choices
- **Vite instead of Create React App**: Faster build times and better development experience
- **SQLite**: Zero-configuration database, perfect for development and demo purposes
- **Client-side pagination**: Simpler implementation, suitable for small datasets (12 products)
- **ES6 Modules**: Modern JavaScript syntax for better code organization

### Design Decisions
- **Separate controllers and routes**: Better code organization and maintainability
- **Form validation on both client and server**: Enhanced security and user experience
- **Responsive-first design**: Mobile-friendly from the start
- **Image URLs from Unsplash**: No need to manage image uploads for demo

### Trade-offs
- **Client-side pagination**: Works well for small datasets but would need server-side pagination for larger catalogs
- **No authentication**: Simplified for demo; admin endpoints are open (would add JWT in production)
- **SQLite**: Great for development but would use PostgreSQL/MySQL in production
- **No image upload**: Used external URLs to keep the scope manageable

## Future Improvements

With more time, I would implement:

1. **Authentication & Authorization**: JWT-based auth for admin endpoints
2. **Server-side pagination**: Better performance for large datasets
3. **Image upload**: Allow admins to upload product images
4. **Unit & Integration tests**: Jest for backend, React Testing Library for frontend
5. **Email notifications**: Send email when new enquiry is submitted
6. **Admin dashboard**: Full CRUD operations for products and enquiries
7. **Caching**: Redis for frequently accessed products
8. **Rate limiting**: Prevent API abuse
9. **Input sanitization**: Additional security against XSS attacks
10. **Deployment**: Docker containerization and CI/CD pipeline

## Testing

### Manual Testing Checklist

- [x] View product list
- [x] Search products by name
- [x] Filter by category
- [x] Navigate pagination
- [x] View product details
- [x] Submit enquiry form
- [x] Form validation (empty fields)
- [x] Email format validation
- [x] Success message after submission
- [x] Responsive design on mobile
- [x] API endpoints return correct data

### Test the API

You can test the API using curl or Postman:

```bash
# Get all products
curl http://localhost:3001/api/products

# Get product by ID
curl http://localhost:3001/api/products/1

# Create enquiry
curl -X POST http://localhost:3001/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "message": "Test message"
  }'

# Get all enquiries
curl http://localhost:3001/api/enquiries
```

## Assumptions

1. **Product data**: Using sample products with external image URLs
2. **No user authentication**: All endpoints are public for demo purposes
3. **Single currency**: All prices in USD
4. **Limited categories**: Only Electronics and Books for simplicity
5. **Email validation**: Basic regex pattern (not sending actual emails)
6. **Phone field**: Optional, no format validation
7. **Browser support**: Modern browsers with ES6 support

## Known Issues

None at this time. All features are working as expected.

## License

This project is created for assignment purposes.

## Author

Created as part of GVCC Solutions Full-Stack Developer Assignment

---

**Total Development Time**: ~8 hours
**Tech Stack**: React (Vite) + Node.js (Express) + SQLite
