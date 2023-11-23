import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";

export default function List() {
  const stateData = useSelector((state) => state.slice.email);
  console.log(stateData);
  return (
    <div className="p-4 bg-white rounded-lg">
      <h1 className="font-bold p-9 text-cyan-400">
        This page contains all the Mails that are checked till now and are
        authenticated:
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {stateData.map((data, index) =>
          index === 0 ? null : (
            <div
              key={index}
              className="bg-blue-100 rounded p-2 m-2"
              style={{
                backgroundColor: `rgb(${255 * Math.random()}, ${
                  255 * Math.random()
                }, ${255 * Math.random()})`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <p
                className="bg-yellow-200 py-2 px-4 rounded-lg"
                style={{
                  backgroundColor: `rgb(${255 * Math.random()}, ${
                    255 * Math.random()
                  }, ${255 * Math.random()})`,
                }}
              >
                {data}
              </p>
            </div>
          )
        )}
      </div>
      <Link
        to="/home"
        className="bg-blue-700 text-center hover:bg-black text-white font-bold py-2 px-4 rounded flex items-center justify-center  transition duration-300 ease-in-out " 
        style={{margin:"0 1rem 0 1rem" ,textAlign:"center"}}
      >
        Go to Main page
      </Link>
    </div>
  );
}
