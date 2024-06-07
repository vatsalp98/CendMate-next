import { createTRPCRouter, privateProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUserDb: privateProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        uid: ctx.user.id,
      },
    });

    return user;
  }),
});
