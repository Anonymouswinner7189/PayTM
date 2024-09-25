import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign In"} />
          <SubHeading
            content={"Enter your credentials to access your account"}
          />
          <InputBox
            label={"Email"}
            placeholder={"yashwanthmendu@gmail.com"}
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputBox
            label={"Password"}
            placeholder={"12345678"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "http://localhost:5000/api/v1/user/signin",
                    {
                      userName,
                      password,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json", // Ensure correct Content-Type
                      },
                    }
                  );
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } catch (err) {
                  console.error("Error signing in : ", err);
                }
              }}
              label={"Sign In"}
            />
          </div>
          <BottomWarning
            label={"Don`t have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
