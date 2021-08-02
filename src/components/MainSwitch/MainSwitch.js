import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  AddSubcontractor,
  FindSubcontractor,
  MainSection,
  CreateAccount,
} from "../../templates";

const MainSwitch = () => {
  const cookie = useSelector((store) => store.cookie[0]);
  const user = useSelector((store) => store.user);
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <MainSection />} />
        <Route exact path="/createAccount" render={() => <CreateAccount />} />

        {user.length || cookie.isCookie ? (
          <Route
            exact
            path="/add-subcontractor"
            render={() => <AddSubcontractor />}
          />
        ) : (
          ""
        )}
        {user.length || cookie.isCookie ? (
          <Route
            exact
            path="/find-subcontractor"
            render={() => <FindSubcontractor />}
          />
        ) : (
          ""
        )}

        <Redirect to="/" />
      </Switch>
    </>
  );
};
export default MainSwitch;
