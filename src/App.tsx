import "./styles.css";
import { useState } from "react";

export default function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increase counter</button>
    </div>
  );
}
