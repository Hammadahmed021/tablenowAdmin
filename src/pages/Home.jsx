import React, { useEffect, useState } from "react";
import cards from "../data/LocalDB";
import { CardComponent } from "../component";
import { DonutChart, SalesChart } from "../component/Chart";
import RestaurantTable from "../component/RestaurantTable";
import useFetch from "../hooks/useFetch";
import { getCardsData } from "../utils/Api";

const Home = () => {
  const [salesData, setSalesData] = useState({ categories: [], values: [] });
  const [donutData, setDonutData] = useState([]);
  const [cardData, setCardData] = useState([]);

  const { data, loading, error, refetch } = useFetch("admin/getUsers/hotel");
  console.log(data, "data");

  const fetchCardsData = async () => {
    try {
      const response = await getCardsData();
      // console.log(response, "response of cards");
      setCardData(response);
    } catch (error) {
      throw new Error("Error fetchinga cards data", error);
    }
  };

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
    fetchCardsData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Object.entries(cardData)?.map(([key, value]) => (
          <CardComponent key={key} name={key} amount={value} />
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
