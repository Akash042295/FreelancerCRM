import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminRoutes from "./AdminRoutes";
import CustomerRoutes from "./CustomerRoutes";

//common pages are here
import Landing from "../pages/common-field/HomePage";
import NotFound from "../pages/common/NotFound";
import Unauthorized from "../pages/common/Unauthorized";

// product pages are here
import Features from "../pages/product/Features";
import FeatureRoute from './FeatureRoutes';
import Pricing from "../pages/product/Pricing";
import Integration from "../pages/product/Integrations";
import IntegrationImplement from "./IntegrationImplement";
import ChangeLog from "../pages/product/Changelog";
import Roadmap from "../pages/product/Roadmap";

//company pages are here
import AboutUs from "../pages/company/AboutUs";
import Career from "../pages/company/Careers";
import Blog from "../pages/company/Blog";
import BlogArticles from '../pages/company/blog-page/BlogArticle';
import ContactUs from "../pages/company/Contacts";
import Partners from "../pages/company/Partners";

//legal notice and privacy
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import TermsOfService from "../pages/legal/TermsOfService";
import CookieSettings from "../pages/legal/CookieSettings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index path="/home_page" element={<Landing />} />

      {/* Product pages */}
      <Route path="/features" element={<Features />} />
      <Route path="/features/*" element={<FeatureRoute />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/integrations" element={<Integration />} />
      <Route path="/integrations/*" element={<IntegrationImplement />} />
      <Route path="/changelog" element={<ChangeLog />} />
      <Route path="/roadmap" element={<Roadmap />} />

      {/* legal notice and privacy */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/cookie-settings" element={<CookieSettings />} />

      {/* Company pages */}
      <Route path="/about us" element={<AboutUs />} />
      <Route path="/careers" element={<Career />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/article/:id" element={<BlogArticles />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/partners" element={<Partners />} />

      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      {/* For Role-Based access */}
      {AdminRoutes}
      {CustomerRoutes}
      {/* Common Routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/" element={<Navigate to="/home_page" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
