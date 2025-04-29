"use client";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Activity,
  FileText,
  Calendar,
  CreditCard,
  Settings,
  User,
  HelpCircle,
  Menu,
  X,
  LogOut,
  ClipboardList,
  ActivitySquare,
  Bell,
  LineChart,
  DollarSign,
  ChevronRight,
  Pill,
  Brain,
  Heart,
  Users,
  LayoutDashboard,
  Shield,
  Database,
  Activity as ActivityIcon,
  BarChart3,
  Stethoscope,
  TestTube,
  Microscope,
  Package,
  Wrench,
  ArrowRightLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const adminNavItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "User Management",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "System Health",
    icon: Database,
    href: "/admin/system",
  },
  {
    title: "Activity Log",
    icon: ActivityIcon,
    href: "/admin/activity",
  },
  {
    title: "Tracking",
    icon: BarChart3,
    href: "/admin/tracking",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "/admin/help",
  },
];

const doctorNavItems = [
  {
    title: "Home",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Order test",
    icon: ClipboardList,
    href: "/order-test",
  },
  {
    title: "Patient Measures",
    icon: ActivitySquare,
    href: "/patient-measures",
  },
  {
    title: "Reminder",
    icon: Bell,
    href: "/reminder",
  },
  {
    title: "Tracking Entries",
    icon: LineChart,
    href: "/tracking",
  },
  {
    title: "Financial Info",
    icon: DollarSign,
    href: "/financial",
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "/help",
  },
  {
    title: "User Profile",
    icon: User,
    href: "/doctor-profile",
  },
];

const patientNavItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Diagnostic Reports",
    icon: FileText,
    href: "/diagnostic-reports",
  },
  {
    title: "Medical History",
    icon: ClipboardList,
    href: "/medical-history",
  },
  {
    title: "Prescriptions",
    icon: Pill,
    href: "/prescriptions",
  },
  {
    title: "AI Features",
    icon: Brain,
    href: "/ai-features",
  },
  {
    title: "Transfers",
    icon: ArrowRightLeft,
    href: "/transfers",
  },
  {
    title: "Profile",
    icon: User,
    href: "/profile",
  },
  {
    title: "Health Program",
    icon: Heart,
    href: "/health-program",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

const nurseNavItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/nurse",
  },
  {
    title: "Patient Care",
    icon: Stethoscope,
    href: "/nurse/patient-care",
  },
  {
    title: "Vital Signs",
    icon: Activity,
    href: "/nurse/vital-signs",
  },
  {
    title: "Medications",
    icon: Pill,
    href: "/nurse/medications",
  },
  {
    title: "Appointments",
    icon: Calendar,
    href: "/nurse/appointments",
  },
  {
    title: "Patient Records",
    icon: FileText,
    href: "/nurse/records",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/nurse/settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "/nurse/help",
  },
];

const labNavItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/lab",
  },
  {
    title: "Test Management",
    icon: TestTube,
    href: "/lab/tests",
  },
  {
    title: "Results",
    icon: FileText,
    href: "/lab/results",
  },
  {
    title: "Equipment",
    icon: Microscope,
    href: "/lab/equipment",
  },
  {
    title: "Inventory",
    icon: Package,
    href: "/lab/inventory",
  },

  {
    title: "Maintenance",
    icon: Wrench,
    href: "/lab/maintenance",
  },
  {
    title: "Quality Control",
    icon: ClipboardList,
    href: "/lab/quality-control",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/lab/settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "/lab/help",
  },
];

const getNavItems = (role: string) => {
  switch (role) {
    case "admin":
      return adminNavItems;
    case "doctor":
      return doctorNavItems;
    case "patient":
      return patientNavItems;
    case "nurse":
      return nurseNavItems;
    case "lab":
      return labNavItems;
    default:
      return [];
  }
};

export const Sidebar = ({ onCollapseChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Get nav items based on user role
  const navItems = user ? getNavItems(user.role) : [];

  // Mobile sidebar open state
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);

    if (onCollapseChange) {
      onCollapseChange(newCollapsedState);
    }

    window.dispatchEvent(
      new CustomEvent("sidebarStateChange", {
        detail: { collapsed: newCollapsedState },
      })
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 block lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Menu className="h-6 w-6 text-medical-blue" />
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-gradient-to-b from-medical-navy via-medical-blue to-medical-navy text-white transition-all duration-300 shadow-xl",
          isCollapsed ? "w-20" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 py-6 border-b border-white/10">
          <div className="flex items-center">
            {!isCollapsed && (
              <h1 className="text-2xl font-semibold text-white ml-2 flex items-center">
                <span className="text-medical-light-blue">i</span>Care
                {user?.role === "admin" && (
                  <span className="ml-2 text-sm bg-red-500 px-2 py-1 rounded">
                    Admin
                  </span>
                )}
              </h1>
            )}
            {isCollapsed && (
              <h1 className="text-2xl font-semibold text-white">
                <span className="text-medical-light-blue">i</span>
              </h1>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="hidden lg:block p-2 hover:bg-white/10 rounded-lg"
          >
            <ChevronRight
              className={cn(
                "h-5 w-5 transition-transform",
                isCollapsed ? "rotate-180" : ""
              )}
            />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <div className="px-3 space-y-2">
            {navItems.map((item) => (
              <TooltipProvider key={item.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10",
                        location.pathname === item.href
                          ? "bg-white/15 text-white"
                          : "text-white/70"
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="truncate">{item.title}</span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right" className="font-medium">
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </nav>

        <div className="mt-auto border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
