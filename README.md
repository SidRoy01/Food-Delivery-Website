# Food Delivery Website

## This project is a fully functional food delivery web application built using modern web technologies. It provides features like user authentication, cart management, restaurant filtering, address management, and a mock payment gateway.

## Features

### 1. Authentication

- User Sign Up
- User Sign In
- Secure token-based authentication using Appwrite.

### 2. Cart Management

- Add to Cart functionality with seamless updates.
- Update the cart to add/remove items or adjust quantities.
- Cart state managed using Redux for optimal performance.

### 3. Restaurant Display

- Integrated with the Swiggy API to fetch and display restaurants.
- Real-time restaurant list filtering

### 4. User Profile

- Edit user profile details.
- Manage delivery addresses:
  Add new addresses
  Edit existing addresses
  Delete addresses

### 5. Mock Payment Integration

- Users can proceed to a mock payment gateway to simulate order payments.

## Technologies Used

### Frontend:

- **ReactJS**: Framework for building the user interface.
- **Redux**: State management for cart and authentication.
- **React Router Dom**: For Routing
- **Tailwind CSS**: For styling and responsiveness.

### Backend:

- Appwrite:
  - User authentication and database services.
  - Stores user data like profile and addresses.

### API:

- Swiggy API: For fetching restaurant and menu details.
