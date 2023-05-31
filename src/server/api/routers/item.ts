/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const itemRouter = createTRPCRouter({
  getItems: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.item.findMany({
        where: {
          listId: input.id,
        },
      });
    }),
  createItem: protectedProcedure
    .input(z.object({ name: z.string().min(3), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const newItem = await ctx.prisma.item.create({
          data: {
            name: input.name,
            listId: input.id,
          },
        });

        return newItem;
      } catch (err) {
        return console.error(err);
      }
    }),
  deleteItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.item.delete({
          where: {
            id: input.id,
          },
        });
      } catch (err) {
        return console.error(err);
      }
    }),
});
