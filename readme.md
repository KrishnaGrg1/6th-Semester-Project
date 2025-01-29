# 6th-Semester-Project - PopCornBox

This is the 6th Semester Project showcasing a web application with various features, including subscription plans, user authentication, and payment gateway integration. The project has been deployed and is available at https://sixth-semester-project.onrender.com/.

# Project Overview

The 6th Semester Project is a web application aimed at delivering a subscription-based service, where users can select various plans, manage their profiles, and securely make payments using integrated gateways like Khalti.

The platform allows users to:

-View available subscription plans.
-Choose a plan (monthly, quarterly, yearly).
-Proceed with payment securely via Khalti.
-Manage user profiles and settings.


## Features

- **Subscription Plan Selection**: Users can select from different subscription tiers (e.g., Monthly, Quarterly, and Yearly)
- **Payment Integration**: Secure payment processing through Khalti API.
- **User Authentication**: The platform supports basic user authentication, including login, registration, and profile management.
- **Payment Verification**: After payment, the status is verified and the user is shown a success or failure message.
- **Dynamic Content**: Subscription plans are dynamically displayed and sorted by price.

---

## Technologies Used

- **Frontend**: HTML, CSS (Responsive Design), JavaScript, EJS (Embedded JavaScript)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Gateway**: Khalti API
- **Hosting**: Render 
- **MoveAI**: tmdbapi

---

## Prerequisites

- **Node.js**: Ensure you have Node.js (v12 or higher) installed on your system.
- **MongoDB**: A MongoDB instance is required for storing subscription plans and payment records.
- **Khalti Account**: You need to set up a Khalti account to get your API keys (for payment processing).

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/KrishnaGrg1/6th-Semester-Project.git
cd 6th-Semester-Project/code/sample2
```

### 2. Install dependencies
Run the following command to install all required dependencies:

```bash
npm install
```

### 3. Setup environment variables
Create a .env file in the root directory and configure the following environment variables:

```dotenv
PORT=5000
JWT_Secret_Key="your_jwt_secret_key"  # Change this to a secure key
SMTP_HOST="your_smtp_host"            # e.g., mail.example.com
SMTP_USERNAME="your_smtp_username"    # e.g., user@example.com
SMTP_PASSWORD="your_smtp_password"    # e.g., securepassword
SMTP_PORT=465
MONGODB_URL="your_mongodb_connection_string"  # Replace with your MongoDB URL
Api_Key="your_api_key"                # Get from the API provider
BaseUrl="https://api.themoviedb.org/3/"  # No need to change if you are using The Movie DB API
FRONTEND_URI="http://localhost:3000"   # Replace if using a different frontend URI
KHALTI_GATEWAY_URL="https://dev.khalti.com/"  # Use the correct gateway URL
KHALTI_SECRET_KEY="your_khalti_secret_key"    # Replace with your actual secret key
KHALTI_PUBLIC_KEY="your_khalti_public_key"    # Replace with your actual public key
BACKEND_URI="http://localhost:5000"    # Replace if using a different backend URI

```

Replace your_khalti_api_key with the API key from your Khalti account.

### 4. Start the server
```bash
npm start
```

Your server should now be running at http://localhost:5000

To purchase the subscription http://localhost:5000/payment/add.