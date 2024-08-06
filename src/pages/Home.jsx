import React, { useEffect, useState } from "react";
import cards from "../data/LocalDB";
import { CardComponent } from "../component";
import { DonutChart, SalesChart } from "../component/Chart";
import RestaurantTable from "../component/RestaurantTable";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const [salesData, setSalesData] = useState({ categories: [], values: [] });
  const [donutData, setDonutData] = useState([]);

  const { data, loading, error, refetch } = useFetch("admin/getUsers/hotel");
  console.log(data, "data");

  useEffect(() => {
    // Fetch data from API or calculate it dynamically
    // Here we'll use dummy data for demonstration

    // Example sales data
    const fetchedSalesData = {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      values: [120, 200, 150, 80, 70, 110, 120, 200, 150, 80, 70, 110, 130],
    };
    setSalesData(fetchedSalesData);

    // Example donut chart data
    const fetchedDonutData = [
      { value: 1048, name: "Users" },
      { value: 735, name: "Restaurants" },
      { value: 580, name: "Bookings" },
      { value: 484, name: "Sales" },
    ];
    setDonutData(fetchedDonutData);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <CardComponent key={card.id} card={card} />
        ))}
      </div>
      <div className="grid grid-cols-12 gap-4 my-4">
        <div className="lg:col-span-8 sm:col-span-12 col-span-12">
          <SalesChart data={salesData} />
        </div>
        <div className="lg:col-span-4 sm:col-span-12 col-span-12">
          <DonutChart data={donutData} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 mb-4">
          <RestaurantTable
            data={data}
            isLoading={loading}
            onActionCompleted={refetch}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
