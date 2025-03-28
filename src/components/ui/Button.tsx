
import React from 'react';
import { cn } from "@/lib/utils";
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  loading = false,
  disabled,
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
        loading && "opacity-80 pointer-events-none",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
