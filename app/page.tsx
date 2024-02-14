import { CreateIssue, deleteIssue, getData, updateIssue } from "./actions";
import CustomButton from "./components/CustomButton";

export default async function Home() {
  let data = await getData();

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
            <CustomButton title="Submit" />
            {/* <button
              className="bg-green-500 rounded-lg mt-2 text-white py-2"
              type="submit"
            >
              Submit
            </button> */}
          </form>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-11">
        <ol>
          {data?.map((issue: any) => {
            return (
              <div key={issue?.id} className="flex flex-row mt-3">
                <form action={updateIssue}>
                  <input
                    defaultValue={issue?.input}
                    type="text"
                    name="description_edited"
                    className="border p-1 border-gray-300"
                  />
                  <input
                    value={issue?.id}
                    type="hidden"
                    name="issue_edited_id"
                  />
                  <CustomButton title="Edit" />
                  {/* <button
                  className="ml-6 text-white bg-green-500 rounded-lg p-2"
                  type="submit"
                >
                  edit
                </button> */}
                </form>

                <form action={deleteIssue}>
                  <input
                    value={issue?.id}
                    type="hidden"
                    name="issue_edited_id"
                  />
                  <CustomButton title="Delete" />
                  {/* <button
                  className="ml-6 bg-red-600 rounded-lg mt-2 text-white p-2"
                  formAction={deleteIssue}
                >
                  Delete
                </button> */}
                </form>
              </div>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
