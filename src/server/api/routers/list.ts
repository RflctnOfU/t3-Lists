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

export const listRouter = createTRPCRouter({
  getAllLists: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.list.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        id: true,
        name: true,
        userId: true,
        user: true,
        items: true,
      },
    });
  }),
  getSingleList: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.list.findUnique({
        where: {
          id: input.id,
        },
        select: {
          name: true,
          items: true,
        },
      });
    }),
  createList: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const newList = await ctx.prisma.list.create({
          data: {
            name: input.name,
            userId: ctx.session.user.id,
          },
        });
        return newList;
      } catch (err) {
        console.error(err);
      }
    }),
  deleteList: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.list.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
