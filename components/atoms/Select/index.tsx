import { SelectProps } from "./type";

const Select: React.FC<SelectProps> = ({ ...props }) => {
  return (
    <div className="flex flex-col">
      {props.label && (
        <label htmlFor={props.id} className="text-sm mb-1">
          {props.label}
        </label>
      )}
      <select
        {...props}
        className={`border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-60 text-sm ${props.className}`}
      >
        <option value="" disabled selected>
          {props.placeholder}
        </option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {props.error && (
        <span className="text-red-500 text-sm">{props.error}</span>
      )}
    </div>
  );
};

export default Select;
