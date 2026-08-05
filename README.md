# Basic Movie Backend Project | NodeJS, ExpressJS, JWT, Prisma, PostgreSQL

<div>

<img src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />

<img src="https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />

<img src="https://img.shields.io/badge/-JWT-000000?style=for-the-badge&logo=jsonwebtoken&logoColor=white" alt="JWT" />

<img src="https://img.shields.io/badge/-Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />

<img src="https://img.shields.io/badge/-PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />

<img src="https://img.shields.io/badge/-Zod-3E63DD?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />

</div>

---

## Introduction

This repository demonstrates a backend project which was built using NodeJS with Express framework. Prisma ORM used in the project as database management tool.

---

## Tech Stack

- **Node.js** – JavaScript runtime for server-side development

- **Express.js** – Fast, minimalist web framework for Node.js

- **JWT (JSON Web Tokens)** – Secure authentication and authorization

- **Prisma** – Next-generation ORM for database management

- **PostgreSQL** – Powerful, open-source relational database

- **Zod** – TypeScript-first schema validation library

- **bcryptjs** – Password hashing for secure user authentication

- **dotenv** – Environment variable management

---

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/aysegules/movieBackendProject.git
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/DB_name"
NODE_ENV="development/production"
JWT_SECRET = "your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
SEED_CREATOR_ID="uuid-for-seed.movies.js-file"
```

For the JWT secret variable you can run following command in terminal in your VS Code editor:

```bash
openssl rand -base64 32
```

This command will give you a secret key that generated randomly.

4. **Set up the database**

```bash
# Run Prisma migrations
npx prisma migrate dev --name init

#Generate Prisma client
npx prisma generate

# (Optional) Seed the database with sample data
npm run seed:movies
```

5. **Start the development server**

```bash
npm run dev
```

The API will be available at: [http://localhost:5001/api/v1](http://localhost:5001/api/v1)

---

## API Endpoints

You can test your APIs with platforms like Postman with the following endpoints.

### Authentication Routes

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive JWT token
- `POST /auth/logout` - Logout (invalidate token)

### Movie Routes

- `GET /movies` - Get all movies
- `POST /movies` - Create a new movie
- `PUT /movies/:id` - Update a movie
- `DELETE /movies/:id` - Delete a movie

### Watchlist Routes (Protected)

- `POST /watchlist` - Add movie to watchlist
- `PUT /watchlist/:id` - Update watchlist item
- `DELETE /watchlist/:id` - Remove movie from watchlist
