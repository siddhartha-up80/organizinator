import Person from "@/models/person";
import { connectToDB } from "@/db/database";

export const GET = async (request: any) => {

  try {
    await connectToDB();
   
    const people = await Person.find({});

    // console.log(JSON.stringify(people));
    
    return new Response(JSON.stringify(people), { status: 201 });
  } catch (error) {
    return new Response("Failed to add Person", { status: 500 });
  }
};
