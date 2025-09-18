import "./App.css";
import CombineContext from "./context/CombineContext";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <CombineContext >
        <Home/>
      </CombineContext>
    </>
  );
}

export default App;
