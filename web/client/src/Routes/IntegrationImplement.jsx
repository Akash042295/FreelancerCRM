import { Routes, Route, Navigate } from "react-router-dom";
import ApiDocs from '../pages/product/integration-implement/ApiDocs';

const IntegrationImplement = () => {
  return (
    <Routes>
      <Route
        path="api-docs"
        element={<ApiDocs />}
      />

      {/* // add some feature or some stuff in future */}
      
      <Route
        path="*"
        element={<Navigate to="/integrations" replace />}
      />
    </Routes>
  )
}

export default IntegrationImplement
