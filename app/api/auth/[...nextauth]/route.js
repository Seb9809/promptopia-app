import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDb } from "@utils/database";

// Define the authentication handler
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // Store the user id from MongoDB to the session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credential }) {
      try {
        // Establish a connection to the database
        await connectToDb();

        // Check if the user already exists in the database
        const userExists = await User.findOne({ email: profile.email });

        // If the user does not exist, create a new document and save the user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true; // Authentication successful
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false; // Authentication failed
      }
    },
  },
});

// Export the authentication handler
export { handler as GET, handler as POST };
