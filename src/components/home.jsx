import Cards from "./cards";
import health from "../assets/img/health.svg";
import handcuffs from "../assets/img/handcuffs.svg";
import flood from "../assets/img/flood.svg";
import fire from "../assets/img/fire.svg";
import callss from "../assets/img/callss.svg";
import nonviolence from "../assets/img/nonviolence.svg";
// import HeaderBar from "./navbar/headerbar";

const MainPage = () => {
  return (
    <div className="">
      {/* <div>
        <HeaderBar />
      </div> */}
      <div className="m-5 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 ">
        <div className="p-0">
          <Cards
            cardName={"Health"}
            cardName2={"Crisis"}
            cardLogo={health}
            logoAlt={"health crisis"}
          />
        </div>
        <div className="p-0">
          <Cards
            cardName={"Robbery "}
            cardName2={"Attack"}
            cardLogo={handcuffs}
            logoAlt={"handcuffs"}
          />
        </div>
        <div className="p-0 my-1 ">
          <Cards
            cardName={"Fire"}
            cardName2={"Outbreak"}
            cardLogo={fire}
            logoAlt={"fire"}
          />
        </div>
        <div className="p-0 my-1">
          <Cards
            cardName={"Flood"}
            cardName2={"Alert"}
            cardLogo={flood}
            logoAlt={"flood"}
          />
        </div>
        <div className="p-0">
          <Cards
            cardName={"Call"}
            cardName2={"Emergency"}
            cardLogo={callss}
            logoAlt={"call"}
          />
        </div>
        <div className="p-0">
          <Cards
            cardName={"Violence"}
            cardName2={"Alert"}
            cardLogo={nonviolence}
            logoAlt={"violence"}
          />
        </div>
      </div>
    </div>
  );
};
export default MainPage;
