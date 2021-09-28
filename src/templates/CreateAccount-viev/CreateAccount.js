import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, timeoutShowTask } from "../../data/actions";
import { Button, BackButton } from "../../components";
import styles from "./createAccount.module.scss";

const CreateAccount = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const handleOnChangeLogin = (e) => {
    setLogin(e.target.value);
  };
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleOnChangeCheckPassword = (e) => {
    setCheckPassword(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!login || !password || !checkPassword) {
      dispatch(timeoutShowTask("Pola nie mogą być puste"));
    } else if (password !== checkPassword) {
      dispatch(timeoutShowTask("Hasła różnią się od siebie"));
    } else {
      dispatch(
        timeoutShowTask("W tej wersji apikacji nie można stworzyć użytkownika")
      );
      //not for production version wihout permission!!!
      //   const userData = {
      //     login,
      //     password,
      //     access: "user",
      //   };
      //   dispatch(addUser(userData));
      // }
    }
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
          <div className={styles.password}>
            <input
              className={styles.input}
              onChange={handleOnChangeCheckPassword}
              type="password"
              value={checkPassword}
              placeholder="Powtórz hasło"
            />
          </div>
          <div className={styles.buttons}>
            <Button type="submit" name="dodaj użytkownika" />
            <BackButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
