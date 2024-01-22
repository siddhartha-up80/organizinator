import { Schema, model, models } from "mongoose";

const PersonSchema = new Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  hobbies: {
    type: String,
  },
});

const Person = models.Person || model("Person", PersonSchema);

export default Person;
