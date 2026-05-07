import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { LoginPage } from "./pages/LoginPage";
import { PortalPage } from "./pages/PortalPage";
import { CQLPage } from "./pages/CQLPage";
import { CareGapPage } from "./pages/CareGapPage";
import { MeasuresPage } from "./pages/MeasuresPage";
import { PriorAuthPage } from "./pages/PriorAuthPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public */}
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="login" element={<LoginPage />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="portal" element={<PortalPage />} />
          <Route path="portal/cql" element={<CQLPage />} />
          <Route path="portal/care-gaps" element={<CareGapPage />} />
          <Route path="portal/measures" element={<MeasuresPage />} />
          <Route path="portal/prior-auth" element={<PriorAuthPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
