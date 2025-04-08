import React from "react";

export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto p-4">
        <p className="text-center">
          All rights reserved &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
