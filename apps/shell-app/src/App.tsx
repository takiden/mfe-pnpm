import "./App.css";
import { FirstApp } from "firstApp/remoteEntry";
import { SecondApp } from "secondApp/remoteEntry";

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
