import { cn } from '@/lib/utils';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-xl border border-cyan-300/30 bg-[#0f2341] px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-300',
        props.className
      )}
    />
  );
}
