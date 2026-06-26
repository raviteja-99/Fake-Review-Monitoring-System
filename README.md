# 🛡️ Fake Review Monitoring System

### AI-Powered E-Commerce Fake Review Detection & Sentiment Analysis Platform

An intelligent e-commerce web application that detects **fake product reviews** using **Natural Language Processing (NLP)**, sentiment analysis, spam pattern detection, and secure user authentication. Built with **Node.js, Express.js, MongoDB, JWT, and JavaScript**.

---

# 📌 What It Does

The Fake Review Monitoring System simulates a secure online shopping platform where users can browse products, purchase items, and submit reviews. Every review is analyzed using NLP and multiple rule-based detection techniques to classify it as **Real** or **Fake**.

| Step | Module                 | Description                                                                                                                                 |
| ---- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | User Authentication    | User registers and securely logs in using JWT authentication.                                                                               |
| 2    | Product Browsing       | Products are fetched dynamically from FakeStore API / DummyJSON API.                                                                        |
| 3    | Checkout               | Users purchase products and order details are stored in MongoDB.                                                                            |
| 4    | Review Submission      | Customers submit product reviews after purchasing.                                                                                          |
| 5    | NLP Sentiment Analysis | Review text is tokenized and analyzed using the Natural NLP library.                                                                        |
| 6    | Fake Review Detection  | Detects suspicious reviews using sentiment score, spam keywords, punctuation patterns, duplicate IP detection, and capitalization analysis. |
| 7    | Results                | Review is classified as **Real** or **Fake** and stored in the database.                                                                    |

---

# 🚀 Features

* 🔐 Secure User Registration & Login (JWT Authentication)
* 🔑 Password Encryption using bcrypt
* 🛒 Dynamic Product Listing
* 📦 Product Checkout System
* ⭐ Product Review Submission
* 🤖 Natural Language Processing (NLP)
* 😊 Sentiment Analysis
* 🚨 Fake Review Detection Engine
* 🌐 RESTful APIs
* 💾 MongoDB Database Integration
* 🔄 Duplicate Review Prevention
* 📱 Responsive User Interface
* ⚡ Real-Time Review Analysis
* 🧠 Rule-Based Spam Detection
* 📊 Sentiment Score Calculation

---

# ⚙️ How to Run

## Step 1 — Clone Repository

```bash
git clone https://github.com/raviteja-99/Fake-Review-Monitoring-System.git

cd Fake-Review-Monitoring-System
```

---

## Step 2 — Install Dependencies

```bash
npm install
```

---

## Step 3 — Configure Environment Variables

Create a `.env` file in the project root.

```env
SECRET_KEY=YourStrongSecretKey
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/checkoutDB
```

---

## Step 4 — Start MongoDB

```bash
mongod
```

or ensure your MongoDB service is running.

---

## Step 5 — Run the Server

```bash
node server.js
```

Server starts at

```
http://localhost:5000
```

---

# 🌐 External APIs

### FakeStore API

Used for fetching e-commerce products.

https://fakestoreapi.com/

---

### DummyJSON API

Alternative product dataset.

https://dummyjson.com/products

---

# 📂 Project Structure

```
Fake-Review-Monitoring-System/
│
├── images/                    # UI images
├── public/
│   └── review.html            # Review interface
│
├── checkout.html              # Checkout page
├── home.html                  # Home dashboard
├── index.html                 # Login page
├── registration.html          # User registration
├── review.html                # Review page
├── server.js                  # Express backend
├── package.json               # Dependencies
├── package-lock.json
└── README.md
```

---

# 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcrypt

### NLP & AI

* Natural NLP
* AFINN Sentiment Analyzer

### External APIs

* FakeStore API
* DummyJSON API

---

# 🧠 Fake Review Detection Techniques

The system detects fake reviews using multiple intelligent checks:

* NLP Sentiment Analysis
* Sentiment Score Calculation
* Spam Keyword Detection
* Excessive Punctuation Detection
* ALL CAPS Detection
* Duplicate Review Detection using IP Address
* Extremely Positive Review Detection
* Extremely Negative Review Detection
* Rule-Based Classification Engine

---

# 📡 REST API Endpoints

| Method | Endpoint        | Purpose               |
| ------ | --------------- | --------------------- |
| POST   | `/api/register` | Register User         |
| POST   | `/api/login`    | Login User            |
| GET    | `/api/orders`   | Fetch User Orders     |
| POST   | `/api/checkout` | Place Order           |
| POST   | `/api/reviews`  | Submit Product Review |

---

# 🔒 Security Features

* JWT Authentication
* Password Hashing
* Protected REST APIs
* Duplicate Review Prevention
* Input Validation
* MongoDB Secure Storage

---

# 🚀 Future Enhancements

* Deep Learning-Based Fake Review Detection
* Transformer Models (BERT / RoBERTa)
* Admin Dashboard
* User Profile Management
* Product Recommendation System
* Cloud Deployment
* Docker Support
* Email Notifications
* Payment Gateway Integration
* AI-powered Fraud Analytics

---

# 👨‍💻 Author

**Raviteja**

B.Tech – Computer Science & Engineering

Python Developer | Software Engineer | AI & Machine Learning Enthusiast

GitHub:
https://github.com/raviteja-99

---

## ⭐ If you found this project useful, don't forget to Star ⭐ this repository on GitHub.
