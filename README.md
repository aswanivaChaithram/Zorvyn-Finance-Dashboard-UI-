# Finance Dashboard UI

A responsive web app for managing personal finances. Built with React, Vite, and Tailwind CSS.

## Overview

This finance dashboard adopts a modular approach using React components for reusability, local storage for login and sign-in functionality, Context API for data sharing and state management, Tailwind CSS for responsive design, and Recharts for visualizations including line charts for balance trends and pie charts for spending breakdowns. The application features comprehensive dashboard views, advanced transaction management with filtering and sorting, role-based interfaces for viewers and admins, and responsive design to ensure a seamless user experience across devices.

## Features

- **Dashboard Overview with Summary Cards**: Provides a quick glance at key financial metrics through interactive cards displaying balances, income, expenses, and other summaries.
- **Time Based Visualization (e.g., Balance Trend)**: Displays balance changes over time using line charts to help users track financial trends and patterns.
- **Categorical Visualization (e.g., Spending Breakdown)**: Shows spending distribution across categories with pie charts for easy identification of major expense areas.
- **Transaction List with Details**: Presents a comprehensive list of all transactions with detailed information including date, amount, type and category.
- **Transaction Filtering**: Allows users to filter transactions by category and type to focus on specific data subsets.
- **Transaction Sorting**: Enables sorting transactions on the basis of amount for better organization and analysis.
- **Role Based UI (Viewer and Admin)**: Offers different interfaces and permissions for viewers (read-only access) and admins (full management capabilities).
- **Insights Section**: Provides analytical insights and recommendations based on transaction data to help users make informed financial decisions.
- **State Management (Context API)**: Uses React Context API for efficient state management across components, ensuring consistent data flow and updates.
- **Data persistence (local storage)**: Stores user data locally in the browser for offline access and session continuity without requiring a backend.
- **Simple transitions**: Incorporates smooth transitions for a polished user experience during interactions and page changes.
- **Responsive Design**: Ensures the application adapts seamlessly to different screen sizes and devices for optimal usability on desktop, tablet, and mobile.

## Getting Started

### Prerequisites

1. Install Node.js
   Download and install Node.js from [nodejs.org](https://nodejs.org).
   After installation, verify by running in PowerShell:
   ```
   node -v
   npm -v
   ```

2. Clone the Repository
   ```
   git clone https://github.com/aswanivaChaithram/Zorvyn-Finance-Dashboard-UI.git
   cd Zorvyn-Finance-Dashboard-UI
   ```

3. Install Dependencies
   ```
   npm install
   ```

4. Start the Development Server
   ```
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```
npm run build
```

### Preview Production Build

```
npm run preview
```

## Project Structure

```
Finance_Dashboard/
├── .git/
├── .gitignore
├── eslint.config.js
├── index.html
├── node_modules/
├── package-lock.json
├── package.json
├── public/
├── README.md
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── assets/
│   │   └── transactionData.js
│   ├── Components/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Transactions.jsx
│   │   └── TransactionsTable.jsx
│   ├── context/
│   │   └── TransactionContext.jsx
│   └── Pages/
│       ├── Home.jsx
│       └── Dashboard/
│           ├── AdminDashboard.jsx
│           └── UserDashboard.jsx
└── vite.config.js
```

## Customization

Update styles using Tailwind CSS classes

## Deployment

Deploy using Vercel
