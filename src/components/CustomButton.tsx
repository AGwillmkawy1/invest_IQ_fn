interface CustomButtonProps {
  onPress: () => void;
  text: string;
  variant?: "primary" | "secondary";
}
export default function CustomButton({
  onPress,
  text,
  variant = "primary",
}: CustomButtonProps) {
  return (
    <button
      className={`${
        variant === "primary" ? "bg-mainGreen" : "border border-mainGreen"
      } text-white px-10 py-2 rounded-xl`}
      onClick={onPress}
    >
      {text}
    </button>
  );
}
