"use client";
import React from "react";
import "./ai-button.css";

export interface AiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const AiButton: React.FC<AiButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  icon,
  ...props
}) => {
  return (
    <button className={`ai-btn ai-btn-${variant} ${className}`} {...props}>
      <span className="ai-btn-content">
        {children}
        {icon && <span className="ai-btn-icon">{icon}</span>}
      </span>
    </button>
  );
};

export default AiButton;
