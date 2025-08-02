import React from 'react';
import { cn } from '@/lib/utils';

interface TouchOptimizedProps {
  children: React.ReactNode;
  className?: string;
  onTap?: () => void;
  disabled?: boolean;
}

export const TouchOptimized: React.FC<TouchOptimizedProps> = ({
  children,
  className,
  onTap,
  disabled = false
}) => {
  return (
    <div
      className={cn(
        "touch-manipulation select-none",
        "min-h-[44px] min-w-[44px] flex items-center justify-center",
        "active:scale-95 transition-transform duration-150",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      onClick={disabled ? undefined : onTap}
      role={onTap ? "button" : undefined}
      tabIndex={onTap && !disabled ? 0 : undefined}
      onKeyDown={(e) => {
        if (onTap && !disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onTap();
        }
      }}
    >
      {children}
    </div>
  );
};

interface SwipeableProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
}

export const Swipeable: React.FC<SwipeableProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  className
}) => {
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
  };

  return (
    <div
      className={cn("touch-pan-y", className)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
};