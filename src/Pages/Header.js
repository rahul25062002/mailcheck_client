import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setLogIn } from "../slice";

export default function Header() {
  const checklogIn = useSelector((state) => state.slice.logIn);
  console.log(checklogIn);
  const Navigate = useNavigate();
  return (
    <div className="flex justify-between items-center  bg-blue-700 w-full">
      <div
        className="text-white text-3xl font-bold   "
        style={{ padding: "1rem" }}
      >
        RealMail
      </div>
      <h1
        className="text-xl text-white m-2 font-extrabold "
        style={{ padding: "1rem" }}
      >
        This app is use to validate the email
      </h1>
      <div className=" sm:w-6/12 xl:w-4/12  flex justify-between items-center p-4 gap-4 ">
        <button
          className="bg-blue-700 hover:bg-black text-white font-bold  rounded  border w-40 transition duration-300 ease-in-out flex items-center justify-between"
          onClick={() => Navigate("../list")}
          style={{ width: "6rem", padding: "0.56rem" }}
        >
          <img
            src="https://www.clipartmax.com/png/middle/134-1342598_see-your-completed-checklists-in-slack-checklist-logo.png"
            alt="Imag"
            style={{ height: "1.4rem" }}
            className="h-2 w-2 mx-1 p-2 text-center"
          />
          <p> List</p>
        </button>
        <button
          className={`bg-blue-700 hover:bg-black text-white font-bold py-2 px-4 rounded flex items-center justify-between`}
          onClick={() => Navigate("../")}
          style={{ margin: "0 2px 0 8px", border: "1px solid white" }}
        >
          {checklogIn ? <p>LogOut</p> : <p>LogIn</p>}
        </button>
      </div>
    </div>
  );
}
