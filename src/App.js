import { HashRouter as Router } from "react-router-dom";
import { Fragment } from "react";
import { MainSwitch, Spinner, TaskInformation } from "./components";
import { Header } from "./templates";

function App() {
  return (
    <Router>
      <Header />
      <Fragment>
        <MainSwitch />
      </Fragment>
      <Spinner />
      <TaskInformation />
    </Router>
  );
}

export default App;
