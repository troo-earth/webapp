interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const InputField: React.FC<InputProps> = ({ label, ...props }) => (
  <div className="w-full flex flex-col items-start group">
    <label className="text-[10px] font-black uppercase tracking-widest text-[#005C5C] text-left mb-1">
      {label}
    </label>
    
    <input 
      {...props}
      className="w-full py-3 bg-transparent border-b border-gray-200 
      text-gray-800 placeholder:text-gray-300 text-sm font-medium
      focus:outline-none focus:border-primary transition-colors duration-300"
    />
  </div>
);