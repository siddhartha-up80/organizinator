import { connectToDB } from "@/db/database";
import Person from "@/models/person";

export const POST = async (request: any) => {
  const { email } = await request.json();

  try {
    // Connect to the database
    await connectToDB();

    // Find the person based on the provided personid
    const existingPerson = await await Person.findOneAndDelete({ email });

    console.log(existingPerson);

    if (!existingPerson) {
      // If the person with the provided personid doesn't exist, return an error response
      return new Response("Person not found", { status: 404 });
    }

    // Delete the person from the database
    // await existingPerson.remove();

    return new Response("Person deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete Person", { status: 500 });
  }
};
