import LoginCard from "@/components/web/loginCard";

const App = () => {
  return (
    <div className=" flex  items-center h-11/12 justify-center  ">
      {/* Screen cards  */}
      <div className=" flex flex-row   justify-around gap-69">
        <div>
          {/* animation  */}
          <LoginCard />
        </div>

        {/* login card  */}
        <div className="">
          <LoginCard />
        </div>
      </div>
    </div>
  );
};

export default App;
