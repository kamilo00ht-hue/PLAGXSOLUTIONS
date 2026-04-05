import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'violet' };

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const styles: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-cyan-400/20 border-cyan-300 text-cyan-100 hover:bg-cyan-400/30',
    ghost: 'bg-transparent border-cyan-400/25 text-slate-200 hover:bg-cyan-400/10',
    violet: 'bg-violet-500/20 border-violet-300 text-violet-100 hover:bg-violet-500/30'
  };

  return <button className={cn('rounded-xl border px-4 py-2 text-sm font-semibold transition-all neon-glow', styles[variant], className)} {...props} />;
}
