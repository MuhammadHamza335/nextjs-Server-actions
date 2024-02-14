import { revalidatePath } from "next/cache";
import prisma from "./db";

export async function getData() {
  let isssues: any = await prisma.todo.findMany({
    select: {
      input: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return isssues;
}
export async function updateIssue(formData: FormData) {
  "use server";
  const description = formData.get("description_edited") as string;
  const idToUpdate = formData.get("issue_edited_id") as string;
  await prisma.todo.update({
    where: {
      id: idToUpdate,
    },
    data: {
      input: description,
    },
  });
  revalidatePath("/");
}
export async function CreateIssue(formData: FormData) {
  "use server";
  const description = formData.get("description") as string;

  await prisma.todo.create({
    data: {
      input: description,
    },
  });

  revalidatePath("/");
}

export async function deleteIssue(formData: FormData) {
  "use server";

  const idToUpdate = formData.get("issue_edited_id") as string;
  await prisma.todo.delete({
    where: {
      id: idToUpdate,
    },
  });
  revalidatePath("/");
}
