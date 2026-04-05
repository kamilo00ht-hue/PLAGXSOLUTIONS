import { router } from '@/server/api/trpc';
import { authRouter } from './routers/auth';
import { billingRouter } from './routers/billing';
import { clientsRouter } from './routers/clients';
import { inspectionReportsRouter } from './routers/inspectionReports';
import { reportsRouter } from './routers/reports';
import { scheduleRouter } from './routers/schedule';
import { servicesRouter } from './routers/services';
import { techniciansRouter } from './routers/technicians';

export const appRouter = router({
  auth: authRouter,
  billing: billingRouter,
  clients: clientsRouter,
  services: servicesRouter,
  schedule: scheduleRouter,
  technicians: techniciansRouter,
  reports: reportsRouter,
  inspectionReports: inspectionReportsRouter
});

export type AppRouter = typeof appRouter;
