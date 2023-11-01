import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "aos/dist/aos.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./App.css";
import AuthProvider from "./Providers/AuthProvider";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <AuthProvider>
        <HelmetProvider>
          <div className="  mx-auto w-full">
            <App />
          </div>
        </HelmetProvider>
      </AuthProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
