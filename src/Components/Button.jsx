import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`cursor-pointer transition-all px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] p-2  font-bold ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
