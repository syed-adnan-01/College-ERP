import * as React from "react";

interface HighlighterUnderlineProps {
  children: React.ReactNode;
  className?: string;
  color?: string; // default amber #E8B93F
}

export function HighlighterUnderline({
  children,
  className = "",
  color = "#E8B93F",
}: HighlighterUnderlineProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute left-0 -bottom-1.5 w-full h-3 -z-0 pointer-events-none overflow-visible"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Organic hand-drawn marker stroke */}
        <path
          d="M1 7.5C18 3.5 45 9.5 99 4C82 7.8 35 11.2 3 9.8"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.45"
        />
      </svg>
    </span>
  );
}
