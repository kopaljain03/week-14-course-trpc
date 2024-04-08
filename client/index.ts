import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server/index";
//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.

var locvar = "";
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
      async headers() {
        return {
          authorization: locvar,
        };
      },
    }),
  ],
});

async function main() {
  let res1 = await trpc.createTodo.mutate({
    tit: "hadfhfsd",
    desc: "heyoooooo",
  });
  console.log(JSON.stringify(res1));
  let res2 = await trpc.signup.mutate({
    username: "hadfhfsd",
    password: "heyoooooo",
  });
  locvar = res2.token;
  console.log(JSON.stringify(res2));
}
main();
