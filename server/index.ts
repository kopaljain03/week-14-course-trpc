import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const todoIpType = z.object({
  tit: z.string(),
  desc: z.string(),
});
const appRouter = router({
  createTodo: publicProcedure.input(todoIpType).mutation(async (opts) => {
    const { input } = opts;
    const user = opts.ctx.username;
    const tit = input.tit;
    const desc = input.desc;
    if (user)
      return {
        id: 1,
        ...input,
      };
    else
      return {
        id: undefined,
      };
  }),
  signup: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      console.log("signup called");
      const { input } = opts;
      //db stuff
      return {
        message: "signed up succesfully",
        token: "123",
      };
    }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    let authHeader = opts.req.headers["authorization"];
    console.log(authHeader);
    if (authHeader === "123")
      return {
        username: "123",
      };
    else
      return {
        username: undefined,
      };
  },
});
server.listen(3000);
