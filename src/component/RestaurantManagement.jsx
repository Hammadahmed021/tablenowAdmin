import React, { useState, useEffect } from "react";
import RestaurantTable from "./RestaurantTable";
import useFetch from "../hooks/useFetch";

const RestaurantManagement = () => {
  const [activeTab, setActiveTab] = useState("approved");
  const [restaurantData, setRestaurantData] = useState([]);
  const { data, loading: isLoading, refetch, error } = useFetch("admin/getUsers/hotel");

  useEffect(() => {
    if (data) {
      setRestaurantData(data); // Set the fetched data into state
    }
  }, [data]);

  const handleActionCompleted = () => {
    refetch(); // Refetch data after any action (approve, block/unblock)
  };

  const filteredData = (status) => {
    return restaurantData.filter((restaurant) => restaurant.status === status);
  };

  return (
    <div className="w-full">
      <div className="flex justify-around border-b">
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "approved" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("approved")}
        >
          Approved
        </button>
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "unapproved" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("unapproved")}
        >
          Unapproved
        </button>
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "blocked" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("blocked")}
        >
          Blocked
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "approved" && (
          <RestaurantTable
            data={filteredData("approved")}
            isLoading={isLoading}
            onActionCompleted={handleActionCompleted}
            actionType="approve"
          />
        )}
        {activeTab === "unapproved" && (
          <RestaurantTable
            data={filteredData("unapproved")}
            isLoading={isLoading}
            onActionCompleted={handleActionCompleted}
            actionType="approve"
          />
        )}
        {activeTab === "blocked" && (
          <RestaurantTable
            data={filteredData("blocked")}
            isLoading={isLoading}
            onActionCompleted={handleActionCompleted}
            actionType="block"
          />
        )}
      </div>
    </div>
  );
};

export default RestaurantManagement;
