import { useState } from "react";

export default function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (object) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Signup failed");
      setIsLoading(false);
      return false;
    }

    localStorage.setItem("user", JSON.stringify(data));
    setIsLoading(false);
    return true;
  };

  return { signup, isLoading, error };
}
