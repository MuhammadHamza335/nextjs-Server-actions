import Image from "next/image";
import prisma from "./db";
import { revalidatePath } from "next/cache";
let isssues: any;
async function getData() {
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
export default async function Home() {
  let data = await getData();

  async function updateIssue(formData: FormData) {
    "use server";
    const description = formData.get("description_edited") as string;
    const idToUpdate = formData.get("issue_edited") as string;
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
  async function CreateIssue(formData: FormData) {
    "use server";
    const description = formData.get("description") as string;

    await prisma.todo.create({
      data: {
        input: description,
      },
    });

    revalidatePath("/");
  }

  async function deleteIssue(formData: FormData) {
    "use server";

    const idToUpdate = formData.get("issue_edited") as string;
    await prisma.todo.delete({
      where: {
        id: idToUpdate,
      },
    });
    revalidatePath("/");
  }
  return (
    <div className="flex flex-col">
      <div className=" flex items-center justify-center">
        <div className="border rounded-lg shadow-xl p-10 w-[30vw]">
          <form className="flex flex-col" action={CreateIssue}>
            <input
              type="text"
              name="description"
              className="border p-1 border-gray-800"
            />
            <button
              className="bg-green-500 rounded-lg mt-2 text-white py-2"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col flex items-center justify-center mt-11">
        <ol>
          {data?.map((issue: any) => {
            return (
              <form key={issue?.id} action={updateIssue}>
                <input
                  defaultValue={issue?.input}
                  type="text"
                  name="description_edited"
                  className="border p-1 border-gray-300"
                />
                <input value={issue?.id} type="hidden" name="issue_edited" />
                <button
                  className="ml-6 text-white bg-green-500 rounded-lg p-2"
                  type="submit"
                >
                  edit
                </button>
                <button
                  className="ml-6 bg-red-600 rounded-lg mt-2 text-white p-2"
                  formAction={deleteIssue}
                >
                  Delete
                </button>
              </form>
              // <li key={issue.id} className="text-bold">
              //   {issue.input}
              // </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
