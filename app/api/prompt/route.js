import Prompt from "@models/prompts";
import { connectToDb } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDb(); // Establish a connection to the database

    // Find all prompts and populate the "creator" field
    const prompts = await Prompt.find({}).populate("creator");

    // Return the prompts as a JSON response with a 200 status code
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    // If an error occurs, return a 500 response
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
