import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import Login from "./components/Login";
import LoginPage from "./pages/login/login-page";
import Unauthorized from "./pages/Unauthorized";
import AuthGuard from "./auth/AuthGuard";
// import CustomerGuard from "./auth/CustomerGuard";
import { CustomerGuard } from "./auth/CustomerGuard";
import { Outlet } from "react-router-dom"; // Đảm bảo import Outlet

import HomePage from "./pages/pagesCustomer/homePage/HomePage";
import CustomerApp from "./layouts/layoutCustomer/CustomerApp";
import AdminApp from "./layouts/layoutAdmin/AdminApp";
import Dashboard from "./components/componentsAdmin/Dashboard/Dashboard";
import TherapistApp from "./layouts/layoutTherapist/TherapistApp";
import ProfileCustomer from "./pages/pagesCustomer/profileCustomer";
import DetailPage from "./pages/pagesCustomer/homePage/DetailPage";
import Getting_Ready_Marriage from "./pages/pagesCustomer/Getting_Ready_Marriage";
import Great_Marriage_Vows from "./pages/pagesCustomer/Great_Marriage_Vows";
import Pre_MarriageAdvice from "./pages/pagesCustomer/Pre_MarriageAdvice";
import Marriage_Preparation_Tips from "./pages/pagesCustomer/Marriage_Preparation_Tips";
import PageAdmin from "./pages/pagesAdmin/pagesAdmin";
import Pagetest from "./pages/pagesAdmin/page01";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/customer-home"
          element={
            <CustomerGuard>
              <CustomerApp />
            </CustomerGuard>
          }
        >
          {/* Các trang không yêu cầu AuthGuard */}
          <Route path="/customer-home" element={<HomePage />} />
          <Route path="pre-marige" element={<Pre_MarriageAdvice />} />
          <Route path="readiness" element={<Getting_Ready_Marriage />} />

          {/* Các trang yêu cầu AuthGuard */}
          <Route
            path="/customer-home"
            element={
              <AuthGuard requiredRole="customer">
                <Outlet />
              </AuthGuard>
            }
          >
            <Route path="profile" element={<ProfileCustomer />} />
            <Route path="detail/:id" element={<DetailPage />} />
            <Route path="vows" element={<Great_Marriage_Vows />} />
            <Route
              path="marriage-preparation"
              element={<Marriage_Preparation_Tips />}
            />
          </Route>
        </Route>

        {/* <Route
          path="/admin-home"
          element={
            <AuthGuard requiredRole="admin">
              <AdminApp />
            </AuthGuard>
          }
        >
          <Route index element={<Dashboard />} />
        </Route> */}

        {/* chưa bắt login AuthGuard */}
        <Route element={<AdminApp />}>
          <Route path="/admin-home" element={<PageAdmin />} />

          <Route path="/admin-test" element={<Pagetest />} />
        </Route>
        <Route
          path="/therapist-home"
          element={
            <AuthGuard requiredRole="therapist">
              <TherapistApp />
            </AuthGuard>
          }
        >
          {/* <Route path="/admin" element={<Admin />} /> */}
        </Route>

        {/* Redirect all unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
