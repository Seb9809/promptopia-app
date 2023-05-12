"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams(); // Get the search parameters from the URL

  const userName = searchParams.get("name"); // Get the value of the "name" parameter from the search parameters

  const [userPosts, setUserPosts] = useState([]); // State variable to hold the user's posts

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`); // Fetch the user's posts data using the user's ID

      const data = await response.json();

      setUserPosts(data); // Set the retrieved posts data in the state
    };

    if (params?.id) fetchPosts(); // Fetch posts data only if the user ID exists
  }, [params.id]);

  return (
    <Profile
      name={userName} // Pass the user's name to the Profile component
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.`} // Generate a description using the user's name
      data={userPosts} // Pass the user's posts data to the Profile component
    />
  );
};

export default UserProfile;
