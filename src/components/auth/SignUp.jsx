import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { UserPlus, Mail, Lock, User, IdCard, ArrowLeft } from "lucide-react";
import { Card } from "../ui/card";
import { useNavigation } from "../../contexts/NavigationContext";

export function SignUp() {
  const { navigateTo, showSuccessPopup } = useNavigation();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Show success message
    showSuccessPopup(
      "Account Created!",
      "Your account has been created successfully. Please sign in to continue."
    );
    // Navigate to login after a short delay
    setTimeout(() => {
      navigateTo("login");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kfupm-green-light via-white to-gray-50 py-12 px-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-kfupm-green rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-white text-2xl">K</span>
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
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Use your official KFUPM email address
                </p>
              </div>

              {/* Role Selection */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="role">Account Type *</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="organizer">Club Organizer</SelectItem>
                    <SelectItem value="faculty">Faculty Member</SelectItem>
                    <SelectItem value="staff">Staff Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Department/College */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="department">Department/College *</Label>
                <Select>
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
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Checkbox id="terms" className="mt-1" />
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
              <Button type="submit" className="w-full bg-kfupm-green hover:bg-kfupm-green-dark">
                <UserPlus size={20} className="mr-2" />
                Create Account
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or sign up with</span>
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
                Sign up with KFUPM Account
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