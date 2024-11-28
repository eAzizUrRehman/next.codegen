import { cn } from '@/lib/utils';

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex w-full flex-col', className)}>{children}</div>
  );
};

export default LabelInputContainer;
