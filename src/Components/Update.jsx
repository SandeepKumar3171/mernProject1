import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [age, setage] = useState(0);
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  //get single user data
  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:8080/${id}`);

    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setError("");
      //console.log("Updated User", result);
      setname(result.name);
      setemail(result.email);
      setage(result.age);
    }
  };

  //send updated data to backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateUser = { name, email, age };
    //console.log(updateUser);
    const response = await fetch(`http://localhost:8080/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser),
      auth: window.$auth,
    });
    //console.log(response)
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setError("");
      navigate("/all");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="bg-gray-300 h-screen">
      {error && <div className="text-amber-950 h-16 bg-red-500">{error}</div>}
      <p className="text-xl font-semibold text-center pt-5 mb-5">
        Edit the data
      </p>
      <div className="flex justify-center">
        <form
          onSubmit={handleUpdate}
          className="bg-slate-500 text-white flex flex-col pl-2 border text-center md:w-1/3 w-full m-2 border-red-800 shadow-md shadow-red-400 "
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
              className="border m-2 p-1 w-20 bg-blue-500 rounded-lg cursor-pointer text-white  hover:bg-blue-700"
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Update;
