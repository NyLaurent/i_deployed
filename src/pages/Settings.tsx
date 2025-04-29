import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Bell, Lock, User, Palette, LogOut, ChevronRight, Mail, FileText, Clock, Calendar, Globe, Moon, Sun, Smartphone, Shield, Key, Eye, EyeOff, Save, RefreshCw, SettingsIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Settings = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    language: "english",
    theme: "system",
    emailNotifications: true,
    appNotifications: true,
    smsNotifications: false,
    reportFrequency: "weekly",
    statisticalReports: true,
    appointmentReminders: true,
    medicationReminders: true,
    healthTips: true,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handlePasswordChange = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });

    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-6">
        {/* Header Card */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <span className="bg-primary/10 p-2 rounded-lg">
                    <SettingsIcon className="h-6 w-6 text-primary" />
                  </span>
                  Settings
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  Manage your account settings and preferences
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="gap-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveSettings}
                  className="gap-1"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="p-4 md:p-6 border-b">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-800 shadow-md">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xl bg-primary text-white">
                  {user.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <Badge variant="outline" className="w-fit mx-auto md:mx-0">
                    {user.role}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <RefreshCw className="h-3.5 w-3.5" />
                    Update Photo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Tabs */}
          <div className="p-4 md:p-6">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <TabsList>
                  <TabsTrigger value="personal" className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Personal</span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center gap-1">
                    <Lock className="h-4 w-4" />
                    <span className="hidden sm:inline">Security</span>
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="flex items-center gap-1">
                    <Palette className="h-4 w-4" />
                    <span className="hidden sm:inline">Appearance</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center gap-1">
                    <Bell className="h-4 w-4" />
                    <span className="hidden sm:inline">Notifications</span>
                  </TabsTrigger>
                </TabsList>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="gap-1"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="hidden sm:inline">Logout</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Sign out from your account</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Personal Settings */}
              <TabsContent value="personal" className="mt-0 space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Your email address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Your phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select
                          value={formData.language}
                          onValueChange={(value) =>
                            handleSelectChange("language", value)
                          }
                        >
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="chinese">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="mt-0 space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type={showPassword ? "text" : "password"}
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            placeholder="Enter current password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type={showPassword ? "text" : "password"}
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            placeholder="Enter new password"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm New Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={handlePasswordChange}
                        className="w-full md:w-auto"
                      >
                        Update Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                            <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="space-y-0.5">
                            <div className="font-medium">Authenticator App</div>
                            <div className="text-sm text-muted-foreground">
                              Use an authenticator app to generate one-time codes
                            </div>
                          </div>
                        </div>
                        <Switch checked={false} onCheckedChange={() => {}} />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <Smartphone className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="space-y-0.5">
                            <div className="font-medium">SMS Authentication</div>
                            <div className="text-sm text-muted-foreground">
                              Receive a code via SMS to verify your identity
                            </div>
                          </div>
                        </div>
                        <Switch checked={true} onCheckedChange={() => {}} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Session Management</CardTitle>
                    <CardDescription>
                      Manage your active sessions and devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                              <Smartphone className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <div className="font-medium">Current Device</div>
                              <div className="text-xs text-muted-foreground">
                                Chrome on Windows • IP 192.168.1.1
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/30">
                            Active Now
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Sign Out From All Devices
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appearance Settings */}
              <TabsContent value="appearance" className="mt-0 space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Theme</CardTitle>
                    <CardDescription>
                      Customize the appearance of the application
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      defaultValue={formData.theme}
                      onValueChange={(value) =>
                        handleSelectChange("theme", value)
                      }
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem
                          value="light"
                          id="theme-light"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="theme-light"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-slate-50 hover:border-slate-200 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Sun className="h-6 w-6 mb-3 text-amber-500" />
                          <div className="font-medium">Light</div>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="dark"
                          id="theme-dark"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="theme-dark"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-slate-950 p-4 hover:bg-slate-900 hover:border-slate-800 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Moon className="h-6 w-6 mb-3 text-slate-400" />
                          <div className="font-medium text-white">Dark</div>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="system"
                          id="theme-system"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="theme-system"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gradient-to-br from-white to-slate-900 p-4 hover:from-slate-50 hover:to-slate-800 hover:border-slate-300 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <div className="flex gap-1 mb-3">
                            <Sun className="h-6 w-6 text-amber-500" />
                            <Moon className="h-6 w-6 text-slate-400" />
                          </div>
                          <div className="font-medium">System</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Text Size</CardTitle>
                    <CardDescription>
                      Adjust the size of text throughout the application
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="text-size" className="text-sm">
                        A
                      </Label>
                      <Input
                        id="text-size"
                        type="range"
                        className="w-full"
                        min={1}
                        max={5}
                        defaultValue={3}
                      />
                      <Label htmlFor="text-size" className="text-lg">
                        A
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Accessibility</CardTitle>
                    <CardDescription>
                      Configure accessibility settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                            <RefreshCw className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                        <div>
                          <Label htmlFor="reduce-motion" className="font-medium">Reduce Motion</Label>
                          <p className="text-sm text-muted-foreground">Minimize animation effects</p>
                        </div>
                        </div>
                        <Switch id="reduce-motion" />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                            <Eye className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                        <div>
                          <Label htmlFor="high-contrast" className="font-medium">High Contrast</Label>
                          <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                        </div>
                        </div>
                        <Switch id="high-contrast" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications" className="mt-0 space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Notification Channels</CardTitle>
                    <CardDescription>
                      Choose how you want to receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                            <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="font-medium">Email Notifications</div>
                            <div className="text-sm text-muted-foreground">
                              Receive email updates about your appointments
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={formData.emailNotifications}
                          onCheckedChange={(checked) =>
                            handleSwitchChange("emailNotifications", checked)
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                            <Bell className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <div className="font-medium">App Notifications</div>
                            <div className="text-sm text-muted-foreground">
                              Receive notifications within the application
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={formData.appNotifications}
                          onCheckedChange={(checked) =>
                            handleSwitchChange("appNotifications", checked)
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <Smartphone className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <div className="font-medium">SMS Notifications</div>
                            <div className="text-sm text-muted-foreground">
                              Receive text messages for important updates
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={formData.smsNotifications}
                          onCheckedChange={(checked) =>
                            handleSwitchChange("smsNotifications", checked)
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>
                      Configure your report preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                            <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <div className="font-medium">Statistical Reports</div>
                            <div className="text-sm text-muted-foreground">
                              Receive email updates about your appointments
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={formData.statisticalReports}
                          onCheckedChange={(checked) =>
                            handleSwitchChange("statisticalReports", checked)
                          }
                        />
                      </div>

                      <div className="pl-8 space-y-4">
                        <div className="space-y-2">
                          <Label>Frequency of reports</Label>
                          <div className="grid grid-cols-3 gap-2">
                            <Button
                              variant={
                                formData.reportFrequency === "daily"
                                  ? "default"
                                  : "outline"
                              }
                              className="w-full"
                              onClick={() =>
                                handleSelectChange("reportFrequency", "daily")
                              }
                            >
                              Daily
                            </Button>
                            <Button
                              variant={
                                formData.reportFrequency === "weekly"
                                  ? "default"
                                  : "outline"
                              }
                              className="w-full"
                              onClick={() =>
                                handleSelectChange("reportFrequency", "weekly")
                              }
                            >
                              Weekly
                            </Button>
                            <Button
                              variant={
                                formData.reportFrequency === "monthly"
                                  ? "default"
                                  : "outline"
                              }
                              className="w-full"
                              onClick={() =>
                                handleSelectChange("reportFrequency", "monthly")
                              }
                            >
                              Monthly
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Notification Types</CardTitle>
                    <CardDescription>
                      Select which types of notifications you want to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-full">
                            <Calendar className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                          </div>
                          <div>
                            <div className="font-medium">Appointment Reminders</div>
                            <div className="text-sm text-muted-foreground">
                              Get notified about upcoming appointments
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={formData.appointmentReminders}
                          onCheckedChange={(checked) =>
                            handleSwitchChange("appointmentReminders", checked)
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <div className="font-medium">Medication Reminders</div>
                            <div className="text-sm text-muted-foreground">
                              Get notified when it's time to take medication
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={formData.medicationReminders}
                          onCheckedChange={(checked) =>
                            handleSwitchChange("medicationReminders", checked)
                          }
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <div className="font-medium">Health Tips & News</div>
                            <div className="text-sm text-muted-foreground">
                              Receive helpful health tips and news
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={formData.healthTips}
                          onCheckedChange={(checked) =>
                            handleSwitchChange("healthTips", checked)
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;
