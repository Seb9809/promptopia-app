"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter(); // Access the Next.js router object

  const searchParams = useSearchParams(); // Get the search parameters from the URL

  const promptId = searchParams.get("id"); // Get the value of the "id" parameter from the search parameters

  const [submitting, setSubmitting] = useState(false); // State variable to track the form submission status

  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  }); // State variable to hold the prompt data

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`); // Fetch the prompt details using the prompt ID
      const data = await response.json();

      setPost({
        prompt: data.prompt, // Set the prompt text in the state

        tag: data.tag, // Set the prompt tag in the state
      });
    };

    if (promptId) getPromptDetails(); // Fetch prompt details only if the prompt ID exists
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH", // Send a PATCH request to update the prompt
        body: JSON.stringify({
          prompt: post.prompt, // Include the updated prompt text in the request body
          tag: post.tag, // Include the updated prompt tag in the request body
        }),
      });

      if (response.ok) {
        router.push("/"); // Redirect to the home page after successful update
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit " // Set the form type to "Edit"
      post={post} // Pass the prompt data to the Form component
      setPost={setPost} // Pass the function to update the prompt data to the Form component
      submitting={submitting} // Pass the form submission status to the Form component
      handleSubmit={updatePrompt} // Pass the function to handle form submission to the Form component
    />
  );
};

export default EditPrompt;
