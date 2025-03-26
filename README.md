# Briskk Apparels

Briskk Apparels is an e-commerce platform that allows users to browse and purchase stylish apparel online. The project focuses on a **Next.js (ShadCN) frontend with TypeScript and Tailwind CSS**, while the backend is built with **Node.js and MongoDB**.

## 🚀 Frontend Deployed

[**Briskk Apparels - Live**](https://briskk-apparels.vercel.app/)

---

## 🛠 Tech Stack

| **Client**  | **Server**  |
|-------------|------------|
| Next.js (ShadCN) | Node.js |
| TypeScript (TSX) | Express.js |
| Tailwind CSS | MongoDB |

---

## 📌 Features

- **Modern UI:** Built using **ShadCN** components with **Tailwind CSS** for a clean, responsive design.
- **Product Filtering:** View products by **categories** or get **recommended products**.
- **Secure API:** The backend is secured with JWT authentication.
- **Fully Responsive:** Works on **desktop, tablet, and mobile** devices.

---

## 📡 API Endpoints

| **Method** | **Endpoint** | **Description** |
|-----------|-------------|----------------|
| GET | `/api/products` | Fetch all products |
| GET | `/api/products/recommended` | Get recommended products |
| GET | `/api/products/:id` | Fetch a single product by ID |
| GET | `/api/products/category/:category` | Fetch products by category |

---

## 📂 Project Structure

```bash
Briskk-Apparels/
├── client/    # Next.js (Frontend)
├── server/    # Node.js & Express (Backend)
└── README.md  # Documentation
```

---

## 🛠 Backend Environment Variables

**Create a `.env` file inside the `/server` directory and add:**

```env
PORT=4000
MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster0.mongodb.net/Briskk-Apparels
JWT_SECRET=mysecret#1111
```

(Replace `<your-username>` and `<your-password>` with your MongoDB credentials)

---

## 🏗 Setup & Installation

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/your-repo/briskk-apparels.git
cd briskk-apparels
```

### **2️⃣ Install Dependencies**
#### **Frontend** (Next.js - `/client`)
```bash
cd client
npm install  # or yarn install
```
#### **Backend** (Node.js - `/server`)
```bash
cd server
npm install  # or yarn install
```

### **3️⃣ Run the application**
#### **Start Backend**
```bash
cd server
npm run dev
```
#### **Start Frontend**
```bash
cd client
npm run dev
```

---

## 🎯 Design Choices

1. **Next.js + ShadCN:** Ensures a **fast, modern UI** with reusable components.
2. **Tailwind CSS:** Provides a **flexible & responsive** design.
3. **TypeScript:** Adds **type safety**, improving maintainability.
4. **MongoDB Atlas:** A cloud-based database for **scalability**.
5. **JWT Authentication:** Enhances **security** for user sessions.

---

## 🔥 Challenges & Solutions

| **Challenge** | **Solution** |
|--------------|-------------|
| MongoDB Connection Error | Ensured **IP Whitelisting** in MongoDB Atlas & used correct `.env` variables |
| Styling Issues | Used **ShadCN components** for consistency & Tailwind for flexibility |

---

## 🎁 Bonus Features (Optional Enhancements)

- **Implemented product recommendations** based on user interactions.
- **Added JWT authentication** for future user authentication.
- **Integrated responsive design** using Tailwind.

---

## 📜 License

This project is licensed under the **MIT License**.

---

🚀 **Happy Coding!** 💻

