import IconMap from "../component/IconsMapped";

const cards = [
  {
    id: 1,
    name: "Users",
    icon: IconMap.UserIcon,
    amount: 55,
    percentage: 0.12,
    text: 'Up from yesterday',
  },
  {
    id: 2,
    name: "Restaurants",
    icon: IconMap.RestaurantIcon,
    amount: 15,
    percentage: 0.12,
    text: 'Up from yesterday',
  },
  {
    id: 3,
    name: "Bookings",
    icon: IconMap.OrderIcon,
    amount: 125,
    percentage: -0.05,
    text: 'Down from yesterday',
  },
  {
    id: 4,
    name: "Sales",
    icon: IconMap.SalesIcon,
    amount: `$125,000`,
    percentage: -0.05,
    text: 'Down from yesterday',
  },
  
];

export default cards;
