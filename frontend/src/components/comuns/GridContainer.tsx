import React from "react";

interface GridContainerProps {
  children: React.ReactNode;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  animate?: boolean;
}

const GridContainer: React.FC<GridContainerProps> = ({
  children,
  cols = { default: 1, md: 2, lg: 3 },
  gap = 8,
  className = "",
  maxWidth = '7xl',
  animate = true,
}) => {
  const gridClasses = [
    `grid`,
    `grid-cols-${cols.default || 1}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    `gap-${gap}`,
    `max-w-${maxWidth}`,
    `mx-auto`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={gridClasses}>
      {React.Children.map(children, (child, index) => (
        <div
          className={animate ? "animate-fade-in" : ""}
          style={animate ? { animationDelay: `${index * 0.1}s` } : {}}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default GridContainer;