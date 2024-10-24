import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiSprout } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";

const DashManure = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [manureList, setManureList] = useState([]);
  const [selectedManure, setSelectedManure] = useState(null); // Holds selected manure

  useEffect(() => {
    getManuresByUser();
  }, [currentUser]);
  const getManuresByUser = async () => {
    try {
      const res = await fetch("/api/manures/getbyuser", {
        method: "GET",
        credentials: "include",
      });
      const manures = await res.json();
      setManureList(manures);
      console.log(manures);

      if (res.ok) {
        console.log("manures fetched successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleManureClick = (manure) => {
    setSelectedManure({ ...manure });
  };
  return (
    <>
      <div className="bg-white p-4 min-w-full rounded shadow-md">
        {selectedManure ? (
          <div className="manure-details">
            <h3 className="text-lg font-semibold">Manure Details</h3>
            <div className="flex space-x-4 justify-between">
              <div className="manure-text">
                <p>
                  <strong>Type:</strong> {selectedManure.manure_type}
                </p>
                <p>
                  <strong>Quantity:</strong> {selectedManure.quantity}
                </p>
                <p>
                  <strong>Description:</strong> {selectedManure.description}
                </p>
                <p>
                  <strong>Address:</strong> {selectedManure.address}
                </p>
                <p>
                  <strong>Owner:</strong> {selectedManure.posted_by}
                </p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleRequest(selectedManure)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRequest(selectedManure)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => setSelectedManure(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="manureimage">
                <img
                  src={selectedManure.manure_img}
                  alt={selectedManure.type}
                  className="w-60 h-40 mr-10 object-cover rounded border border-gray-300"
                />
              </div>
            </div>
          </div>
        ) : (
          <ul className="manure-list space-y-2">
            {manureList &&
              manureList.map((item) => (
                <li className="p-4 flex justify-between bg-green-100 rounded shadow cursor-pointer hover:bg-green-200">
                  <div
                    className="flex flex-col "
                    onClick={() => handleManureClick(item)}
                  >
                    <h4 className="font-bold">{item.manure_type}</h4>
                    <p>{item.quantity}-(tractor loads)</p>
                  </div>
                  <div className="flex  justify-between gap-10">
                    {" "}
                    <button className="flex items-center  p-3 gap-2 w-20 bg-green-600 rounded-2xl hover:bg-green-700 text-white">
                      <FaEdit />
                      Edit
                    </button>
                    <button className="bg-red-700 rounded-full p-3">
                      Remove
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>{" "}
    </>
  );
};

export default DashManure;