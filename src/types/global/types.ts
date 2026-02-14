export type LogoSize = 'small' | 'medium' | 'large';

export interface LogoProps {
  size?: LogoSize;
}

export interface User {
  user_id: string;
  fullname: string;
  email: string;
  org_id: string | null;
  role: string;
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

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isSaveDisabled?: boolean;
  onSave?: () => void;       
  saveLabel?: string;        
  isLoading?: boolean;      
}

export interface InviteData {
  data: {
    email: string;
    role: string;
    org_id: string;
    org_name: string;
    org_code: string;
    valid: boolean;
  };
}
