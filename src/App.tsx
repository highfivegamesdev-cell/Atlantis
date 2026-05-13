import Modal from "react-modal";
import { Outlet } from "react-router-dom";

Modal.setAppElement("#root");

function App() {
  return <Outlet />;
}

export default App;
