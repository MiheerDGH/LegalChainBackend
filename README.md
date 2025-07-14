# LegalChain Backend

This is the backend service for the **LegalChain** platform — an AI-powered legal document generation and analysis tool. The backend handles authentication, file storage, database management, and integration with AI models for document review and summary.

---

## 📁 Project Structure

LegalChainBackend/
│
├── prisma/ # Prisma schema and migrations
│ └── schema.prisma
│
├── routes/ # Express route handlers
│ ├── auth.js
│ ├── ai.js
│ └── docs.js
│
├── controllers/ # Request controller logic
│ ├── authController.js
│ ├── aiController.js
│ └── docsController.js
│
├── services/ # Supabase and OpenAI logic
│ ├── supabaseClient.js
│ ├── storageService.js
│ └── openaiService.js
│
├── middleware/ # Authentication middleware
│ └── authMiddleware.js
│
├── tests/ # Test scripts
│ └── testPrisma.js
│
├── .env.example # Example environment config
├── nodemon.json # Nodemon config for local dev
├── package.json # Project metadata and scripts
└── index.js # Main entry point

markdown
Copy
Edit

---

## ✅ Features

- 🔐 **Authentication** (Supabase with role-based access)
- 🧠 **AI Contract Analysis** using OpenAI API (Claude optional)
- 📦 **File Storage** with Supabase Buckets
- 📄 **PostgreSQL** managed via Prisma ORM
- 🛠️ **Modular API** architecture (`/api/auth`, `/api/docs`, `/api/ai`)
- ☁️ **Deployed on Render**
- 🔄 **Environment config** via `.env`
- 🔍 **Developer Tools:** Nodemon, logging, Prisma Studio

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/MiheerDGH/LegalChainBackend.git
cd LegalChainBackend
2. Install Dependencies
bash
Copy
Edit
npm install
3. Set Up Environment Variables
Create a .env file using the example:

bash
Copy
Edit
cp .env.example .env
Then update it with your Supabase and OpenAI credentials.

4. Push Prisma Schema
bash
Copy
Edit
npx prisma db push
If this fails, ensure DATABASE_URL in .env is correct and Supabase is reachable.

5. Start the Dev Server
bash
Copy
Edit
npm run dev
🧪 Testing
Use Postman or Insomnia to test routes.

To run a basic test script:

bash
Copy
Edit
node tests/testPrisma.js
🌐 API Endpoints
🔐 Auth
POST /api/auth/signup

POST /api/auth/login

📄 Documents
POST /api/docs/upload

GET /api/docs/list

DELETE /api/docs/:id

🧠 AI
POST /api/ai/analyze

⚙️ Admin (coming soon)
GET /api/admin/users

GET /api/admin/stats

🤖 AI Integration
The AI route (/api/ai/analyze) sends the uploaded document to the OpenAI or Claude API, returning:

Legal summary

Key clause detection

Risk assessment

Logic is located in services/openaiService.js.

🚀 Deployment
Hosted on Render

Auto-deploy from main branch

GitHub Actions CI/CD (optional)

👥 Team & Responsibilities
Member	Focus Area
Miheer	Auth, Infra, Deployment
Giriraj	File Upload, Storage APIs
Sweta	AI Integration & Summary
Shuhan	DB Schema & Admin Dashboard

For progress tracking, refer to the Backend Development Checklist and Sprint 1 Plan.

🛠 Tools & Technologies
Node.js + Express.js

PostgreSQL via Supabase

Prisma ORM

OpenAI / Claude APIs

Supabase Storage

Render (for hosting)

Nodemon, dotenv, ES Modules
