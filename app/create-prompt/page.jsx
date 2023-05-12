"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter(); // Access the router object from Next.js

  const { data: session } = useSession(); // Retrieve the session data using NextAuth's useSession hook

  const [submitting, setSubmitting] = useState(false); // State variable to track whether the form is being submitted

  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  }); // State variables to hold the prompt data

  const createPrompt = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setSubmitting(true); // Set submitting state to true to indicate the form is being submitted

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      }); // Send a POST request to the API endpoint with the prompt data

      if (response.ok) {
        router.push("/"); // If the response is successful, redirect to the home page
      }
    } catch (error) {
      console.log(error); // Log any errors that occur during the request
    } finally {
      setSubmitting(false); // Set submitting state back to false after the request is complete
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    /> // Render the Form component with the necessary props
  );
};

export default CreatePrompt;
