import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"; // прикручиваем форму регистрации
import { fetchRegister, selectAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Registration = () => {
  const isAuth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Гера Маня",
      email: "gera@mail.ru",
      password: "1234",
    },
    mode: "onChange",
  });
  const onSubmit = async (value) => {
    const data = await dispatch(fetchRegister(value));
    if (!data.payload) {
      toast.error("Данный пользователь уже занят 😥", {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Регистрация прошла успешно 🥳", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
    console.log(data);
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Укажите имя пользователя!!" })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          type="email"
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту!" })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль!" })}
          className={styles.field}
          label="Пароль"
          type="password"
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
