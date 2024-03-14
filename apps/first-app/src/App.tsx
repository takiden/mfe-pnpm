import "./App.css";
import { MyTitle, MyGreeting } from "@mfe/react-ui";
import { MyLog } from "@mfe/logic-lib";

function App() {
  const handleClick = () => {
    MyLog("click from first app");
  };

  return (
    <>
      <div>First App</div>
      <MyTitle title="Title Prop from 1st App"></MyTitle>
      <MyGreeting salute="Aref"></MyGreeting>
      <span>bla bla</span>
      <button onClick={handleClick}>Click me</button>
    </>
  );
}

export default App;
