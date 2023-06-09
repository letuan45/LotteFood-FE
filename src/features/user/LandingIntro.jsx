import TemplatePointers from "./components/TemplatePointers";
import logo from "../../assets/others/lotte-logo.png";

function LandingIntro() {
  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200">
      <div className="hero-content py-12">
        <div className="max-w-md">
          <h1 className="text-3xl text-center font-bold ">
            <img
              src={logo}
              className="w-12 inline-block mr-2 mask mask-circle"
              alt="dashwind-logo"
            />
            Lotte Food
          </h1>

          <div className="text-center mt-12">
            <img
              src="https://hotdeal.vn/images/uploads/2017/Th%C3%A1ng%204/10/321879-1/321879-body%2520%283%29.jpg"
              alt="Dashwind Admin Template"
              className="w-56 inline-block"
            ></img>
          </div>

          {/* Importing pointers component */}
          <TemplatePointers />
        </div>
      </div>
    </div>
  );
}

export default LandingIntro;
