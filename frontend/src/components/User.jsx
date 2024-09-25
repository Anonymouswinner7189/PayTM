import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const User = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mb-2">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-3">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={(e) => {
            navigate(
              "/send?id=" +
                user._id +
                "&firstName=" +
                user.firstName +
                "&lastName=" +
                user.lastName
            );
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
};

export default User;
