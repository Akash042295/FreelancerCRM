import { Route, Routes } from "react-router-dom";
import CustomerLayout from "../Layouts/CustomerLayout";
import CustomerGuard from "../guards/CustomerGuard"; // we use when we done the employee page also
import Dashboard from "../pages/Customer/Dashboard";
import Profile from "../pages/Customer/Profile";
import Chat from "../pages/Customer/Chat";
import Tasks from "../pages/Customer/Tasks";
import Leads from "../pages/Customer/Leads";

const CustomerRoutes = (
      <Route
    path="/customer"
    element={
      <CustomerGuard>
        <CustomerLayout />
      </CustomerGuard>
    }
  >
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="tasks" element={<Tasks />} />
    <Route path="leads" element={<Leads />} />
    <Route path="chat" element={<Chat />} />
  </Route>
  )

export default CustomerRoutes;
