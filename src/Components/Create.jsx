import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [age, setage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addUser = { name, email, age };
    //console.log(addUser);
    const response = await fetch("http://localhost:8080", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addUser),
      auth: window.$auth,
    });
    //console.log(response)
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      //console.log("succesfully created", result);
      setError("");
      setname("");
      setemail("");
      setage("");
      navigate("/all");
    }
  };

  return (
    <div className="bg-gray-300 h-screen">
      {error && <div className="text-amber-950 h-16 bg-red-500">{error}</div>}
      <p className="text-2xl pt-5 font-semibold text-center mb-5">
        Enter the data
      </p>
      <div className="flex justify-center">
        <form
          className="bg-slate-500 text-white flex flex-col pl-2 border-2 border-red-800 shadow-md shadow-red-400  text-center md:w-1/3 w-full m-2 "
          onSubmit={handleSubmit}
        >
          <label>
            Name
            <input
              className="border m-2 text-black"
              type="text"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              placeholder="Enter your Name"
            />
          </label>
          <label>
            Email
            <input
              className="border m-2 text-black"
              type="text"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder="Enter your Email"
            />
          </label>
          <label>
            Age
            <input
              className="border m-2 text-black"
              type="number"
              value={age}
              onChange={(e) => {
                setage(e.target.value);
              }}
              placeholder="Enter your Age"
            />
          </label>

          <label>
            <input
              type="submit"
              className="border m-2 p-1 w-20 bg-blue-500 rounded-lg cursor-pointer text-white hover:bg-blue-700"
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Create;
