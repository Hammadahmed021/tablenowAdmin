import React, { useEffect, useState } from "react";
import { RestaurantTable } from "../component";
import axios from "axios";
import useFetch from "../hooks/useFetch";

const Restaurants = () => {
  const { data, loading, error } = useFetch("filter");

  // if (loading) return <p className="text-center container mt-5">Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <>
      <div className="grid grid-cols-1 gap-4 ">
        <RestaurantTable data={data} isLoading={loading} />
      </div>
    </>
  );
};

export default Restaurants;
