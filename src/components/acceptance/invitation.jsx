import { faThumbsUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Accept() {
  return (
    <>
      <main className="App-header">
        <div className="absolute  top-[90px]">
          <h1 className="text-center">Create your</h1>
          <h1 className="text-center">In Case of Emergency List</h1>
        </div>
        <div className="border border-gray-200 w-auto shadow shadow-lg rounded rounded-xl">
          <div className="p-4 bg-black rounded rounded-xl">
            <h3 className="text-center">Hello, Mr Black</h3>
            <h4 className="">
              Thank you. You can create your{" "}
              <span className="font-bold">In Case of Emergency</span> <br />
              list by clicking on the{" "}
              <span className="italic font-semibold">Accept</span> button.
            </h4>
            <div className="flex m-6 justify-center gap gap-5">
              <Link to="/register">
                <button
                  type="button"
                  className="text-white flex justify-center w-[150px] bg-[#1da1f2] hover:bg-[#89CFF0]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
                >
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    flip="horizontal"
                    className="w-10 h-5"
                  />
                  <span className="font-bold text-lg">Ok</span>
                </button>
              </Link>
              <button
                type="button"
                className="text-white bg-[#DC143C] w-[150px] justify-center hover:bg-[#FF6347]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  flip="horizontal"
                  className=" w-10 h-5"
                />
                <span className="font-bold text-lg">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
