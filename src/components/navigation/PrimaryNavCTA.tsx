import { buttonClassName } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface PrimaryNavCTAProps {
  onNavigate?: () => void;
  className?: string;
}

export function PrimaryNavCTA({ onNavigate, className }: PrimaryNavCTAProps) {
  return (
    <a
      href="/#contact"
      onClick={onNavigate}
      className={cn(buttonClassName({ size: 'sm' }), className)}
    >
      Contact
    </a>
  );
}
