# ShikshaMitra

ShikshaMitra is a full-stack web application designed to help students access educational content easily.  
This project includes:

- **Frontend:** React + Vite + TailwindCSS  
- **Backend:** Node.js + Express  
- **API integration between frontend & backend**

---

## 🚀 Features

### 🎓 Frontend (React + Tailwind)
- Modern UI built with React and TailwindCSS  
- Components for displaying course content  
- Smooth and responsive layout  
- API calls to backend for data retrieval

### 🛠 Backend (Node + Express)
- Simple REST API  
- Endpoints for fetching educational content  
- CORS enabled  
- Runs independently on its own server

---
(```
## 📂 Project Structure
shikshamitra/
│
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── (other backend files…)
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.cjs
│   ├── tailwind.config.js
│   ├── vite.config.js
│   │
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       └── components/
│           └── ShikshaMitra.jsx
│
├── .gitignore
└── README.md
)


---

## 🧩 How to Run the Project Locally

### 🔹 1. Clone the repository

```bash
git clone https://github.com/singhdiksha17/ShikshaMitra.git

cd ShikshaMitra

🎨 Run Frontend
cd frontend
npm install
npm run dev


Frontend runs at:

👉 http://localhost:5173/

⚙️ Run Backend
cd backend
npm install
node server.js


Backend runs at:

👉 http://localhost:5000/

🔗 API Example
GET http://localhost:5000/api/data


Response:

{
  "message": "Hello from the backend!"
}

🧮 Tech Stack

Frontend:

React

Vite

TailwindCSS

Backend:

Node.js

Express

CORS

💡 Future Enhancements

Add authentication (JWT login)

Add a database (MongoDB)

Add multiple subjects & chapters

Admin dashboard for uploading content

📜 License

This project is open-source and free to use.
