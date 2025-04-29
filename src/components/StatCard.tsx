import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  isCollapsed?: boolean;
}

export const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
  isCollapsed = false,
}: StatCardProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md border-slate-200/70 dark:border-slate-800/70 group",
        isCollapsed && "transform scale-105",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800/50 group-hover:from-primary/5 group-hover:to-primary/10 dark:group-hover:from-primary/20 dark:group-hover:to-primary/5 transition-colors duration-300">
        <CardTitle
          className={cn(
            "text-sm font-medium transition-all duration-300",
            isCollapsed && "text-base"
          )}
        >
          {title}
        </CardTitle>
        {Icon && (
          <div
            className={cn(
              "rounded-full bg-primary/10 text-primary transition-all duration-300",
              isCollapsed ? "p-3" : "p-2"
            )}
          >
            <Icon
              className={cn(
                "transition-all duration-300",
                isCollapsed ? "h-5 w-5" : "h-4 w-4"
              )}
            />
          </div>
        )}
      </CardHeader>
      <CardContent
        className={cn(
          "transition-all duration-300",
          isCollapsed ? "pt-5" : "pt-4"
        )}
      >
        <div
          className={cn(
            "font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent transition-all duration-300",
            isCollapsed ? "text-4xl" : "text-3xl"
          )}
        >
          {value}
        </div>
        {description && (
          <CardDescription
            className={cn(
              "mt-1 transition-all duration-300",
              isCollapsed ? "text-sm" : "text-xs"
            )}
          >
            {description}
          </CardDescription>
        )}
        {trend && trendValue && (
          <p
            className={cn(
              "mt-2 font-medium flex items-center transition-all duration-300",
              isCollapsed ? "text-sm" : "text-xs",
              trend === "up" && "text-emerald-600 dark:text-emerald-500",
              trend === "down" && "text-rose-600 dark:text-rose-500",
              trend === "neutral" && "text-gray-600 dark:text-gray-400"
            )}
          >
            <span
              className={cn(
                "inline-block mr-1 rounded-full transition-all duration-300",
                isCollapsed ? "p-1.5" : "p-1",
                trend === "up" && "bg-emerald-100 dark:bg-emerald-900/30",
                trend === "down" && "bg-rose-100 dark:bg-rose-900/30",
                trend === "neutral" && "bg-gray-100 dark:bg-gray-800"
              )}
            >
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {trend === "neutral" && "→"}
            </span>
            {trendValue}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
