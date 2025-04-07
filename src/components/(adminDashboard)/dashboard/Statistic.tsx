const Statistic = () => {
  return (
    <div className="flex justify-between items-center xl:gap-3 gap-2 flex-wrap ">
      <div className="flex flex-col justify-center 2xl:px-10 px-5 h-[165px] flex-1 p-4 bg-section-bg rounded-xl text-main-color">
        <h3 className="2xl:text-3xl xl:text-2xl text-xl truncate">
          Total Users
        </h3>
        <p className="xl:text-3xl text-2xl font-medium text-main-color">
          6,500
        </p>
      </div>
      <div className="flex flex-col justify-center 2xl:px-10 px-5 h-[165px] flex-1 p-4  bg-section-bg rounded-xl text-main-color">
        <h3 className="2xl:text-3xl xl:text-2xl text-xl truncate">
          Total Gigs
        </h3>
        <p className="xl:text-3xl text-2xl font-medium text-main-color">
          4,500
        </p>
      </div>
      <div className="flex flex-col justify-center 2xl:px-10 px-5 h-[165px] flex-1 p-4  bg-section-bg rounded-xl text-main-color">
        <h3 className="2xl:text-3xl xl:text-2xl text-xl truncate">
          Ongoing Gigs
        </h3>
        <p className="xl:text-3xl text-2xl font-medium text-main-color">
          1,500
        </p>
      </div>
    </div>
  );
};

export default Statistic;
