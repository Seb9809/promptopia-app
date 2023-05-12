import Prompt from "@models/prompts";
import { connectToDb } from "@utils/database";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDb(); // Establish a connection to the database

    // Create a new prompt instance with the provided data
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    // Save the new prompt to the database
    await newPrompt.save();

    // Return the newly created prompt as a JSON response with a 201 status code
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    // If an error occurs, return a 500 response
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
