import LoginCard from "@/components/web/loginCard";

const App = () => {
  return (
    <div className="h-screen flex  items-center justify-center  ">
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
