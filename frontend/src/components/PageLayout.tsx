import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-grow pt-10 pb-0 px-4 ${className}`}>
        <div className="max-w-4xl mx-auto">
          {(title || subtitle) && (
            <div className="text-center mb-12 animate-fade-in">
              {title && (
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-xl text-accent-600 max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          <div className="animate-slide-in">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
