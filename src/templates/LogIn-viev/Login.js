import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../../data/actions";
import { Button } from "../../components";
import styles from "./login.module.scss";

const Login = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const logindData = {
      login,
      password,
      access: "user",
    };
    dispatch(userLogin(logindData));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <form className={styles.form} method="post" onSubmit={handleOnSubmit}>
          <div className={styles.login}>
            <input
              className={styles.input}
              onChange={handleOnChangeLogin}
              type="text"
              value={login}
              placeholder="Login"
            />
          </div>
          <div className={styles.password}>
            <input
              className={styles.input}
              onChange={handleOnChangePassword}
              type="password"
              value={password}
              placeholder="Hasło"
            />
          </div>
          <div className={styles.buttons}>
            <Button type="submit" name="zaloguj" />
            <Link to="/createAccount">Utwórz konto</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
