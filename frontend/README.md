
# Bernabeu Project

## Overview

The Bernabeu project is a website for placing orders for football-related items. It features a React frontend and a Django backend, connected using Axios for seamless communication.

## Features

- **User Authentication**: Secure login and registration process.
- **Product Listing**: Browse a wide range of football-related items.
- **Shopping Cart**: Add items to the cart and manage orders.
- **Order Placement**: Easy checkout process for users.

## Technologies Used

- **Frontend**: React
- **Backend**: Django
- **API Communication**: Axios
- **Database**: SQLite
- **Routing**: React Router
- **CORS Handling**: Django CORS headers

## Installation

### Prerequisites

Make sure you have Node.js and Python installed on your machine.

### Frontend Setup

1. Navigate to the frontend directory:
   
   cd frontend
   
2. Install necessary dependencies:
   
   npm install react-router-dom axios
   

### Backend Setup

1. Navigate to the backend directory:
   
   cd backend
   
2. Install necessary dependencies:
   
   pip install django djangorestframework django-cors-headers
   

3. Add `corsheaders` to your `INSTALLED_APPS` in `settings.py`:
   
   INSTALLED_APPS = [
       
       'corsheaders',
       
   ]
   

4. Add the middleware in `settings.py`:
   
   MIDDLEWARE = [
              'corsheaders.middleware.CorsMiddleware',
          ]

5. Configure CORS in `settings.py`:
   python
   CORS_ALLOW_ALL_ORIGINS = True  # Use this for development only
   

## Usage

To run the project, follow these steps:

### Start the Backend Server

cd backend
python manage.py runserver

### Start the Frontend Development Server

cd frontend
npm start
