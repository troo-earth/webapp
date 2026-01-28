export type LogoSize = 'small' | 'medium' | 'large';

export interface LogoProps {
  size?: LogoSize;
}

export interface User {
  user_id: string;
  fullname: string;
  email: string;
  org_id?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  icon?: string; 
}

export interface SearchSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  className?: string;
}
