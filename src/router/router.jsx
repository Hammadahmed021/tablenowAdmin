import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import { Facilities, Home, Login, Restaurants, User, RestaurantDetail, AddTerms, Bookings, UserDetails } from "../pages";
import { AuthLayout } from "../component";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />, // Default redirect to login
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: (
          <AuthLayout authentication={false}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "users",
        element: (
          <AuthLayout authentication={false}>
            <User />
          </AuthLayout>
        ),
      },
      {
        path: "users/:userId",
        element: (
          <AuthLayout authentication={false}>
            <UserDetails />
          </AuthLayout>
        ),
      },
      {
        path: "restaurants",
        element: (
          <AuthLayout authentication={false}>
            <Restaurants />
          </AuthLayout>
        ),
      },
      {
        path: "restaurants/:id", // Route for restaurant details
        element: (
          <AuthLayout authentication={false}>
            <RestaurantDetail />
          </AuthLayout>
        ),
      },
      {
        path: "facilities",
        element: (
          <AuthLayout authentication={false}>
            <Facilities />
          </AuthLayout>
        ),
      },
      {
        path: "addterms",
        element: (
          <AuthLayout authentication={false}>
            <AddTerms />
          </AuthLayout>
        ),
      },
      {
        path: "bookings",
        element: (
          <AuthLayout authentication={false}>
            <Bookings />
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthLayout authentication={true}>
        <Login />
      </AuthLayout>
    ),
  },
]);

export default router;
