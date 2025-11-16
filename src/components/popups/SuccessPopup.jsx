import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigation } from "../../contexts/NavigationContext";

export function SuccessPopup({ title, message }) {
  const { closePopup } = useNavigation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={closePopup}></div>
      
      {/* Success Dialog */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 bg-kfupm-green-light rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10 text-kfupm-green" />
        </div>
        
        {/* Success Title */}
        <h2 className="text-gray-900 mb-2">{title || "Success!"}</h2>
        
        {/* Success Message */}
        <p className="text-gray-600 mb-6">
          {message || "Your action has been completed successfully. All changes have been saved."}
        </p>
        
        {/* Action Button */}
        <Button 
          onClick={closePopup}
          className="w-full bg-kfupm-green hover:bg-kfupm-green-dark text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}