import { router } from '@/server/api/trpc';
import { clientsRouter } from './routers/clients';
import { reportsRouter } from './routers/reports';
import { scheduleRouter } from './routers/schedule';
import { servicesRouter } from './routers/services';
import { techniciansRouter } from './routers/technicians';

export const appRouter = router({
  clients: clientsRouter,
  services: servicesRouter,
  schedule: scheduleRouter,
  technicians: techniciansRouter,
  reports: reportsRouter
});

export type AppRouter = typeof appRouter;
