import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GlobalContextProvider } from "@/context/GlobalContext";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";

export const metadata = {
  title: "Property-Pulse | Find the perfect rental",
  description: "Find your dream property dental",
  keywords: "rental, find rental, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalContextProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalContextProvider>
    </AuthProvider>
  );
};

export default MainLayout;
