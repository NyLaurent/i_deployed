import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  Book,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  HelpCircle,
  ExternalLink,
  Video,
  Shield,
} from "lucide-react";

const faqs = [
  {
    question: "How do I add a new user to the system?",
    answer:
      "To add a new user, go to User Management and click the 'Add New User' button. Fill in the required information and select the appropriate role. The new user will receive an email with login credentials.",
  },
  {
    question: "How can I monitor system performance?",
    answer:
      "System performance can be monitored through the System Health dashboard. It provides real-time metrics for CPU usage, memory utilization, and active connections. You can also set up alerts for specific thresholds.",
  },
  {
    question: "What should I do if I notice suspicious activity?",
    answer:
      "If you notice suspicious activity, immediately check the Activity Log for details. You can temporarily suspend affected user accounts and contact our security team through the emergency support line.",
  },
  {
    question: "How do I configure backup settings?",
    answer:
      "Navigate to Settings > System and locate the Backup Schedule section. You can choose between hourly, daily, or weekly backups. Make sure to set up a secure backup location and test the restore process regularly.",
  },
];

const quickGuides = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of administering the iCare platform",
    icon: Book,
    link: "#",
  },
  {
    title: "Security Best Practices",
    description: "Essential security guidelines for administrators",
    icon: Shield,
    link: "#",
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides for common tasks",
    icon: Video,
    link: "#",
  },
  {
    title: "API Documentation",
    description: "Complete API reference for developers",
    icon: FileText,
    link: "#",
  },
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Help Center</h2>
        <Button>
          <MessageCircle className="mr-2 h-4 w-4" />
          Contact Support
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search help articles..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Quick Access Guides */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickGuides.map((guide) => {
          const IconComponent = guide.icon;
          return (
            <Card
              key={guide.title}
              className="hover:bg-accent/50 cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm font-medium">
                    {guide.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {guide.description}
                </p>
                <Button variant="link" className="mt-2 p-0">
                  Learn more
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Support Options */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Email Support</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get help via email. We typically respond within 24 hours.
            </p>
            <Button variant="outline" className="w-full">
              support@icare.com
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Phone Support</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Available Monday to Friday, 9 AM - 5 PM EST.
            </p>
            <Button variant="outline" className="w-full">
              1-800-ICARE-HELP
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Live Chat</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Chat with our support team in real-time.
            </p>
            <Button className="w-full">Start Chat</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
