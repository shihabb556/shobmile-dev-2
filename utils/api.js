
export const BASE_URL  = 'https://shobmile-dev-1-server.vercel.app/api/v1'

//for dev
// export const BASE_URL = "http://localhost:8000/api/v1";


// Centralized function to make API requests
export const apiRequest = async (endpoint, method = "GET", data = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  // Add the token to headers if available
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  // Only add the body if the method is not GET or HEAD
  if (method !== "GET" && method !== "HEAD" && data != null) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong!");
    }

    return result;
  } catch (error) {
    console.error("API call failed:", error.message);
    throw error; // You can handle the error in your UI (e.g., showing a notification)
  }
};
