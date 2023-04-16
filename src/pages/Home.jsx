import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MainPage from "../components/MainPage";
import { MyPosts } from "../components/MyPosts";
import { selectAuth } from "../redux/slices/auth";
import { useSelector } from "react-redux";
import PopularPosts from "../components/PopularPosts";
export const Home = () => {
  const isAuth = useSelector(selectAuth);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {isAuth ? (
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            style={{ marginBottom: 20 }}
            aria-label="nav tabs example"
          >
            <Tab style={{ fontSize: 18, fontWeight: 500 }} label="Главная" />
            <Tab label="Мои статьи" />
            <Tab label="Популярные" />
          </Tabs>
          {value === 0 && <MainPage />}
          {value === 1 && <MyPosts />}
          {value === 2 && <PopularPosts />}
        </Box>
      ) : (
        <>
          <Box>
            <Tabs
              value={0}
              style={{ marginBottom: 20 }}
              aria-label="nav tabs example"
            >
              <Tab style={{ fontSize: 18, fontWeight: 500 }} label="Главная" />
            </Tabs>
          </Box>
          <MainPage />
        </>
      )}
    </>
  );
};
