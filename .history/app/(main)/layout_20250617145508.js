import React from "react";
import ChatBot from "@/components/chatbot";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="container mx-auto my-32">
        {children}
      </div>

      {/* Floating chatbot below */}
      <ChatBot />
    </>
  );
};

export default MainLayout;