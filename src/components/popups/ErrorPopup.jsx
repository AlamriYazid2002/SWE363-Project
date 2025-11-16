import { XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigation } from "../../contexts/NavigationContext";

export function ErrorPopup({ title, message }) {
  const { closePopup } = useNavigation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={closePopup}></div>
      
      {/* Error Dialog */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
        {/* Error Icon */}
        <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>
        
        {/* Error Title */}
        <h2 className="text-gray-900 mb-2">{title || "Error"}</h2>
        
        {/* Error Message */}
        <p className="text-gray-600 mb-6">
          {message || "Something went wrong. Please check your information and try again."}
        </p>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={closePopup}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button 
            onClick={closePopup}
            className="flex-1 bg-kfupm-green hover:bg-kfupm-green-dark text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}