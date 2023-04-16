import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { logout, selectAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import iconLogo from "../../assets/104438_blog_google_blogger_icon.png";
export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectAuth);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <img src={iconLogo} />
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button
                    sx={{
                      background: "white",
                      fontWeight: 700,
                      color: "black",
                      ":hover": {
                        background: "white",
                      },
                    }}
                    variant="contained"
                  >
                    Написать статью
                  </Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    sx={{
                      background: "white",
                      fontWeight: 700,
                      color: "black",
                      ":hover": {
                        background: "white",
                      },
                    }}
                    variant="outlined"
                  >
                    Войти
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    sx={{
                      background: "#6f7c85",
                      fontWeight: 700,
                      color: "white",
                      ":hover": {
                        background: "#646a6e",
                      },
                    }}
                    variant="contained"
                  >
                    Создать аккаунт
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
