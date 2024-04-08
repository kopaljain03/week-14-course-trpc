import { z } from "zod";
import { publicProcedure, router } from "./trpc";
const todoIpType = z.object({
  tit: z.string(),
  desc: z.string(),
});
const appRouter = router({
  createTodo: publicProcedure.input(todoIpType).mutation(async (opts) => {
    const { input } = opts;
    const tit = input.tit;
    const desc = input.desc;
    return {
      id: 1,
      ...input,
    };
  }),
});

export type AppRouter = typeof appRouter;
