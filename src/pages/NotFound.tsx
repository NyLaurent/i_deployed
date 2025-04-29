
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-medical-blue">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">Page Not Found</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-8 flex justify-center space-x-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </Button>
          
          <Button 
            className="flex items-center gap-2 bg-medical-blue hover:bg-medical-navy" 
            asChild
          >
            <Link to="/dashboard">
              <Home className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
