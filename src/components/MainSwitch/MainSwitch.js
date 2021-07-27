import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { AddSubcontractor, MainSection, CreateAccount } from "../../templates";

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

        <Redirect to="/" />
      </Switch>
    </>
  );
};
export default MainSwitch;
