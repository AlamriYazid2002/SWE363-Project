import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";
import { Card } from "../ui/card";
import { useNavigation } from "../../contexts/NavigationContext";
import { useState } from "react";
import api from "../../lib/apiClient";

export function Login() {
  const { navigateTo, login, showErrorPopup, showSuccessPopup } = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      if (data?.token) localStorage.setItem("token", data.token);
      const me = await api.get("/api/me");
      const userData = { ...me.data, token: data?.token };
      login(userData);
      showSuccessPopup("Logged in", "You are now signed in.");
    } catch (err) {
      const msg = err?.response?.data?.error || "Login failed";
      showErrorPopup("Login error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kfupm-green-light via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block space-y-6">
            <div className="space-y-4">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ width: 130, height: 130 }}
              >
                <img src="/dist/assets/KFUPM.png" alt="KFUPM logo" className="w-full h-full object-contain" />
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
              <div
                className="rounded-2xl overflow-hidden mx-auto mb-4"
                style={{ width: 120, height: 120 }}
              >
                <img src="/dist/assets/KFUPM.png" alt="KFUPM logo" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-kfupm-green">KFUPM Events Hub</h2>
            </div>

            <div>
              <h2 className="text-2xl text-gray-900 mb-2">Welcome back</h2>
              <p className="text-gray-600">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
              <Button type="submit" className="w-full bg-kfupm-green hover:bg-kfupm-green-dark" disabled={loading}>
                <LogIn size={20} className="mr-2" />
                {loading ? "Signing in..." : "Sign In"}
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
