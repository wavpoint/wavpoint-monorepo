import React from "react";
import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
