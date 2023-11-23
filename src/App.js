import {
  useGetCheckSingleMailQuery,
  useGetMassQuery,
  useGetMailsQuery,
} from "./featchSliceApi";
import "./App.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSession, setEmails } from "./slice";
import Header from "./Pages/Header";

function useMass(massMail) {
  const { data: massMails } = useGetMassQuery(massMail);
  return massMails;
}

function useGetMail(sessionId) {
  const { data: getMail, error: getMailError } = useGetMailsQuery(sessionId);
  return { getMail, getMailError };
}

function App() {
  const [mail, setMail] = useState("");
  const [massMail, setMassMail] = useState("");
  const [inputvalue, setInput] = useState("");
  const [singlemail, setSingleMail] = useState("");
  const [but1, setbut1] = useState(true);
  const [but2, setbut2] = useState(false);
  const [but3, setbut3] = useState(false);
  const [inputMass, setInputmass] = useState("");
  const dispatch = useDispatch();

  const { data: singleMail } = useGetCheckSingleMailQuery(mail);

  useEffect(() => {
    if (
      singleMail !== "" &&
      singleMail?.dns === true &&
      singleMail?.format === true &&
      singleMail?.disposable === false
    ) {
      dispatch(setEmails(mail));
    }
  }, [singleMail, dispatch, mail]);

  const { data: massMails } = useGetMassQuery(massMail);

  console.log(massMails);

  useEffect(() => {
    if (massMails !== "") {
      dispatch(setSession(massMails?.session));
    }
  }, [massMails, dispatch]);

  const stateData = useSelector((state) => state.slice);
  const sessionId = stateData.session;

  const { data: getMail, error: getMailError } = useGetMailsQuery(sessionId);

  useEffect(() => {
    if (
      sessionId !== "" &&
      massMails !== "" &&
      sessionId !== undefined &&
      getMailError?.data !== undefined
    ) {
      let datahere = getMailError?.data;
      dispatch(setEmails(datahere));
      datahere = "";
    }
  }, [sessionId, dispatch, getMailError?.data, massMails]);

  const checkhere = (event) => {
    setMail(inputvalue);

    setInput("");
  };
  const checkhere2 = (event) => {
    setMassMail(inputMass);

    setInputmass("");
  };
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleTextChange = (event) => {
    setInputmass(event.target.value);
  };

  useEffect(() => {
    const fun = async () => {
      const res = await fetch("http://localhost:5001/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${stateData.token}`,
        },
        body: JSON.stringify(stateData),
      });
      if (res.ok) console.info("Mails sent successfully");
      else console.error("Mails are not send properly");
    };
    fun();
  }, [stateData]);

  console.log(stateData);
  return (
    <div className="App flex flex-col justify-center ">
      <Header />
      <div className="bg-gray-500  h-96 w-11/12 m-auto my-4 rounded-4 border">
        <div className="flex flex-col  h-full">
          <h1 className="text-4xl text-white my-4 ">Single Mail</h1>
          <div className="flex items-center justify-center mt-6   ">
            <input
              className="w-3/5 mr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 shadow-md p-4 font-medium"
              type="email"
              placeholder="Enter email"
              value={inputvalue}
              onChange={handleChange}
            />
            <button
              className="bg-blue-700 hover:bg-black text-white font-bold py-2 px-4 rounded flex items-center justify-between  transition duration-300 ease-in-out"
              onClick={checkhere}
            >
              Search
            </button>
          </div>
          <div>
            {singleMail && (
              <div className="my-7">
                <p className="text-white">
                  ` Format : {singleMail.format?.toString()}`
                </p>
                <p className="text-white">
                  `Disponsable : {singleMail?.disposable?.toString()}`
                </p>
                <p className="text-white">
                  'Whitelist : {singleMail?.whitelist?.toString()}'
                </p>
                <p className="text-white">
                  `Dns : {singleMail?.dns?.toString()}`
                </p>
                <p className="text-white">
                  `Domain : {singleMail?.domain?.toString()}`
                </p>
              </div>
            )}

            {/* {
              singleMail?.whilitlist
            } */}
          </div>
        </div>
      </div>
      <div
        className="bg-gray-500 w-11/12  rounderd m-auto p-8"
        style={{ height: "35rem" }}
      >
        <h1 className="text-4xl text-white mb-10 mt-6">Mass Mail</h1>
        <textarea
          className="w-3/4 h-300 py- border rounded-t-lg focus:outline-none focus:ring focus:border-blue-500 resize-none px-5 py-3 font-bold"
          id="multiline-input"
          type="email"
          value={inputMass}
          onChange={handleTextChange}
          rows={8} // Specify the number of visible rows
          cols={40} // Specify the number of visible columns
          placeholder="Type your text here..."
        ></textarea>
        <button
          className="bg-blue-700 hover:bg-black text-white font-bold py-2 px-4  flex m-auto w-3/4 justify-center rounded-b-lg mt-1 transition duration-400 ease-in-out"
          onClick={checkhere2}
        >
          Search
        </button>
        <div className="p-4">
          {sessionId && (
            <p className="text-white text-3xl">{getMailError?.data}</p>
          )}
        </div>
      </div>
      <footer className="bg-black p-4 mt-40 h-3/5 flex items-center justify-center  ">
        <p className="text-white">Made By Rahul</p>
      </footer>
    </div>
  );
}

export default App;
