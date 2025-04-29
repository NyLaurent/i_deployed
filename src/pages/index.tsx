import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-800 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyB0cmFuc2Zvcm09InJvdGF0ZSg0NSAxMDAgMTAwKSIgc3Ryb2tlPSIjMDA3MmZmMDUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSI+PHJlY3QgeD0iOTAiIHk9IjkwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIC8+PHJlY3QgeD0iNzAiIHk9IjcwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIC8+PHJlY3QgeD0iNTAiIHk9IjUwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgLz48L2c+PC9zdmc+')] bg-repeat opacity-50 dark:opacity-10"></div>

      {/* Animated circles */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-indigo-400 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-sky-400 dark:bg-sky-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <main className="flex flex-1 items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="hidden lg:flex flex-col space-y-8 pr-8">
            <div className="animate-float-up">
              <div className="flex items-center">
                <div className="text-6xl font-bold text-medical-blue">
                  <span className="text-medical-light-blue">i</span>Care
                </div>
                <div className="wave-animation ml-2">
                  <div className="wave-bar text-medical-blue"></div>
                  <div className="wave-bar text-medical-light-blue"></div>
                  <div className="wave-bar text-medical-teal"></div>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight mt-6 bg-gradient-to-r from-medical-blue to-medical-light-blue bg-clip-text text-transparent">
                Healthcare at Your Fingertips
              </h1>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                A unified platform for patients and healthcare providers. Manage
                health records, track vitals, and stay connected with your
                healthcare team.
              </p>
            </div>

            <div
              className="grid grid-cols-2 gap-4 animate-float-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-5 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-medical-blue mb-3 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Patient-Centered</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Designed around the needs of patients with an intuitive
                  interface.
                </p>
              </div>

              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-5 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-medical-blue mb-3 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12h20" />
                    <path d="M2 12a10 10 0 0 1 10-10" />
                    <path d="M12 2a10 10 0 0 1 0 20" />
                    <path d="M2 12a10 10 0 0 0 10 10" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Comprehensive</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  All your health information in one secure, accessible place.
                </p>
              </div>

              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-5 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-medical-blue mb-3 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Insightful</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Track trends in your health data with advanced visualizations.
                </p>
              </div>

              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-5 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-medical-blue mb-3 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M7 7h10" />
                    <path d="M7 12h10" />
                    <path d="M7 17h10" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Organized</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Keep track of appointments, medications, and medical history.
                </p>
              </div>
            </div>
          </div>

          <LoginForm />
        </div>
      </main>

      <style>
        {`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          
          @keyframes float-up {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-float-up {
            animation: float-up 0.8s ease-out forwards;
          }
          
          .wave-animation {
            display: flex;
            align-items: flex-end;
            height: 20px;
          }
          .wave-bar {
            width: 3px;
            height: 100%;
            margin-right: 3px;
            border-radius: 3px;
            animation: wave 1.5s ease-in-out infinite;
          }
          .wave-bar:nth-child(2) {
            animation-delay: 0.2s;
          }
          .wave-bar:nth-child(3) {
            animation-delay: 0.4s;
          }
          @keyframes wave {
            0%, 100% {
              height: 8px;
            }
            50% {
              height: 20px;
            }
          }
          
          .glass-card {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </div>
  );
};

export default Index;
