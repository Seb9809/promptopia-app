"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter(); // Access the router object from Next.js

  const { data: session } = useSession(); // Retrieve the session data using NextAuth's useSession hook

  const [myPosts, setMyPosts] = useState([]); // State variable to hold the posts data

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`); // Fetch posts data for the current user

      const data = await response.json();

      setMyPosts(data); // Set the retrieved posts data in the state
    };

    if (session?.user.id) fetchPosts(); // Fetch posts data only if the user ID exists in the session
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`); // Redirect to the update prompt page with the post ID as a query parameter
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this form"); // Display a confirmation dialog to confirm deletion

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE", // Send a DELETE request to the API endpoint to delete the post
        });

        const filteredPosts = myPosts.filter((p) => p._id !== post._id); // Remove the deleted post from the state

        setMyPosts(filteredPosts); // Update the state with the filtered posts
      } catch (error) {
        console.log(error); // Log any errors that occur during the request
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination."
      data={myPosts} // Pass the posts data to the Profile component
      handleEdit={handleEdit} // Pass the handleEdit function to the Profile component
      handleDelete={handleDelete} // Pass the handleDelete function to the Profile component
    />
  );
};

export default MyProfile;
