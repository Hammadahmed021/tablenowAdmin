import React from "react";
import { UserTable } from "../component";
import useFetch from "../hooks/useFetch";

const App = () => {
  const { data, loading, error, refetch } = useFetch("admin/getUsers/user");
  console.log(data, "user data");

  return (
    <div>
      <UserTable data={data} loading={loading} />
    </div>
  );
};

export default App;
