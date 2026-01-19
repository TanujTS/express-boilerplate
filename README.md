# Express Boilerplate

A robust and modern boilerplate for building backend applications with Express.js, loaded with essential tools and configurations to jumpstart your development.

## 🚀 Status

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📝 Features

-   **Runtime**: [Bun](https://bun.sh) - A fast all-in-one JavaScript runtime.
-   **Framework**: [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
-   **Language**: [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
-   **Database ORM**: [Drizzle ORM](https://orm.drizzle.team/) - Lightweight and type-safe ORM.
-   **Database**: PostgreSQL (via Neon Serverless driver).
-   **Authentication**: [Better Auth](https://better-auth.com/) - Comprehensive authentication library.
-   **Logging**: [Pino](https://github.com/pinojs/pino) - Very low overhead Node.js logger.
-   **Validation**: [Zod](https://zod.dev/) - TypeScript-first schema declaration and validation library.
-   **Rate Limiting**: `express-rate-limit` pre-configured.
-   **CORS**: Configured for cross-origin resource sharing.

## 🛠️ Stack

-   **Core**: Bun, Express, TypeScript
-   **Data**: Drizzle ORM, PostgreSQL (Neon)
-   **Auth**: Better Auth
-   **Utilities**: Zod, Dotenv, Pino

## 📂 Project Structure

```bash
├── src
│   ├── controllers  # Request handlers
│   ├── db           # Database connection and schema
│   ├── lib          # Shared libraries and configurations
│   ├── logger       # Logging configuration
│   ├── middlewares  # Express middlewares
│   ├── routes       # API routes
│   ├── schemas      # Zod schemas for validation
│   ├── types        # TypeScript type definitions
│   └── utils        # Utility functions
├── .env.example     # Example environment variables
├── drizzle.config.ts# Drizzle kit configuration
└── package.json     # Project dependencies and scripts
```

## 🏁 Getting Started

### Prerequisites

-   [Bun](https://bun.sh) installed globally.
-   A PostgreSQL database (e.g., [Neon](https://neon.tech/)).

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd express-boilerplate
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Environment Setup:**

    Copy the `.env.example` file to `.env`:

    ```bash
    cp .env.example .env
    ```

    Update the `.env` file with your credentials:

    ```env
    PORT=8000
    DATABASE_URL="your-database-connection-string"
    BETTER_AUTH_SECRET="your-secret"
    BETTER_AUTH_URL="http://localhost:8000"
    GOOGLE_CLIENT_ID="your-google-client-id"
    GOOGLE_CLIENT_SECRET="your-google-client-secret"
    WEB_URL="http://localhost:3000"
    ```

### 🏃‍♂️ Running the Project

**Development Mode:**

This starts the server with hot-reloading enabled.

```bash
bun run dev
```

### 🗄️ Database Management

**Push Schema Changes:**

Push your Drizzle schema changes to the database.

```bash
bun run db:push
```

**Open Drizzle Studio:**

Visual database management tool.

```bash
bun run db:studio
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
