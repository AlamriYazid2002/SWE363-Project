import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";
import { Card } from "../ui/card";
import { useNavigation } from "../../contexts/NavigationContext";
import { useState } from "react";

export function Login() {
  const { navigateTo, login } = useNavigation();
  const [selectedRole, setSelectedRole] = useState("student");

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login - in real app, this would authenticate
    login(selectedRole);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kfupm-green-light via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block space-y-6">
          <div className="space-y-4">
            <div className="w-20 h-20 bg-kfupm-green rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl">K</span>
            </div>
            <div>
              <h1 className="text-4xl text-kfupm-green mb-2">KFUPM Events Hub</h1>
              <p className="text-xl text-gray-600">
                Your gateway to campus events and activities
              </p>
            </div>
          </div>
          
          <div className="space-y-4 pt-8">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-kfupm-green/10 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-kfupm-green"></div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-1">Discover Events</h3>
                <p className="text-gray-600 text-sm">
                  Browse and register for campus events in one centralized platform
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-kfupm-green/10 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-kfupm-green"></div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-1">Track Attendance</h3>
                <p className="text-gray-600 text-sm">
                  Check in with QR codes and never miss important events
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-kfupm-green/10 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-kfupm-green"></div>
              </div>
              <div>
                <h3 className="text-gray-900 mb-1">Stay Connected</h3>
                <p className="text-gray-600 text-sm">
                  Get notifications and updates about your registered events
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="p-8 shadow-xl">
          <div className="space-y-6">
            {/* Mobile Branding */}
            <div className="md:hidden text-center">
              <div className="w-16 h-16 bg-kfupm-green rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                <span className="text-white text-2xl">K</span>
              </div>
              <h2 className="text-kfupm-green">KFUPM Events Hub</h2>
            </div>

            <div>
              <h2 className="text-2xl text-gray-900 mb-2">Welcome back</h2>
              <p className="text-gray-600">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Role Selection - Demo Only */}
              <div className="space-y-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Label className="text-sm text-blue-900">Demo: Select Role to Login As</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={selectedRole === "student" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRole("student")}
                    className={selectedRole === "student" ? "bg-kfupm-green hover:bg-kfupm-green-dark" : ""}
                  >
                    Student
                  </Button>
                  <Button
                    type="button"
                    variant={selectedRole === "organizer" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRole("organizer")}
                    className={selectedRole === "organizer" ? "bg-kfupm-green hover:bg-kfupm-green-dark" : ""}
                  >
                    Organizer
                  </Button>
                  <Button
                    type="button"
                    variant={selectedRole === "admin" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRole("admin")}
                    className={selectedRole === "admin" ? "bg-kfupm-green hover:bg-kfupm-green-dark" : ""}
                  >
                    Admin
                  </Button>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="s202012345@kfupm.edu.sa"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <button type="button" className="text-sm text-kfupm-green hover:text-kfupm-green-dark">
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <Button type="submit" className="w-full bg-kfupm-green hover:bg-kfupm-green-dark">
                <LogIn size={20} className="mr-2" />
                Sign In
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* SSO Button */}
              <Button type="button" variant="outline" className="w-full">
                <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with KFUPM Account
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button 
                  type="button"
                  onClick={() => navigateTo("signup")}
                  className="text-kfupm-green hover:text-kfupm-green-dark inline-flex items-center gap-1"
                >
                  Create account
                  <ArrowRight size={16} />
                </button>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}