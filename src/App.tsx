import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DiagnosticReports from "./pages/DiagnosticReports";
import MedicalHistory from "./pages/MedicalHistory";
import Prescriptions from "./pages/Prescriptions";
import DoctorProfile from "./pages/DoctorProfile";
import AiFeatures from "./pages/AiFeatures";
import HealthProgram from "./pages/HealthProgram";
import OrderTest from "./pages/OrderTest";
import PatientMeasures from "./pages/PatientMeasures";
import Reminder from "./pages/Reminder";
import Financial from "./pages/Financial";
import TrackEntries from "./pages/TrackEntries";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { AuthProvider } from "./context/AuthContext";
import Help from "./pages/Help";
import Layout from "./components/Layout";
import AdminDashboard from "./pages/AdminDashboard";

// Admin pages
import AdminUsers from "./pages/admin/Users";
import AdminSystem from "./pages/admin/System";
import AdminActivity from "./pages/admin/Activity";
import AdminSettings from "./pages/admin/Settings";
import AdminHelp from "./pages/admin/Help";
import Tracking from "@/pages/admin/Tracking";

// Nurse pages
import NurseDashboard from "./pages/nurse/Dashboard";
import NursePatientCare from "./pages/nurse/PatientCare";
import NurseVitalSigns from "./pages/nurse/VitalSigns";
import NurseMedications from "./pages/nurse/Medications";
import NurseAppointments from "./pages/nurse/Appointments";
import PatientRecords from "./pages/nurse/PatientRecords";

// Lab pages
import LabDashboard from "./pages/lab/Dashboard";
import TestManagement from "./pages/lab/TestManagement";
import Results from "./pages/lab/Results";
import Equipment from "./pages/lab/Equipments";
import Inventory from "./pages/lab/Inventory";
import Maintenance from "./pages/lab/Maintenance";
import QualityControl from "./pages/lab/QualityControl";
import Tranfers from "./pages/Tranfers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route element={<Layout />}>
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/system" element={<AdminSystem />} />
              <Route path="/admin/activity" element={<AdminActivity />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/help" element={<AdminHelp />} />
              <Route path="/admin/tracking" element={<Tracking />} />

              {/* Nurse Routes */}
              <Route path="/nurse" element={<NurseDashboard />} />
              <Route
                path="/nurse/patient-care"
                element={<NursePatientCare />}
              />
              <Route path="/nurse/vital-signs" element={<NurseVitalSigns />} />
              <Route path="/nurse/medications" element={<NurseMedications />} />
              <Route
                path="/nurse/appointments"
                element={<NurseAppointments />}
              />
              <Route path="/nurse/records" element={<PatientRecords />} />
              <Route path="/nurse/settings" element={<Settings />} />
              <Route path="/nurse/help" element={<Help />} />

              {/* Lab Routes */}
              <Route path="/lab" element={<LabDashboard />} />
              <Route path="/lab/tests" element={<TestManagement />} />
              <Route path="/lab/results" element={<Results />} />
              <Route path="/lab/equipment" element={<Equipment />} />
              <Route path="/lab/inventory" element={<Inventory />} />
             
              <Route path="/lab/maintenance" element={<Maintenance/>} />
              <Route
                path="/lab/quality-control"
                element={<QualityControl/>}
              />

              <Route path="/lab/settings" element={<Settings />} />
              <Route path="/lab/help" element={<Help />} />

              {/* Doctor Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/diagnostic-reports"
                element={<DiagnosticReports />}
              />
              <Route path="/medical-history" element={<MedicalHistory />} />
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route path="/health-program" element={<HealthProgram />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
              <Route path="/ai-features" element={<AiFeatures />} />
              <Route path="/help" element={<Help />} />
              <Route path="/tracking" element={<TrackEntries />} />
              <Route path="/order-test" element={<OrderTest />} />
              <Route path="/patient-measures" element={<PatientMeasures />} />
              <Route path="/reminder" element={<Reminder />} />
              <Route path="/financial" element={<Financial />} />
              <Route path="/transfers" element={<Tranfers />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
