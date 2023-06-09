import Cart from "./components/Cart";
import SelectFood from "./components/SelectFood";

function Dashboard() {
  return (
    <>
      {/** ---------------------- Different charts ------------------------- */}
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        <div className="col-span-2">
          <SelectFood />
        </div>
        <div className="col-span-1">
          <Cart />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
