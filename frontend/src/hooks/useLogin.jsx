import { useState } from "react";

export default function useLogin(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (object) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Login failed");
        return null;
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      return data; // Return user data on success
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
