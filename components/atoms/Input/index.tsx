import { InputProps } from "./type";

const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <div className="flex flex-col">
      {props.label && (
        <label htmlFor={props.id} className="text-sm mb-1">
          {props.label}
        </label>
      )}
      <div className="flex flex-col relative">
        {props.prefixIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {props.prefixIcon}
          </div>
        )}
        <input
          {...props}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              props.onEnter && props.onEnter();
            }
          }}
          className={`border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-60 text-sm ${
            props.className
          } ${props.prefixIcon ? "pl-10" : ""} ${
            props.suffixIcon ? "pr-10" : ""
          }}`}
        />
        {props.suffixIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {props.suffixIcon}
          </div>
        )}
      </div>
      {props.error && (
        <span className="text-red-500 text-sm">{props.error}</span>
      )}
    </div>
  );
};

export default Input;
