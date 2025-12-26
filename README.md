
# Book Archive: Cloud-Native MERN Application

> **Project URL:** [http://my-book-vault-frontend-2025.s3-website-us-east-1.amazonaws.com](http://my-book-vault-frontend-2025.s3-website-us-east-1.amazonaws.com)

## ☁️ Architecture & Deployment

This project follows a modern cloud-native deployment strategy:

* **Frontend**: Hosted as a static website on **Amazon S3**.
* **Backend**: Deployed on **AWS Elastic Beanstalk** (Node.js environment).
* **Database**: Persistent relational storage using **Amazon RDS (MySQL)**.
* **CI/CD**: Fully automated pipeline using **GitHub Actions** that deploys on every push to the `master` branch.
![Architecture Diagram](./assets/architecture.jpg)

## ✨ Features

* **Full CRUD**: Create, Read, Update, and Delete book records.
* **Relational Database**: Structured data management using **Sequelize ORM** and **MySQL**.
* **Responsive UI**: Modern interface built with **React**, **Vite**, and **Tailwind CSS**.
* **Automated Delivery**: Zero-downtime deployment process via AWS integration.

## 🛠️ Tech Stack

* **Frontend**: React.js, Vite, Tailwind CSS, Axios.
* **Backend**: Node.js, Express.js, Sequelize.
* **Database**: MySQL (Amazon RDS).
* **DevOps**: GitHub Actions, AWS S3, AWS Elastic Beanstalk.

## 📂 Project Structure

```text
CLOUD-COMPUTING/
├── .github/workflows/
│   └── deploy.yml      # Automated CI/CD Pipeline
├── backend/            # Express API & Sequelize Models
├── frontend/           # React Frontend (Vite)
├── .gitignore          # Optimized for AWS security
└── README.md

```
## 🚀 Getting Started

### Prerequisites

* Node.js (v18+)
* MySQL Instance (Local or Amazon RDS)
* AWS CLI configured (for manual deployment)

### Local Setup

1. **Clone the Repository**:
```bash
git clone https://github.com/niqueisa/cloud-computing.git
cd cloud-computing

```
2. **Backend Setup**:
```bash
cd backend
npm install

```
Create a `.env` file in `/backend`:
```env
PORT=5555
DB_NAME=book_vault
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=your_rds_endpoint

```
* **Run**: `npm run dev`.

3. **Frontend Setup**:
```bash
cd ../frontend
npm install
npm run dev
```

## 🏗️ Deployment (CI/CD)

The deployment is fully automated:

1. Developer pushes code to the **`master`** branch.
2. **GitHub Actions** triggers the `Deploy to AWS` workflow.
3. The workflow builds the React production files and syncs them to the **S3 Bucket**.
4. The workflow zips the Node.js backend and deploys it to **Elastic Beanstalk**.
