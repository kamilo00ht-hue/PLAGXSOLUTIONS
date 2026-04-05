import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SettingsPanel() {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-cyan-100">Configuración base</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <Input placeholder="Nombre de empresa" defaultValue="PLAGXSOLUTIONS" />
        <Input placeholder="Zona operativa principal" defaultValue="Bogotá" />
        <Input placeholder="URL logo" defaultValue="/img/logo.png" />
        <Input placeholder="Preferencia visual" defaultValue="Dark Premium" />
      </div>
      <div className="mt-4 flex justify-end"><Button>Guardar cambios</Button></div>
    </Card>
  );
}
