import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await ctx.db.user.findUnique({ where: { email: ctx.session.user.email ?? '' } })
      if (!user) throw new Error("User not found")
      return user
    }),
  changeProfile: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        data: {
          name: input.name,
        },
        where: {
          email: ctx.session.user.email ?? ''
        }
      });
    })
});
