# Online Bookstore Project

This project is a full-stack web application that simulates an online bookstore, covering the entire user journey from browsing books to checkout. It was developed as a multi-part project over a semester, gradually building features for both the frontend and backend.

!(Main-Page)[https://images.plurk.com/3S2Yk5hrFdy5zPkbWMB8Zo.jpg]
!(Category-Page)[https://images.plurk.com/3tpqZm1dJMsPqQFekf87cQ.jpg]  

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Project Structure
The project consists of two main parts: the frontend and the backend.

### Frontend (Client-side)
- **Framework**: Built with **React** and **TypeScript** for type safety and structure.
- **Routing**: Uses React Router to handle multiple pages, including the Home, Category, Cart, Checkout, and Confirmation pages.
- **State Management**: Implements **Context API** and **useReducer** for managing global states like the shopping cart and category list. Cart data is also stored in **localStorage** to maintain state across page reloads.

### Backend (Server-side)
- **Server**: Developed with **Java** and **Jakarta EE** (or Spring Boot).
- **RESTful API**: Provides endpoints for retrieving categories, books, user orders, and more.
- **Data Access**: Uses DAO (Data Access Object) classes to interact with the database tables. The main tables include:
  - `customer`: Stores customer information.
  - `customer_order`: Records order information.
  - `customer_order_line_item`: Tracks individual items within an order.
- **Transactions**: Ensures data consistency by committing or rolling back transactions if any step fails during the order placement process.

## Features

### Book Category Browsing
- Users can browse books by category, viewing details for each book.
- Category and book information are retrieved dynamically from the backend via API requests.

### Shopping Cart
- Users can add books to their cart, view items, adjust quantities, remove items, and clear the cart.
- Cart state is saved in localStorage, so the cart persists even if the page is refreshed.

### Checkout and Order Confirmation
- Users enter their details and payment information on the Checkout page, with frontend and backend validation.
- Upon successful checkout, users see a confirmation page showing the order number, items, and total cost.
- This process includes transaction handling that saves customer information, order data, and order items in the database.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **TypeScript**: Provides static type-checking to reduce runtime errors.
- **Context API**: Manages global application state, reducing prop drilling.
- **Axios**: Makes API requests to interact with the backend.

### Backend
- **Java with Jakarta EE (or Spring Boot)**: Powers the server-side application.
- **JDBC**: Connects and interacts with the SQL database.
- **DAO Pattern**: Abstracts and simplifies database operations.
- **RESTful API**: Enables client-server communication via HTTP.
