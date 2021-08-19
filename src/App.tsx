import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

const FetchRandomData = () => {
  return axios
    .get("https://randomuser.me/api")
    .then((data) => {
      console.log(data);
      return JSON.stringify(data, null, 2);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default function App() {
  const [counter, setCounter] = useState(0);
  const [randomUserDataJson, setRandomUserDataJson] = useState("");

  useEffect(() => {
    FetchRandomData().then((randomData) => {
      setRandomUserDataJson(randomData || "No user data found.");
    });
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increase counter</button>
      <pre>{randomUserDataJson}</pre>
    </div>
  );
}
