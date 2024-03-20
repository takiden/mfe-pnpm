import "./App.css";
import { FirstApp } from "FirstApp/remoteEntry";
import { SecondApp } from "SecondApp/remoteEntry";

function App() {
  return (
    // <p>hello</p>
    <>
      <p>hello</p>
      <div>
        <FirstApp />
      </div>

      <div>
        <SecondApp />
      </div>
    </>
  );
}

export default App;
