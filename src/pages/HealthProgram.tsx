import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Activity,
  Search,
  Plus,
  Filter,
  Heart,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Users,
  CheckCircle2,
  BarChart2,
  ArrowRight,
  Dumbbell,
  Utensils,
  Brain,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HealthProgram = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Sample health programs data
  const healthPrograms = [
    {
      id: 1,
      title: "Heart Health Initiative",
      description:
        "A comprehensive program designed to improve cardiovascular health through exercise, diet, and lifestyle changes.",
      category: "Cardiovascular",
      duration: "12 weeks",
      startDate: "2024-01-15",
      endDate: "2024-04-08",
      progress: 65,
      status: "In Progress",
      participants: 128,
      coordinator: "Dr. Sarah Johnson",
      activities: [
        {
          name: "Daily Walking",
          frequency: "30 minutes daily",
          completed: true,
        },
        {
          name: "Blood Pressure Monitoring",
          frequency: "Twice weekly",
          completed: true,
        },
        {
          name: "Nutrition Consultation",
          frequency: "Monthly",
          completed: false,
        },
        {
          name: "Stress Management Session",
          frequency: "Weekly",
          completed: true,
        },
      ],
      metrics: [
        {
          name: "Blood Pressure",
          initial: "140/90",
          current: "128/84",
          target: "120/80",
        },
        {
          name: "Resting Heart Rate",
          initial: "78 bpm",
          current: "72 bpm",
          target: "68 bpm",
        },
        {
          name: "Cholesterol",
          initial: "220 mg/dL",
          current: "195 mg/dL",
          target: "180 mg/dL",
        },
      ],
      icon: Heart,
      color: "red",
    },
    {
      id: 2,
      title: "Diabetes Management",
      description:
        "A structured program to help manage diabetes through blood sugar monitoring, diet planning, and regular exercise.",
      category: "Metabolic",
      duration: "16 weeks",
      startDate: "2024-02-10",
      endDate: "2024-05-31",
      progress: 40,
      status: "In Progress",
      participants: 95,
      coordinator: "Dr. Michael Chen",
      activities: [
        {
          name: "Blood Sugar Monitoring",
          frequency: "Twice daily",
          completed: true,
        },
        { name: "Diabetic Diet Plan", frequency: "Daily", completed: true },
        { name: "Foot Care Routine", frequency: "Daily", completed: false },
        {
          name: "Exercise Regimen",
          frequency: "4 times weekly",
          completed: false,
        },
      ],
      metrics: [
        {
          name: "Fasting Blood Sugar",
          initial: "160 mg/dL",
          current: "140 mg/dL",
          target: "120 mg/dL",
        },
        { name: "HbA1c", initial: "7.8%", current: "7.2%", target: "6.5%" },
        { name: "Weight", initial: "85 kg", current: "82 kg", target: "78 kg" },
      ],
      icon: Activity,
      color: "blue",
    },
    {
      id: 3,
      title: "Weight Management Program",
      description:
        "A holistic approach to weight management combining nutrition education, physical activity, and behavioral strategies.",
      category: "Nutrition",
      duration: "24 weeks",
      startDate: "2023-11-05",
      endDate: "2024-04-21",
      progress: 75,
      status: "In Progress",
      participants: 210,
      coordinator: "Dr. Emily Williams",
      activities: [
        { name: "Calorie Tracking", frequency: "Daily", completed: true },
        {
          name: "Strength Training",
          frequency: "3 times weekly",
          completed: true,
        },
        {
          name: "Cardio Exercise",
          frequency: "4 times weekly",
          completed: true,
        },
        {
          name: "Nutrition Counseling",
          frequency: "Bi-weekly",
          completed: false,
        },
      ],
      metrics: [
        { name: "Weight", initial: "92 kg", current: "84 kg", target: "75 kg" },
        { name: "BMI", initial: "31.2", current: "28.5", target: "25.0" },
        {
          name: "Waist Circumference",
          initial: "98 cm",
          current: "92 cm",
          target: "85 cm",
        },
      ],
      icon: Dumbbell,
      color: "green",
    },
    {
      id: 4,
      title: "Stress Reduction & Mental Wellness",
      description:
        "A program focused on reducing stress and improving mental health through mindfulness, meditation, and cognitive techniques.",
      category: "Mental Health",
      duration: "8 weeks",
      startDate: "2024-03-01",
      endDate: "2024-04-26",
      progress: 25,
      status: "In Progress",
      participants: 75,
      coordinator: "Dr. Robert Brown",
      activities: [
        { name: "Guided Meditation", frequency: "Daily", completed: true },
        { name: "Stress Journal", frequency: "Daily", completed: false },
        {
          name: "Cognitive Behavioral Therapy",
          frequency: "Weekly",
          completed: true,
        },
        {
          name: "Relaxation Techniques",
          frequency: "Twice daily",
          completed: false,
        },
      ],
      metrics: [
        {
          name: "Perceived Stress Scale",
          initial: "28/40",
          current: "22/40",
          target: "15/40",
        },
        {
          name: "Sleep Quality",
          initial: "Poor",
          current: "Fair",
          target: "Good",
        },
        {
          name: "Anxiety Level",
          initial: "Moderate",
          current: "Mild",
          target: "Minimal",
        },
      ],
      icon: Brain,
      color: "purple",
    },
    {
      id: 5,
      title: "Smoking Cessation",
      description:
        "A comprehensive program to help individuals quit smoking through behavioral strategies, support groups, and medical interventions.",
      category: "Addiction",
      duration: "12 weeks",
      startDate: "2024-01-20",
      endDate: "2024-04-13",
      progress: 60,
      status: "In Progress",
      participants: 45,
      coordinator: "Dr. James Wilson",
      activities: [
        {
          name: "Nicotine Replacement Therapy",
          frequency: "As prescribed",
          completed: true,
        },
        { name: "Support Group Meeting", frequency: "Weekly", completed: true },
        {
          name: "Trigger Identification",
          frequency: "Daily",
          completed: false,
        },
        {
          name: "Breathing Exercises",
          frequency: "Twice daily",
          completed: true,
        },
      ],
      metrics: [
        {
          name: "Cigarettes per Day",
          initial: "20",
          current: "8",
          target: "0",
        },
        {
          name: "Cravings Intensity",
          initial: "Severe",
          current: "Moderate",
          target: "Minimal",
        },
        {
          name: "Carbon Monoxide Level",
          initial: "25 ppm",
          current: "15 ppm",
          target: "< 10 ppm",
        },
      ],
      icon: Zap,
      color: "orange",
    },
    {
      id: 6,
      title: "Nutrition & Healthy Eating",
      description:
        "A program designed to improve dietary habits, increase nutritional knowledge, and develop sustainable healthy eating patterns.",
      category: "Nutrition",
      duration: "10 weeks",
      startDate: "2024-02-15",
      endDate: "2024-04-25",
      progress: 30,
      status: "In Progress",
      participants: 150,
      coordinator: "Dr. Olivia Martinez",
      activities: [
        { name: "Meal Planning", frequency: "Weekly", completed: true },
        {
          name: "Cooking Demonstrations",
          frequency: "Bi-weekly",
          completed: false,
        },
        {
          name: "Grocery Shopping Guide",
          frequency: "Weekly",
          completed: true,
        },
        { name: "Nutrition Education", frequency: "Weekly", completed: false },
      ],
      metrics: [
        {
          name: "Fruit & Vegetable Intake",
          initial: "2 servings/day",
          current: "4 servings/day",
          target: "5+ servings/day",
        },
        {
          name: "Processed Food Consumption",
          initial: "High",
          current: "Moderate",
          target: "Low",
        },
        {
          name: "Water Intake",
          initial: "4 cups/day",
          current: "6 cups/day",
          target: "8 cups/day",
        },
      ],
      icon: Utensils,
      color: "amber",
    },
  ];

  // Filter programs based on search query and active tab
  const filteredPrograms = healthPrograms.filter((program) => {
    // Search filter
    const matchesSearch =
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.coordinator.toLowerCase().includes(searchQuery.toLowerCase());

    // Tab filter
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "cardiovascular")
      return matchesSearch && program.category === "Cardiovascular";
    if (activeTab === "nutrition")
      return matchesSearch && program.category === "Nutrition";
    if (activeTab === "mental")
      return matchesSearch && program.category === "Mental Health";
    if (activeTab === "metabolic")
      return matchesSearch && program.category === "Metabolic";

    return matchesSearch;
  });

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Get icon color class
  const getIconColorClass = (color) => {
    switch (color) {
      case "red":
        return "text-red-500 bg-red-100 dark:bg-red-900/30";
      case "blue":
        return "text-blue-500 bg-blue-100 dark:bg-blue-900/30";
      case "green":
        return "text-green-500 bg-green-100 dark:bg-green-900/30";
      case "purple":
        return "text-purple-500 bg-purple-100 dark:bg-purple-900/30";
      case "orange":
        return "text-orange-500 bg-orange-100 dark:bg-orange-900/30";
      case "amber":
        return "text-amber-500 bg-amber-100 dark:bg-amber-900/30";
      default:
        return "text-primary bg-primary/10";
    }
  };

  // Get progress color class
  const getProgressColorClass = (progress) => {
    if (progress < 25) return "bg-red-500";
    if (progress < 50) return "bg-orange-500";
    if (progress < 75) return "bg-amber-500";
    return "bg-green-500";
  };

  // Summary statistics
  const totalPrograms = healthPrograms.length;
  const totalParticipants = healthPrograms.reduce(
    (sum, program) => sum + program.participants,
    0
  );
  const averageProgress = Math.round(
    healthPrograms.reduce((sum, program) => sum + program.progress, 0) /
      totalPrograms
  );
  const categoryCounts = healthPrograms.reduce((acc, program) => {
    acc[program.category] = (acc[program.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <span className="bg-primary/10 p-2 rounded-lg">
                    <Activity className="h-6 w-6 text-primary" />
                  </span>
                  Health Programs
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  Join wellness initiatives, track your progress, and improve
                  your health with our specialized programs
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search programs..."
                    className="pl-10 pr-4 py-2 w-full rounded-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                      >
                        <Filter className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter programs</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button className="rounded-full shadow-lg bg-gradient-to-r from-medical-blue to-medical-navy hover:from-medical-navy hover:to-medical-blue transition-all duration-300">
                  <Plus className="h-4 w-4 mr-2" />
                  Join Program
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-b">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Programs
                  </p>
                  <h3 className="text-2xl font-bold">{totalPrograms}</h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <h3 className="text-2xl font-bold">{totalParticipants}</h3>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Progress</p>
                  <h3 className="text-2xl font-bold">{averageProgress}%</h3>
                </div>
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                  <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <h3 className="text-2xl font-bold">
                    {Object.keys(categoryCounts).length}
                  </h3>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <BarChart2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Tabs and Filters */}
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-5 bg-white dark:bg-slate-800 rounded-lg p-1 border">
              <TabsTrigger value="all" className="rounded-md">
                All Programs
              </TabsTrigger>
              <TabsTrigger value="cardiovascular" className="rounded-md">
                Cardiovascular
              </TabsTrigger>
              <TabsTrigger value="nutrition" className="rounded-md">
                Nutrition
              </TabsTrigger>
              <TabsTrigger value="mental" className="rounded-md">
                Mental Health
              </TabsTrigger>
              <TabsTrigger value="metabolic" className="rounded-md">
                Metabolic
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Programs Grid */}
          {filteredPrograms.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="mx-auto w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                <Activity className="h-7 w-7 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No programs found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery
                  ? `No programs matching "${searchQuery}"`
                  : "There are no health programs available in this category."}
              </p>
              <Button className="bg-gradient-to-r from-medical-blue to-medical-navy hover:from-medical-navy hover:to-medical-blue transition-all duration-300">
                <Plus className="h-4 w-4 mr-2" /> Request New Program
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => (
                <Card
                  key={program.id}
                  className="overflow-hidden hover:shadow-md transition-shadow border-slate-200 dark:border-slate-700"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div
                        className={`p-2 rounded-lg ${getIconColorClass(program.color)}`}
                      >
                        {React.createElement(program.icon, {
                          className: "h-5 w-5",
                        })}
                      </div>
                      <Badge variant="outline" className="font-normal">
                        {program.category}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4 text-xl">
                      {program.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Duration
                          </p>
                          <p className="font-medium">{program.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Participants
                          </p>
                          <p className="font-medium">{program.participants}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Start Date
                          </p>
                          <p className="font-medium">
                            {formatDate(program.startDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            End Date
                          </p>
                          <p className="font-medium">
                            {formatDate(program.endDate)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium">Progress</p>
                          <p className="text-sm font-medium">
                            {program.progress}%
                          </p>
                        </div>
                        <Progress
                          value={program.progress}
                          className="h-2 bg-slate-100 dark:bg-slate-700"
                          indicatorClassName={getProgressColorClass(
                            program.progress
                          )}
                        />
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Key Activities
                        </p>
                        <div className="space-y-2">
                          {program.activities
                            .slice(0, 3)
                            .map((activity, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between text-sm"
                              >
                                <div className="flex items-center">
                                  <CheckCircle2
                                    className={`h-4 w-4 mr-2 ${activity.completed ? "text-green-500" : "text-slate-300 dark:text-slate-600"}`}
                                    fill={
                                      activity.completed
                                        ? "currentColor"
                                        : "none"
                                    }
                                  />
                                  <span>{activity.name}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {activity.frequency}
                                </span>
                              </div>
                            ))}
                          {program.activities.length > 3 && (
                            <p className="text-xs text-muted-foreground text-center mt-1">
                              +{program.activities.length - 3} more activities
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Coordinator
                      </p>
                      <p className="text-sm font-medium">
                        {program.coordinator}
                      </p>
                    </div>
                    <Button variant="outline" className="gap-1">
                      View Details <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Featured Program */}
          {filteredPrograms.length > 0 && (
            <Card className="mt-8 border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="grid md:grid-cols-3 gap-0">
                <div className="md:col-span-1 bg-gradient-to-br from-medical-blue to-medical-navy p-6 text-white">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <Badge className="bg-white/20 hover:bg-white/30 text-white border-none mb-4">
                        Featured Program
                      </Badge>
                      <h2 className="text-2xl font-bold mb-2">
                        Join Our Community
                      </h2>
                      <p className="text-white/80 mb-4">
                        Connect with others on similar health journeys, share
                        experiences, and get motivated by group progress.
                      </p>

                      <div className="space-y-4 mt-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-white/20 p-2 rounded-full">
                            <Users className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Support Groups</p>
                            <p className="text-sm text-white/70">
                              Weekly meetings
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-white/20 p-2 rounded-full">
                            <Award className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Achievement System</p>
                            <p className="text-sm text-white/70">
                              Track your milestones
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-white/20 p-2 rounded-full">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Scheduled Events</p>
                            <p className="text-sm text-white/70">
                              In-person & virtual options
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button className="mt-6 bg-white text-medical-navy hover:bg-white/90">
                      Learn More
                    </Button>
                  </div>
                </div>

                <div className="md:col-span-2 p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Upcoming Health Programs
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border border-slate-200 dark:border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                              <Dumbbell className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-medium">Senior Fitness</h4>
                              <p className="text-sm text-muted-foreground">
                                Starts May 15, 2024
                              </p>
                              <p className="text-xs mt-1">
                                Tailored exercises for seniors to improve
                                mobility and strength
                              </p>
                              <Button
                                variant="link"
                                className="h-auto p-0 mt-1 text-medical-blue"
                              >
                                Register Now
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-slate-200 dark:border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                              <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <h4 className="font-medium">
                                Mindfulness & Meditation
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Starts May 10, 2024
                              </p>
                              <p className="text-xs mt-1">
                                Learn techniques to reduce stress and improve
                                mental clarity
                              </p>
                              <Button
                                variant="link"
                                className="h-auto p-0 mt-1 text-medical-blue"
                              >
                                Register Now
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-slate-200 dark:border-slate-700">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                              <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <h4 className="font-medium">
                                Mindfulness & Meditation
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Starts May 10, 2024
                              </p>
                              <p className="text-xs mt-1">
                                Learn techniques to reduce stress and improve
                                mental clarity
                              </p>
                              <Button
                                variant="link"
                                className="h-auto p-0 mt-1 text-medical-blue"
                              >
                                Register Now
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
};

export default HealthProgram;
