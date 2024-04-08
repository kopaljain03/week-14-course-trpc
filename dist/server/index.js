"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const trpc_1 = require("./trpc");
const standalone_1 = require("@trpc/server/adapters/standalone");
const todoIpType = zod_1.z.object({
    tit: zod_1.z.string(),
    desc: zod_1.z.string(),
});
const appRouter = (0, trpc_1.router)({
    createTodo: trpc_1.publicProcedure.input(todoIpType).mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const { input } = opts;
        const user = opts.ctx.username;
        const tit = input.tit;
        const desc = input.desc;
        if (user)
            return Object.assign({ id: 1 }, input);
        else
            return {
                id: undefined,
            };
    })),
    signup: trpc_1.publicProcedure
        .input(zod_1.z.object({
        username: zod_1.z.string(),
        password: zod_1.z.string(),
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("signup called");
        const { input } = opts;
        //db stuff
        return {
            message: "signed up succesfully",
            token: "123",
        };
    })),
});
const server = (0, standalone_1.createHTTPServer)({
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
