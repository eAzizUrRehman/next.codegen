interface GradientDividerProps {
  className?: string;
}

const GradientDivider: React.FC<GradientDividerProps> = ({ className }) => {
  return (
    <div
      className={`h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700 ${className}`}
    />
  );
};

export default GradientDivider;
