import React from "react";

interface ButtonProps {
  text: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "third" | "danger" | "disabled";
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ElementType;
}

const buttonStyles = {
  primary:
    "bg-primary font-bold hover:bg-white hover:border hover:border-primary text-white hover:text-primary text-[16px] w-[150px] h-[48px] rounded-[6px] flex items-center justify-center",
  secondary:
    "bg-[#fff]  hover:bg-white hover:border hover:border-primary hover:bg-primary hover:text-[#fff]  border border-[#E9EAEB] text-primary text-[12px] w-[60px] h-[40px] rounded-[6px] flex items-center justify-center",
  third:
    "bg-[#fff] font-bold hover:bg-white hover:border hover:border-primary hover:bg-primary hover:text-primary   border border-[#E9EAEB] text-primary hover:text-primary text-[16px] w-40 h-[40px] rounded-[6px] flex items-center justify-center",
  danger:
    "bg-red-500 hover:bg-red-600 font-bold text-white text-[16px] w-[150px] h-[48px] rounded-[6px] flex items-center justify-center",
  disabled:
    "bg-[#D6E0FF] font-bold text-gray-500 cursor-not-allowed text-[16px] w-[150px] h-[48px] rounded-[6px] flex items-center justify-center opacity-70",
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  style = {},
  icon: Icon = null,
}) => {
  const baseStyles = `${buttonStyles[variant]} ${
    disabled ? buttonStyles.disabled : ""
  } `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={(className)}
      style={style}
    >
      {text}
      {Icon && <Icon style={{ marginLeft: "8px" }} />}
    </button>
  );
};

export default Button;