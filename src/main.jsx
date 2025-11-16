import { createRoot } from "react-dom/client";
import App from "./App.jsx";  // ← change .tsx → .jsx
import "./index.css";

// Remove the TypeScript "!" operator
createRoot(document.getElementById("root")).render(<App />);