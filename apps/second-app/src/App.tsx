import "./App.css";
import { MyLog } from "@mfe/logic-lib";

function App() {
  const handleClick = () => {
    MyLog("click from SECOND app");
  };
  return (
    <>
      <div>Second App</div>
      <button onClick={handleClick}>Click me</button>
    </>
  );
}

export default App;
