import React from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";

const Dashboard = () => {
  return (
    <>
      <AppBar />
      <div className="m-8">
        <Balance/>
        <Users />
      </div>
    </>
  );
};

export default Dashboard;
