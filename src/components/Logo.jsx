import React from 'react';
import { useSelector } from 'react-redux';

export default function Logo({ className = "h-8 w-auto", ...props }) {
  const customLogo = useSelector((state) => state.ui.customLogo);
  /*deneme */
  if (customLogo) {
    return (
      <img
        src={customLogo}
        alt="Logo"
        className={className}
        style={{ objectFit: 'contain' }}
        {...props}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 44 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="cx-logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* Connected CX Path */}
      <path
        d="M 38 26 L 22 6 A 10 10 0 0 0 22 26 L 38 6"
        stroke="url(#cx-logo-gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Joint Nodes */}
      <circle cx="22" cy="6" r="2.5" fill="white" stroke="url(#cx-logo-gradient)" strokeWidth="2" />
      <circle cx="22" cy="26" r="2.5" fill="white" stroke="url(#cx-logo-gradient)" strokeWidth="2" />

      {/* Outer Nodes */}
      <circle cx="38" cy="6" r="2.5" fill="white" stroke="url(#cx-logo-gradient)" strokeWidth="2" />
      <circle cx="38" cy="26" r="2.5" fill="white" stroke="url(#cx-logo-gradient)" strokeWidth="2" />
    </svg>
  );
}
