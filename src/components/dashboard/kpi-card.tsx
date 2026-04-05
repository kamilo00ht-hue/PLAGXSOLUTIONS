import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export function KpiCard({ title, value }: { title: string; value: string }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="neon-glow">
        <p className="text-sm text-slate-400">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-cyan-100">{value}</p>
      </Card>
    </motion.div>
  );
}
