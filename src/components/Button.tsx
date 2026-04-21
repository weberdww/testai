import { AnchorHTMLAttributes, PropsWithChildren } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary';

type ButtonProps = PropsWithChildren<{
  variant?: Variant;
  className?: string;
}> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const classes: Record<Variant, string> = {
  primary:
    'bg-[#051A24] text-white shadow-[0_1px_2px_0_rgba(5,26,36,0.1),0_4px_4px_0_rgba(5,26,36,0.09),0_9px_6px_0_rgba(5,26,36,0.05),0_17px_7px_0_rgba(5,26,36,0.01),0_26px_7px_0_rgba(5,26,36,0),inset_0_2px_8px_0_rgba(255,255,255,0.5)]',
  secondary: 'bg-white text-[#051A24] shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.08)]',
  tertiary: 'bg-white text-[#051A24] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.08)]',
};

export default function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <a
      {...props}
      className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium transition-opacity hover:opacity-90 ${classes[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
