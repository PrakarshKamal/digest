import { prisma } from "@/lib/prisma";

export async function upsertUser(clerkUserId: string) {
  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId,
    },
  });

  if (existingUser) {
    return prisma.user.update({
      where: {
        clerkUserId,
      },
      data: {
        updatedAt: new Date(),
      },
    });
  }

  return prisma.user.create({
    data: {
      clerkUserId,
    },
  });
}
