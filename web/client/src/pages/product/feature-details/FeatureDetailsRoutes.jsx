
import { Routes, Route, Navigate } from "react-router-dom";
import PipelineDetails from "./PipelineDetails";
import AutomationDetails from "./AutomationDetails";

const FeatureDetailsRoutes = () => {
  return (
    <Routes>
      <Route
        path="/features/pipeline"
        element={<PipelineDetails />}
      />

      <Route
        path="/features/automation"
        element={<AutomationDetails />}
      />

      <Route
        path="*"
        element={<Navigate to="/features" replace />}
      />
    </Routes>
  );
};

export default FeatureDetailsRoutes;
