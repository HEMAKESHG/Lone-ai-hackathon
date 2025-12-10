# Generative AI for Demystifying Legal Documents ⚖️

**Generative AI for Demystifying Legal Documents** is an AI-powered platform designed to make complex legal texts accessible and understandable. By leveraging GenAI and optical character recognition (OCR), this tool analyzes treaties, contracts, and legal agreements to provide clear summaries, risk assessments, and timeline visualizations.

## 🚀 Features

* **📄 Universal Document Support**: Upload and process various formats including PDFs and Word documents (`.docx`) using `pdf-parse` and `mammoth`.
* **👁️ Built-in OCR**: Automatically extract text from scanned documents or images using `tesseract.js`.
* **🤖 AI Analysis**: Demystify complex legal jargon and get plain-English explanations.
* **⚠️ Risk Visualization**: Interactive charts and graphs (powered by `recharts`) to visualize potential risks and key metrics.
* **📊 Interactive Dashboard**: A modern, responsive user interface built with React and Tailwind CSS.

## 🛠️ Tech Stack

### Frontend
* **Framework**: React (via Vite)
* **Language**: TypeScript
* **Styling**: Tailwind CSS with `tailwindcss-animate` and `class-variance-authority`
* **Components**: Radix UI primitives for accessible design
* **Icons**: Lucide React
* **Charts**: Recharts
* **State Management**: React Query (`@tanstack/react-query`)

### Backend
* **Runtime**: Node.js
* **Server**: Express.js
* **OCR Engine**: Tesseract.js
* **Document Processing**: 
    * `pdf-parse` (for PDF extraction)
    * `mammoth` (for Word document conversion)
* **File Handling**: Multer

## 📦 Installation & Setup

Prerequisites: Ensure you have **Node.js** installed on your machine.

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

###2. Setup Backend

Navigate to the backend directory to install dependencies and start the server.
```Bash
cd backend
npm install
# Create a .env file if required by your configuration
npm start
```
The backend server typically runs on http://localhost:3000.

###3. Setup Frontend

Open a new terminal and navigate to the frontend directory.
```Bash

cd treaty-guide-main
npm install
npm run dev
```

##The frontend will launch, usually on http://localhost:5173.
###📂 Project Structure
Plaintext
```
├── backend/                  # Express server & API routes
│   ├── index.js             # Server entry point
│   └── package.json         # Backend dependencies (Tesseract, PDF-parse, etc.)
│
├── treaty-guide-main/        # React Frontend application
│   ├── src/                 # Components, pages, and hooks
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies (React, Tailwind, Recharts)
│
└── README.md                 # Project documentation
```

###🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

###📄 License

This project is licensed under the ISC License.



