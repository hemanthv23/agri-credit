import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSeedling, FaSyringe, FaHeartbeat, FaCrop } from "react-icons/fa";
import { GiSprout } from "react-icons/gi";
import CropList from "../components/CropList";
import FertiList from "../components/FertiList";
import Disease from "../components/DIseases";
import Pesticides from "../components/Pesticides";
import OrganicManure from "../components/OrganicManure";

const AgriHelp = () => {
  const location = useLocation();
  const [tab, setTab] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const selectedTab = urlParams.get("tab") || null; // Default to 'dash' if no tab is found
    setTab(selectedTab);
  }, [location.search]);
  return (
    <>
      {!tab && (
        <div className="outer-containerbg-gradient-to-br bg-white dark:bg-black p-10 min-h-screen flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#4caf50] to-[#f54646]">
            Agricultural Assistance
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Crop List Card */}
            <div className="cont1 bg-green-100 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <Link
                to="/agrihelp?tab=croplist"
                className="flex flex-col items-center"
              >
                <FaSeedling className="h-10 w-10 text-[#3b5a26] mb-3" />
                <div className="container1 text-[#3b5a26] text-xl font-bold">
                  Crop List
                </div>
                <div className="disc text-green-700 mt-2 text-center">
                  Select the type of soil and get the list of crops that can be
                  grown in that selected soil.
                </div>
              </Link>
            </div>

            {/* Fertilizers Card */}
            <div className="cont2 bg-green-100 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <Link
                to="/agrihelp?tab=fertilist"
                className="flex flex-col items-center"
              >
                <GiSprout className="h-10 w-10 text-[#4c8f2e] mb-3" />
                <div className="container2 text-[#4c8f2e] text-xl font-bold">
                  Fertilizers
                </div>
                <div className="disc text-green-700 mt-2 text-center">
                  Select the type of soil and the crop to be grown in that soil
                  and get the suitable fertilizer to be applied.
                </div>
              </Link>
            </div>

            {/* Diseases Card */}
            <div className="cont3 bg-green-100 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <Link
                to="/agrihelp?tab=diseases"
                className="flex flex-col items-center"
              >
                <FaHeartbeat className="h-10 w-10 text-[#d9534f] mb-3" />
                <div className="container3 text-[#d9534f] text-xl font-bold">
                  Diseases
                </div>
                <div className="disc text-green-700 mt-2 text-center">
                  Select the crop and find the various diseases associated with
                  that selected crop.
                </div>
              </Link>
            </div>

            {/* Pesticides Card */}
            <div className="cont4 bg-green-100 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <Link
                to="/agrihelp?tab=pesticides"
                className="flex flex-col items-center"
              >
                <FaSyringe className="h-10 w-10 text-[#007bff] mb-3" />
                <div className="container4 text-[#007bff] text-xl font-bold">
                  Pesticides
                </div>
                <div className="disc text-green-700 mt-2 text-center">
                  Select the crop name and the disease name and get the suitable
                  pesticide to be applied to control the disease.
                </div>
              </Link>
            </div>
            {/* Manure Card */}
            <div className="cont4 bg-green-100 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
              <Link
                to="/agrihelp?tab=manures"
                className="flex flex-col items-center"
              >
                <img
                  src="https://w7.pngwing.com/pngs/178/852/png-transparent-agriculture-fertilisers-nutrient-health-marketing-seeds-miscellaneous-industry-trade-thumbnail.png"
                  alt=""
                  className="h-20 w-20 mb-3"
                ></img>
                <div className="container4 text-[#422006] text-xl font-bold">
                  Organic Manures
                </div>
                <div className="disc text-green-700 mt-2 text-center">
                  Manure Management feature to track, apply, and exchange
                  various types of manure for optimal crop health
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
      {tab && (
        <>
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-green-500 rounded-lg sm:hidden hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:text-green-400 dark:hover:bg-green-700 dark:focus:ring-green-600"
            onClick={() => setSidebar(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>

          <aside
            id="default-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-${
              sidebar ? "0" : "full"
            } sm:translate-x-0`}
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-20 overflow-y-auto bg-green-50 dark:bg-green-800">
              <div
                onClick={() => setSidebar(false)}
                className="flex float-end bg-green-800 rounded-full p-2 text-white sm:hidden"
              >
                X
              </div>
              <ul className="space-y-2 font-medium">
                <li>
                  <Link
                    to="/agrihelp"
                    className="flex items-center p-2 text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700 group"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 transition duration-75 dark:text-green-400 group-hover:text-green-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                      <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                    </svg>
                    <span className="ms-3">Agri Help</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agrihelp?tab=croplist"
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                      tab === "croplist" ? "bg-green-100 dark:bg-green-700" : ""
                    } hover:bg-green-100 dark:hover:bg-green-700 group`}
                  >
                    <FaSeedling className="h-5 w-5 text-[#3b5a26] transition duration-75 dark:text-[#3b5a26] group-hover:text-green-900 dark:group-hover:text-white " />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Crop List
                    </span>
                    {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-300">
                      Pro
                    </span> */}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agrihelp?tab=fertilist"
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                      tab === "fertilist"
                        ? "bg-green-100 dark:bg-green-700"
                        : ""
                    } hover:bg-green-100 dark:hover:bg-green-700 group`}
                  >
                    <GiSprout className="h-5 w-5 text-[#4c8f2e] transition duration-75 dark:text-[#4c8f2e] group-hover:text-green-900 dark:group-hover:text-white " />

                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Fertilizers
                    </span>
                    {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      3
                    </span> */}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agrihelp?tab=diseases"
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                      tab === "diseases" ? "bg-green-100 dark:bg-green-700" : ""
                    } hover:bg-green-100 dark:hover:bg-green-700 group`}
                  >
                    <FaHeartbeat className="h-5 w-5  text-[#d9534f] transition duration-75 dark:text-[#d9534f] group-hover:text-green-900 dark:group-hover:text-white " />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Diseases
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agrihelp?tab=pesticides"
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                      tab === "pesticides"
                        ? "bg-green-100 dark:bg-green-700"
                        : ""
                    } hover:bg-green-100 dark:hover:bg-green-700 group`}
                  >
                    <FaSyringe className="h-5 w-5  text-[#007bff] transition duration-75 dark:text-[#007bff] group-hover:text-green-900 dark:group-hover:text-white " />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Pesticides
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agrihelp?tab=manures"
                    className={`flex items-center p-2 text-green-900 rounded-lg dark:text-white ${
                      tab === "pesticides"
                        ? "bg-green-100 dark:bg-green-700"
                        : ""
                    } hover:bg-green-100 dark:hover:bg-green-700 group`}
                  >
                    <FaSyringe className="h-5 w-5  text-[#007bff] transition duration-75 dark:text-[#007bff] group-hover:text-green-900 dark:group-hover:text-white " />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Manure
                    </span>
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="#"
                    className="flex items-center p-2 text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700 group"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 transition duration-75 dark:text-green-400 group-hover:text-green-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                      />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Sign In
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="flex items-center p-2 text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700 group"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 transition duration-75 dark:text-green-400 group-hover:text-green-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                      <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                      <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Sign Up
                    </span>
                  </Link>
                </li> */}
              </ul>
            </div>
          </aside>

          <div className="p-4 sm:ml-64 bg-white dark:bg-black">
            {tab === "croplist" && <CropList />}
            {tab === "fertilist" && <FertiList />}
            {tab === "diseases" && <Disease />}
            {tab === "pesticides" && <Pesticides />}
            {tab === "manures" && <OrganicManure />}
            {tab === "dash" && <DashboardComp />}
          </div>
        </>
      )}
    </>
  );
};

export default AgriHelp;