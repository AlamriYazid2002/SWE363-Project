import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { UserPlus, Mail, Lock, User, IdCard, ArrowLeft } from "lucide-react";
import { Card } from "../ui/card";
import { useNavigation } from "../../contexts/NavigationContext";
import api from "../../lib/apiClient";

export function SignUp() {
  const { navigateTo, showSuccessPopup, showErrorPopup, login } = useNavigation();

  const [form, setForm] = useState({
    fullname: "",
    kfupmId: "",
    email: "",
    role: "student",
    department: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const missing = [
      { key: "fullname", label: "Full Name" },
      { key: "kfupmId", label: "KFUPM ID" },
      { key: "email", label: "Email" },
      { key: "role", label: "Account Type" },
      { key: "password", label: "Password" },
      { key: "confirmPassword", label: "Confirm Password" },
    ].filter((f) => !form[f.key]?.toString().trim());

    if (missing.length > 0) {
      showErrorPopup("Missing required fields", `Please fill: ${missing.map((m) => m.label).join(", ")}.`);
      return;
    }

    if (!form.email.toLowerCase().includes("@kfupm.edu.sa")) {
      showErrorPopup("Invalid email", "Use your official KFUPM email address.");
      return;
    }

    if (form.password.length < 6) {
      showErrorPopup("Weak password", "Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      showErrorPopup("Passwords do not match", "Make sure both passwords are the same.");
      return;
    }

    if (!form.terms) {
      showErrorPopup("Agree to terms", "You must accept the Terms and Privacy Policy to continue.");
      return;
    }

    const role = ["student", "organizer"].includes(form.role) ? form.role : "student";

    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/register", {
        name: form.fullname,
        kfupmId: form.kfupmId,
        email: form.email,
        password: form.password,
        role,
      });
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      showSuccessPopup("Account Created!", "Your account has been created successfully.");
      const me = await api.get("/api/me");
      login({ ...me.data, token: data?.token });
    } catch (err) {
      const msg = err?.response?.data?.error || "Signup failed";
      showErrorPopup("Signup error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kfupm-green-light via-white to-gray-50 py-12 px-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="rounded-md overflow-hidden mx-auto mb-4"
            style={{ width: 130, height: 130 }}
          >
            <img
              src="/dist/assets/KFUPM.png"
              alt="KFUPM logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl text-kfupm-green mb-2">Join KFUPM Events Hub</h1>
          <p className="text-gray-600">Create your account to start exploring campus events</p>
        </div>

        {/* Sign Up Form */}
        <Card className="p-8 shadow-xl">
          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex-1 h-2 bg-kfupm-green rounded-full"></div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
            </div>

            <div>
              <h2 className="text-xl text-gray-900 mb-1">Personal Information</h2>
              <p className="text-sm text-gray-600">Please provide your details to create an account</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="fullname"
                    type="text"
                    placeholder="Ahmed Mohammed Al-Ali"
                    className="pl-10"
                    value={form.fullname}
                    onChange={handleInput("fullname")}
                  />
                </div>
              </div>

              {/* KFUPM ID */}
              <div className="space-y-2">
                <Label htmlFor="kfupm-id">KFUPM ID *</Label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="kfupm-id"
                    type="text"
                    placeholder="202012345"
                    className="pl-10"
                    value={form.kfupmId}
                    onChange={handleInput("kfupmId")}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="signup-email">KFUPM Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="s202012345@kfupm.edu.sa"
                    className="pl-10"
                    value={form.email}
                    onChange={handleInput("email")}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Use your official KFUPM email address
                </p>
              </div>

              {/* Role Selection */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="role">Account Type *</Label>
                <Select value={form.role} onValueChange={(val) => setForm((prev) => ({ ...prev, role: val }))}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="organizer">Club Organizer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Department/College */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="department">Department/College *</Label>
                <Select value={form.department} onValueChange={(val) => setForm((prev) => ({ ...prev, department: val }))}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coe">College of Engineering</SelectItem>
                    <SelectItem value="ccs">College of Computing Sciences</SelectItem>
                    <SelectItem value="cba">College of Business Administration</SelectItem>
                    <SelectItem value="cse">College of Science & Engineering</SelectItem>
                    <SelectItem value="ced">College of Environmental Design</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a strong password"
                    className="pl-10"
                    value={form.password}
                    onChange={handleInput("password")}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  At least 8 characters with numbers and symbols
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Re-enter your password"
                    className="pl-10"
                    value={form.confirmPassword}
                    onChange={handleInput("confirmPassword")}
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Checkbox
                id="terms"
                className="mt-1"
                checked={form.terms}
                onCheckedChange={(val) => setForm((prev) => ({ ...prev, terms: Boolean(val) }))}
              />
              <div>
                <Label htmlFor="terms" className="text-sm cursor-pointer">
                  I agree to the{" "}
                  <button className="text-kfupm-green hover:text-kfupm-green-dark underline">
                    Terms and Conditions
                  </button>{" "}
                  and{" "}
                  <button className="text-kfupm-green hover:text-kfupm-green-dark underline">
                    Privacy Policy
                  </button>
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  By creating an account, you agree to receive event notifications and updates
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <Button type="submit" className="w-full bg-kfupm-green hover:bg-kfupm-green-dark" disabled={loading}>
                <UserPlus size={20} className="mr-2" />
                {loading ? "Creating..." : "Create Account"}
              </Button>

            </div>

            {/* Login Link */}
            <div className="text-center pt-4 border-t">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button 
                  type="button"
                  onClick={() => navigateTo("login")}
                  className="text-kfupm-green hover:text-kfupm-green-dark inline-flex items-center gap-1"
                >
                  <ArrowLeft size={16} />
                  Sign in instead
                </button>
              </p>
            </div>
          </form>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Need help?{" "}
            <button className="text-kfupm-green hover:text-kfupm-green-dark">
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
