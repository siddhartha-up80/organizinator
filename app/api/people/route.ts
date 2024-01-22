import Person from "@/models/person";
import { connectToDB } from "@/db/database";

export const POST = async (request: any) => {
  const { name, phone, email, hobbies } = await request.json();

  try {
    await connectToDB();
    const person = new Person({ name, phone, email, hobbies });

    await person.save();
    return new Response(JSON.stringify(person), { status: 201 });
  } catch (error) {
    return new Response("Failed to add Person", { status: 500 });
  }
};

export const PUT = async (request: any) => {
  const { name, phone, email, hobbies } = await request.json();

  try {
    await connectToDB();
    const existingPerson = await Person.findOne({ email });

    if (!existingPerson) {
      // If the person with the provided email doesn't exist, return an error response
      return new Response("Person not found", { status: 404 });
    }

    // Update the person's details
    existingPerson.name = name;
    existingPerson.phone = phone;
    existingPerson.email = email;
    existingPerson.hobbies = hobbies;

    // Save the changes to the database
    await existingPerson.save();

    return new Response(JSON.stringify(existingPerson), { status: 200 });
  } catch (error) {
    return new Response("Failed to Edit Person", { status: 500 });
  }
};


