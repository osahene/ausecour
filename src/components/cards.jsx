const Cards = ({ cardName, cardName2, cardLogo, logoAlt }) => {
  return (
    <div className="w-auto h-auto grid gap-auto backdrop-filter backdrop-blur-sm bg-opacity-10 overflow-hidden border border-gray-200 rounded-xl shadow ">
      <div className="p-1 flex flex-col justify-center items-end content-fit">
        <div className="flex flex-col items-start">
          <p className="font-bold text-[24px] xs:text-[40px] sm:text-[50px]  text-gray-700 dark:text-white">
            {cardName}
          </p>
          <p className=" font-bold text-[24px] xs:text-[40px] sm:text-[50px]  text-white dark:text-white">
            {cardName2}
          </p>
        </div>
      </div>
      <div className="relative flex top-[10px] xs:top-[10px] sm:top-[30px] md:top-[50px] xs:z-[2] justify-start">
        <img
          className="rounded-t-lg h-[70px] xs:h-[100px] sm:h-[150px]"
          src={cardLogo}
          alt={logoAlt}
        />
      </div>
    </div>
  );
};
export default Cards;
