import React from "react";
import "@/assets/styles/globals.css";

export const metadata = {
  title: "Property-Pulse | Find the perfect rental",
  description: "Find your dream property dental",
  keywords: "rental, find rental, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
