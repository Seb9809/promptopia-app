import { Schema, model, models } from "mongoose";

// Define the schema for the Prompt collection
const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User collection
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"], // Validation rule for required prompt
  },
  tag: {
    type: String,
    required: [true, "Tag is required"], // Validation rule for required tag
  },
});

// Check if the Prompt model already exists, otherwise create a new model
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
