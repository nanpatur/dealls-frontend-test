export interface InputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  id?: string;
  label?: string;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  onEnter?: () => void;
}
