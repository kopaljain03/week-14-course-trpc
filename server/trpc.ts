import { initTRPC } from "@trpc/server";
const t = initTRPC
  .context<{
    username?: string;
  }>()
  .create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
