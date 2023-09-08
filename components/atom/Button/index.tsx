interface ButtonProps {
  type: "primary" | "secondary" | "netral" | "danger";
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, text, onClick }) => {
  return (
    <button
      className={`bg-${type} text-white font-bold py-2 px-4 rounded`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
