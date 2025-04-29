import React, { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  FileText,
  HelpCircle,
  MessageSquare,
  Phone,
  Shield,
  Video,
  ChevronDown,
  ChevronRight,
  Mail,
  ExternalLink,
  Calendar,
  Pill,
  Activity,
  Brain,
  User,
  Compass,
  Stethoscope,
  Truck,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    if (expandedFaqs.includes(index)) {
      setExpandedFaqs(expandedFaqs.filter((i) => i !== index));
    } else {
      setExpandedFaqs([...expandedFaqs, index]);
    }
  };

  const faqs = [
    {
      question: "How do I view my medical records?",
      answer:
        "You can view your medical records by navigating to the Dashboard and clicking on 'My Medical Records'. From there, you can access all your health information including allergies, lab tests, medications, and more.",
    },
    {
      question: "How do I schedule an appointment?",
      answer:
        "To schedule an appointment, go to the Dashboard and look for the 'Upcoming Appointments' section. Click on 'Schedule New' to create a new appointment. You can select your preferred doctor, date, and time.",
    },
    {
      question: "How can I track my vital signs?",
      answer:
        "You can track your vital signs by using the 'Health Metrics' feature on your Dashboard. Click on 'Add New Reading' to input new measurements such as heart rate, blood pressure, or blood glucose levels.",
    },
    {
      question: "How do I update my personal information?",
      answer:
        "To update your personal information, go to Settings and select the 'Personal' tab. From there, you can edit your profile details, contact information, and emergency contacts.",
    },
    {
      question: "How do I access my prescription information?",
      answer:
        "You can access your prescription information by clicking on 'Medications' from your Dashboard or medical records section. This will show all your active and past prescriptions, dosage information, and refill status.",
    },
    {
      question: "How do I join a health program?",
      answer:
        "To join a health program, navigate to the 'Health Programs' section from your Dashboard. Browse available programs, click on one that interests you, and select 'Register Now' or 'Learn More' for additional information.",
    },
    {
      question: "How can I view my diagnostic reports?",
      answer:
        "You can view your diagnostic reports by going to the 'Diagnostic Reports' section. This will display all your test results, medical imaging reports, and other diagnostic information.",
    },
    {
      question: "How do I use the AI diagnostic features?",
      answer:
        "To use the AI diagnostic features, navigate to the 'AI Features' section from your Dashboard. You can input your symptoms, chat with the AI assistant, or review AI-generated health insights based on your data.",
    },
  ];

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-800">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyB0cmFuc2Zvcm09InJvdGF0ZSg0NSAxMDAgMTAwKSIgc3Ryb2tlPSIjMDA3MmZmMDUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSI+PHJlY3QgeD0iOTAiIHk9IjkwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIC8+PHJlY3QgeD0iNzAiIHk9IjcwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIC8+PHJlY3QgeD0iNTAiIHk9IjUwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgLz48L2c+PC9zdmc+')] bg-repeat opacity-50 dark:opacity-10"></div>

      {/* Animated circles */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-indigo-400 dark:bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-sky-400 dark:bg-sky-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <main className="flex-1 p-6 relative z-10">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Breadcrumb */}
          {/* <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Help Center</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}

          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-medical-blue to-medical-light-blue bg-clip-text text-transparent">
              How can we help you?
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find answers to common questions, learn how to use iCare features,
              or contact our support team for assistance.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto mt-8">
              <Input
                type="text"
                placeholder="Search for help topics..."
                className="pl-10 pr-4 py-6 w-full rounded-full border bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Main content */}
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
              <TabsTrigger
                value="faq"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQs
              </TabsTrigger>
              <TabsTrigger
                value="guides"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <FileText className="h-4 w-4 mr-2" />
                Guides
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact
              </TabsTrigger>
            </TabsList>

            {/* FAQs Tab */}
            <TabsContent value="faq" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="bg-primary/10 p-1.5 rounded-md mr-2">
                        <HelpCircle className="h-5 w-5 text-primary" />
                      </span>
                      Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>
                      Find answers to the most common questions about using
                      iCare
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {filteredFaqs.length > 0 ? (
                      filteredFaqs.map((faq, index) => (
                        <div
                          key={index}
                          className="border rounded-lg overflow-hidden bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                        >
                          <button
                            className="flex justify-between items-center w-full p-4 text-left font-medium"
                            onClick={() => toggleFaq(index)}
                          >
                            {faq.question}
                            {expandedFaqs.includes(index) ? (
                              <ChevronDown className="h-5 w-5 text-primary" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-primary" />
                            )}
                          </button>
                          {expandedFaqs.includes(index) && (
                            <div className="p-4 pt-0 text-muted-foreground border-t">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-6">
                        <p className="text-muted-foreground">
                          No results found for "{searchQuery}"
                        </p>
                        <Button
                          variant="link"
                          className="mt-2"
                          onClick={() => setSearchQuery("")}
                        >
                          Clear search
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <span className="bg-primary/10 p-1.5 rounded-md mr-2">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </span>
                        Popular Topics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          {
                            title: "Medical Records",
                            icon: FileText,
                            color: "bg-blue-100 text-blue-600",
                          },
                          {
                            title: "Appointments",
                            icon: Calendar,
                            color: "bg-green-100 text-green-600",
                          },
                          {
                            title: "Prescriptions",
                            icon: Pill,
                            color: "bg-purple-100 text-purple-600",
                          },
                          {
                            title: "Health Programs",
                            icon: Activity,
                            color: "bg-orange-100 text-orange-600",
                          },
                          {
                            title: "AI Features",
                            icon: Brain,
                            color: "bg-indigo-100 text-indigo-600",
                          },
                          {
                            title: "Account Settings",
                            icon: User,
                            color: "bg-slate-100 text-slate-600",
                          },
                        ].map((topic, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="justify-start h-auto py-3 px-4 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800"
                          >
                            <div
                              className={`p-1.5 rounded-md mr-2 ${topic.color}`}
                            >
                              <topic.icon className="h-4 w-4" />
                            </div>
                            <span>{topic.title}</span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card overflow-hidden">
                    <div className="bg-gradient-to-r from-medical-blue to-medical-navy text-white p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        Need more help?
                      </h3>
                      <p className="text-white/80 mb-4">
                        Our support team is available to assist you with any
                        questions or issues.
                      </p>
                      <Button className="bg-white text-medical-navy hover:bg-white/90">
                        Contact Support <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Guides Tab */}
            <TabsContent value="guides" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Getting Started",
                    description: "Learn the basics of using iCare",
                    icon: Compass,
                    articles: [
                      "Creating your account",
                      "Setting up your profile",
                      "Understanding the dashboard",
                      "Privacy and security",
                    ],
                  },
                  {
                    title: "Managing Health Records",
                    description:
                      "How to view and manage your medical information",
                    icon: FileText,
                    articles: [
                      "Accessing your records",
                      "Understanding test results",
                      "Sharing records with providers",
                      "Importing external records",
                    ],
                  },
                  {
                    title: "Appointments & Scheduling",
                    description: "Schedule and manage your healthcare visits",
                    icon: Calendar,
                    articles: [
                      "Booking an appointment",
                      "Virtual visit preparation",
                      "Rescheduling appointments",
                      "Setting up reminders",
                    ],
                  },
                  {
                    title: "Medications & Prescriptions",
                    description: "Track and manage your medications",
                    icon: Pill,
                    articles: [
                      "Viewing your prescriptions",
                      "Setting medication reminders",
                      "Requesting refills",
                      "Medication interactions",
                    ],
                  },
                  {
                    title: "Health Programs",
                    description: "Join and participate in wellness programs",
                    icon: Activity,
                    articles: [
                      "Finding suitable programs",
                      "Program registration",
                      "Tracking your progress",
                      "Connecting with other participants",
                    ],
                  },
                  {
                    title: "AI Features & Tools",
                    description: "Using AI-powered health features",
                    icon: Brain,
                    articles: [
                      "AI health assistant",
                      "Symptom analysis",
                      "Health predictions",
                      "Data privacy with AI",
                    ],
                  },
                ].map((guide, index) => (
                  <Card
                    key={index}
                    className="glass-card overflow-hidden hover:shadow-md transition-all"
                  >
                    <CardHeader className="pb-2">
                      <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-2">
                        <guide.icon className="h-5 w-5" />
                      </div>
                      <CardTitle>{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {guide.articles.map((article, idx) => (
                          <li key={idx}>
                            <Button
                              variant="link"
                              className="p-0 h-auto text-primary justify-start"
                            >
                              <ChevronRight className="h-4 w-4 mr-1" />
                              {article}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="glass-card p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">
                      Complete Documentation
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Access our comprehensive documentation for detailed
                      instructions on all iCare features.
                    </p>
                    <Button className="bg-gradient-to-r from-medical-blue to-medical-navy hover:from-medical-navy hover:to-medical-blue transition-all duration-300">
                      View Documentation{" "}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <div className="p-2 w-fit rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-2">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <CardTitle>Live Chat</CardTitle>
                    <CardDescription>
                      Chat with our support team in real-time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Available Monday to Friday, 9am - 5pm EST. Typical
                      response time under 5 minutes.
                    </p>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
                      Start Chat <MessageSquare className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <div className="p-2 w-fit rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 mb-2">
                      <Mail className="h-5 w-5" />
                    </div>
                    <CardTitle>Email Support</CardTitle>
                    <CardDescription>Send us a message anytime</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      We typically respond within 24 hours. For urgent matters,
                      please use live chat or phone.
                    </p>
                    <Button variant="outline" className="w-full">
                      support@icare.health
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <div className="p-2 w-fit rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 mb-2">
                      <Phone className="h-5 w-5" />
                    </div>
                    <CardTitle>Phone Support</CardTitle>
                    <CardDescription>
                      Speak directly with our team
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Available Monday to Friday, 9am - 5pm EST. For medical
                      emergencies, please call 911.
                    </p>
                    <Button variant="outline" className="w-full">
                      1-800-ICARE-HELP
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Send us a message
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <Input id="name" placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Your email"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject
                        </label>
                        <Input id="subject" placeholder="How can we help?" />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Please describe your issue or question"
                        ></textarea>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-medical-blue to-medical-navy hover:from-medical-navy hover:to-medical-blue transition-all duration-300">
                        Send Message
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Frequently Asked Support Questions
                      </h3>
                      <div className="space-y-3">
                        {[
                          "How do I reset my password?",
                          "Can I delete my account?",
                          "How do I update my insurance information?",
                          "Is my data secure and private?",
                        ].map((question, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                            <Button
                              variant="link"
                              className="p-0 h-auto text-foreground hover:text-primary justify-start"
                            >
                              {question}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <HelpCircle className="h-4 w-4 text-primary" />
                        Support Hours
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p className="flex justify-between">
                          <span>Monday - Friday:</span>
                          <span>9:00 AM - 5:00 PM EST</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Saturday:</span>
                          <span>10:00 AM - 2:00 PM EST</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Sunday:</span>
                          <span>Closed</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Help;
