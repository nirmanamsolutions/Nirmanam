"use client";
import React from "react";
import "./ai-button.css";

export const AiButton = ({
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
