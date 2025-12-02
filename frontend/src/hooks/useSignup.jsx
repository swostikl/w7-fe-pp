import { useState } from "react";

export default function useSignup(url) {
  const [error, setError] = useState(null);

  const signup = async (user) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Invalid response from server" }));
        throw new Error(error.error || "Signup failed");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  return { signup, error };
}
