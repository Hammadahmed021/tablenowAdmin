import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import {
  Facilities,
  Home,
  Login,
  Restaurants,
  User,
  RestaurantDetail,
  AddTerms,
  Bookings,
  UserDetails,
  Areas,
  Kitchens,
  Atmosphere,
  Menu,
  Newsletter,
} from "../pages";
import { AuthLayout } from "../component";

// Determine base path based on environment
const baseURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BASE_URL_PRODUCTION
    : import.meta.env.VITE_BASE_URL_LOCAL;

function BaseRouter() {
  return (
    <BrowserRouter basename={baseURL}>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Redirect to login if accessing root */}
          <Route index element={<Navigate to="/login" replace />} />
          <Route
            path="dashboard"
            element={
              <AuthLayout authentication={false}>
                <Home />
              </AuthLayout>
            }
          />
          <Route
            path="users"
            element={
              <AuthLayout authentication={false}>
                <User />
              </AuthLayout>
            }
          />
          <Route
            path="users/:id"
            element={
              <AuthLayout authentication={false}>
                <UserDetails />
              </AuthLayout>
            }
          />
          <Route
            path="restaurants"
            element={
              <AuthLayout authentication={false}>
                <Restaurants />
              </AuthLayout>
            }
          />
          <Route
            path="restaurants/:id"
            element={
              <AuthLayout authentication={false}>
                <RestaurantDetail />
              </AuthLayout>
            }
          />
          <Route
            path="facilities"
            element={
              <AuthLayout authentication={false}>
                <Facilities />
              </AuthLayout>
            }
          />
          <Route
            path="areas"
            element={
              <AuthLayout authentication={false}>
                <Areas />
              </AuthLayout>
            }
          />
          <Route
            path="kitchens"
            element={
              <AuthLayout authentication={false}>
                <Kitchens />
              </AuthLayout>
            }
          />
          <Route
            path="atmospheres"
            element={
              <AuthLayout authentication={false}>
                <Atmosphere />
              </AuthLayout>
            }
          />
          <Route
            path="menus"
            element={
              <AuthLayout authentication={false}>
                <Menu />
              </AuthLayout>
            }
          />
          <Route
            path="addterms"
            element={
              <AuthLayout authentication={false}>
                <AddTerms />
              </AuthLayout>
            }
          />
          <Route
            path="bookings"
            element={
              <AuthLayout authentication={false}>
                <Bookings />
              </AuthLayout>
            }
          />
           <Route
            path="newsletter"
            element={
              <AuthLayout authentication={false}>
                <Newsletter />
              </AuthLayout>
            }
          />
          {/* Authentication required routes */}
          <Route
            path="login"
            element={
              <AuthLayout authentication={true}>
                <Login />
              </AuthLayout>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default BaseRouter;
