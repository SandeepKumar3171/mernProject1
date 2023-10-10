import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setdata] = useState("");
  const [error, seterror] = useState("");

  const getData = async () => {
    const response = await fetch("http://localhost:8080");
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      seterror(result.error);
    }
    if (response.ok) {
      setdata(result);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  //console.log(data);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8080/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      seterror(result.error);
    }
    if (response.ok) {
      seterror("Deleted Succesfully");
      setTimeout(() => {
        seterror("");
        getData();
      }, 1000);
    }
  };

  return (
    <div>
      {error && <div className="text-amber-950 h-16 bg-red-500">{error}</div>}
      <div className="grid md:grid-cols-3 grid-1 text-white">
        {data &&
          data?.map((e) => (
            <div
              key={e._id}
              className="p-2 m-1 border gap-5 bg-slate-500 text-center shadow-lg shadow-red-500"
            >
              <p className="text-xl font-semibold">{e.name} </p>
              <p>{e.email}</p>
              <p>{e.age}</p>
              <div className="flex flex-row justify-between gap-5 text-white">
                <Link to={`/${e._id}`} className="bg-blue-700 p-1 rounded-lg">
                  Edit
                </Link>
                <button
                  className="bg-red-600 p-1 rounded-lg"
                  onClick={() => handleDelete(e._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Read;
