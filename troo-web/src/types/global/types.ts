export type LogoSize = 'small' | 'medium' | 'large';

export interface LogoProps {
  size?: LogoSize;
}

export interface User {
  user_id: string;
  fullname: string;
  email: string;
}