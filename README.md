# Next.js 15 + Laravel 11 Fullstack Boilerplate

A modern fullstack starter kit using **Next.js 15 (Pages Router with SSR)** as frontend and **Laravel 11** as backend API. Includes JWT authentication, Docker support, and GitLab CI/CD.

<img width="1270" height="908" alt="image" src="https://github.com/user-attachments/assets/9bfd4f3e-581c-4321-9daf-eb72e15b1b18" />

---

## Project Structure

```
next-laravel-base/
├── frontend/                 # Next.js 15 app (SSR with Pages Router)
│   ├── components/           # Reusable UI components
│   │   ├── ButtonCustom/
│   │   ├── Checkbox/
│   │   ├── Datepicker/
│   │   ├── Radio/
│   │   ├── TableCustom/
│   │   └── TextInput/
│   ├── constants/            # App constants (API_URL, PAGINATION, AUTH, etc.)
│   ├── locales/              # i18n translations (en, vi)
│   ├── pages/                # Next.js pages
│   ├── services/             # API services (axios)
│   ├── stores/               # Zustand state management
│   ├── styles/               # CSS modules
│   ├── utils/                # Utility functions (formatNumber, formatDate)
│   ├── middleware.ts         # Route protection
│   ├── Dockerfile
│   └── .gitlab-ci.yml
├── backend/                  # Laravel 11 API
│   ├── docker/               # Docker configs (nginx, php, supervisor)
│   ├── Dockerfile
│   └── .gitlab-ci.yml
├── docker/                   # Shared Docker configs
│   └── nginx/
└── docker-compose.yml        # Full stack orchestration
```

---

## Requirements

- **PHP** >= 8.3
- **Node.js** >= 20
- **Composer**
- **npm** or **yarn**
- **Docker** (optional)

---

## Tech Stack

### Frontend (Next.js 15)
| Package | Purpose |
|---------|---------|
| `next` 15.1.6 | React framework with SSR |
| `react` 19 | UI library |
| `typescript` | Type safety |
| `zustand` | State management |
| `axios` | HTTP client with interceptors |
| `js-cookie` | Cookie management for JWT |
| `dayjs` | Date formatting |

### Backend (Laravel 11)
| Package | Purpose |
|---------|---------|
| `laravel/framework` | Main framework |
| `laravel/sanctum` | JWT authentication |
| `php-fpm` | PHP FastCGI |
| `nginx` | Web server |

---

## Quick Start

### 1. Clone Repo
```bash
git clone <repo-url> next-laravel-base
cd next-laravel-base
```

---

### 2. Setup Backend (Laravel)
```bash
cd backend

# Install dependencies
composer install

# Copy environment config
cp .env.dev .env  # or cp .env.example .env

# Generate app key
php artisan key:generate

# Setup database
php artisan migrate

# Start Laravel server
php artisan serve
```

Laravel API: `http://localhost:8000`

---

### 3. Setup Frontend (Next.js)
```bash
cd frontend

# Install dependencies
npm install

# Copy environment config
cp .env.dev .env.local

# Run dev server
npm run dev
```

Frontend: `http://localhost:3000`

---

## Features

### Authentication
- JWT-based authentication
- Automatic token refresh via axios interceptors
- Protected routes via Next.js middleware
- Cookie-based token storage

### Route Protection
```typescript
// Protected routes (require login)
const protectedRoutes = ["/dashboard", "/profile", "/settings"];

// Public routes
const publicRoutes = ["/", "/login", "/register"];
```

### Components
- **TextInput** - Input with label, error, helper text
- **ButtonCustom** - Button with variants (primary, secondary, danger, ghost) and loading state
- **Checkbox** - Custom styled checkbox
- **Radio** - Custom styled radio
- **Datepicker** - Date picker with calendar dropdown
- **TableCustom** - Table with columns, loading, empty state

### Utils
```typescript
import { formatDate, formatNumber, formatCurrency } from "@/utils";

formatDate("2026-01-16");           // "16/01/2026"
formatNumber(1234567);              // "1,234,567"
formatCurrency(1000000, "VND");     // "1,000,000 ₫"
```

### i18n
```typescript
import { getTranslations } from "@/locales";

const t = getTranslations("vi");
console.log(t.common.submit); // "Gửi"
```

---

## Docker Deployment

### Development
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Production Build
```bash
# Frontend
cd frontend
docker build -t frontend:latest .

# Backend
cd backend
docker build -t backend:latest .
```

---

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=Next Laravel
NEXT_PUBLIC_APP_ENV=development
```

### Backend (.env)
```env
APP_URL=http://localhost:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=secret
JWT_SECRET=your-jwt-secret
```

---

## GitLab CI/CD

Both frontend and backend include `.gitlab-ci.yml` with:

1. **Build** - Install dependencies
2. **Test** - Lint/test
3. **Deploy** - Docker build & push

Required CI/CD Variables:
- `SSH_PRIVATE_KEY`
- `DEPLOY_USER`
- `STAGING_SERVER`
- `PROD_SERVER`
- `CI_REGISTRY_USER`
- `CI_REGISTRY_PASSWORD`

---

## License

This project is open-sourced under the [MIT license](https://github.com/1206dev/NextJs-Laravel-Base-Project-With-AUTH/blob/master/LICENSE).

---

## Credits

Built with ❤️ using Next.js 15 and Laravel 11.
