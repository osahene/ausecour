import React, { useEffect, useState } from "react";
import apiService from "../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

export default function Dependents() {
  const [dependants, setDependants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await apiService.getMyDependants();
        setDependants(response.data);
        console.log("depend", response);
      } catch (error) {
        console.log("Error fetching contacts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className=" overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-xl font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          My Dependents
          <p className="mt-1 text-lg font-normal text-gray-500 dark:text-gray-400">
            List of relations who count on you during emergency situations. The
            information can be updated.
          </p>
        </caption>
        <thead className="text-lg text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3">
              Relation
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              {/* <span className="sr-only">Action</span> */}
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-lg text-center">
          {dependants.length > 0 ? (
            dependants.map((dependant) => (
              <tr
                key={dependant.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src="/docs/images/people/profile-picture-1.jpg"
                    alt="Jese"
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold">
                      {dependant.name}
                    </div>
                    <div className="font-normal text-gray-500">
                      {dependant.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{dependant.phone_number}</td>
                <td className="px-6 py-4">{dependant.relation}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                    {dependant.status}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-blue-400">
                    {/* <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              > */}
                    Approve
                    {/* </a> */}
                  </span>
                  <span className="mx-5 ">|</span>
                  <span className="text-red-400">
                    {/* <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              > */}
                    Remove
                    {/* </a> */}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 bg-gray-300 text-center">
                <FontAwesomeIcon
                  className="w-20 h-20 text-gray-500"
                  icon={faFile}
                />
                <p className="mt-4 text-lg font-semibold text-gray-600">
                  No dependants contact available
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
