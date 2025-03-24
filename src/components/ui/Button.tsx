
import React from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseClasses = "font-semibold rounded-2xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-signaledge-lime focus:ring-opacity-50 button-hover-effect";
  
  const variantClasses = {
    primary: "bg-signaledge-lime text-black hover:bg-signaledge-lime-hover shadow-sm hover:shadow-md",
    secondary: "border border-signaledge-lime text-signaledge-lime hover:text-white hover:bg-signaledge-lime-hover hover:border-transparent",
    ghost: "text-signaledge-lime hover:bg-signaledge-lime hover:bg-opacity-10"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
