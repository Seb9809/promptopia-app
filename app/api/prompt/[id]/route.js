import Prompt from "@models/prompts";
import { connectToDb } from "@utils/database";

// GET
export const GET = async (request, { params }) => {
  try {
    await connectToDb(); // Establish a connection to the database

    // Find the prompt by its ID and populate the "creator" field
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      // If the prompt is not found, return a 404 response
      return new Response("Prompt not found", { status: 404 });
    }

    // Return the prompt as a JSON response with a 200 status code
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    // If an error occurs, return a 500 response
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

// PATCH
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDb();

    // Find the existing prompt by its ID
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      // If the prompt is not found, return a 404 response
      return new Response("Prompt not found", { status: 404 });
    }

    // Update the prompt and tag fields with the new values
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    // Save the updated prompt
    await existingPrompt.save();

    // Return the updated prompt as a JSON response with a 200 status code
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    // If an error occurs, return a 500 response
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDb();

    // Find the prompt by its ID and remove it from the database
    await Prompt.findByIdAndRemove(params.id);

    // Return a success message as a response with a 200 status code
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    // If an error occurs, return a 500 response
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
