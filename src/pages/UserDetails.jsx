import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const UserDetail = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data, loading, error: fetchError } = useFetch("admin/getUsers/user");

  useEffect(() => {
    // Check if the data is already available
    if (data && data.length) {
      const userData = data.find((rest) => rest.id.toString() === id);

      console.log(userData, "data user detail");

      if (userData) {
        setUser(userData);
        setIsLoading(false);
      } else {
        setError("User not found");
        setIsLoading(false);
      }
    } else if (!loading && fetchError) {
      // If there's an error from useFetch
      setError(fetchError);
      setIsLoading(false);
    }
  }, [data, id, loading, fetchError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-4 capitalize">{user.name || "No Name"}</h2>
      <p>
        <strong>Email:</strong> {user.email || "No Email"}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone || "No Phone"}
      </p>
      <p>
        <strong>Address:</strong> {user.address || "No Address"}
      </p>
      {/* Add more user fields as needed */}
    </div>
  );
};

export default UserDetail;
