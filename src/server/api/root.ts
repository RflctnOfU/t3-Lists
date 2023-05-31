import { userRouter } from "@/server/api/routers/user";
import { listRouter } from "./routers/list";
import { itemRouter } from "./routers/item";
import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "./routers/example";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  list: listRouter,
  item: itemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
