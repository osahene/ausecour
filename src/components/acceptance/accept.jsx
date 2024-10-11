import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Accept() {
  return (
    <>
      <main className="App-header">
        <div className="absolute top-[120px]">
          <h1>Nomination Consent</h1>
        </div>
        <div className="border border-gray-200 w-auto shadow shadow-lg rounded rounded-xl">
          <div className="p-4 bg-black rounded rounded-xl">
            <h3 className="text-center">Hello, Mr Black</h3>
            <h4 className="">
              We are glad to inform you that <span>David</span> has nominated
              you, <br /> that in case of emergency, you should be contacted.
            </h4>
            <div className="flex m-6 justify-center gap gap-5">
              <Link to={`invite`}>
                <button
                  type="button"
                  class="text-white flex justify-center w-[150px] bg-[#1da1f2] hover:bg-[#89CFF0]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
                >
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    flip="horizontal"
                    className="w-10 h-5"
                  />
                  <span className="font-bold text-lg">Accept</span>
                </button>
              </Link>
              <button
                type="button"
                class="text-white bg-[#DC143C] w-[150px] justify-center hover:bg-[#FF6347]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
              >
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  flip="horizontal"
                  className="w-10 h-5"
                />
                <span className="font-bold text-lg">Reject</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
