import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

export const getUser = async (email: string): Promise<User | null> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await axios.get(`${apiUrl}/users`);
    if (response.data && response.data.user) {
      return response.data.user;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
