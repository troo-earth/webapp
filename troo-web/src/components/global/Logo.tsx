import logo from "../../assets/svg/logo/logo.svg"
import logoHead from "../../assets/favicon.svg"

import React from 'react';
import type { LogoProps, LogoSize } from "@/types/global/types";


export const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const sizeClasses: Record<LogoSize, string> = {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-12',
  };

  return (
    <img 
      src={logo} 
      alt="Troo.earth" 
      className={`${sizeClasses[size]} w-auto object-contain`} 
    />
  );
};

export const LogoHead: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const sizeClasses: Record<LogoSize, string> = {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-12',
  };

  return (
    <img 
      src={logoHead} 
      alt="Troo.earth" 
      className={`${sizeClasses[size]} w-auto object-contain`} 
    />
  );
};
