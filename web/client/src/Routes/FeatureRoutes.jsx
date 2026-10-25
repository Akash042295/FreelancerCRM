
import { Routes, Route, Navigate } from "react-router-dom";
import PipelineDetails from "../pages/product/feature-details/PipelineDetails";
import AutomationDetails from "../pages/product/feature-details/AutomationDetails";

const FeatureRoutes = () => {
  return (
    <Routes>
      <Route
        path="pipeline"
        element={<PipelineDetails />}
      />

      <Route
        path="automation"
        element={<AutomationDetails />}
      />

      <Route
        path="*"
        element={<Navigate to="/features" replace />}
      />
    </Routes>
  );
};

export default FeatureRoutes;
