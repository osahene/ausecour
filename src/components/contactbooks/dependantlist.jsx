export default function Dependents() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                <div className="text-base font-semibold">Neil Sims</div>
                <div className="font-normal text-gray-500">
                  neil.sims@flowbite.com
                </div>
              </div>
            </th>
            <td className="px-6 py-4">0542554225</td>
            <td className="px-6 py-4">Father</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                Approved
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
        </tbody>
      </table>
    </div>
  );
}
