import React from "react";
import styles from "./UserInfo.module.scss";
import Moment from "react-moment";
export const UserInfo = ({ fullName, additionalText }) => {
  const avatar = fullName.trim().toUpperCase().split("").slice(0, 1);

  return (
    <div className={styles.root}>
      <div className={styles.avatar}>{avatar}</div>
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>
          <Moment format="D MMM YYYY HH:mm">{additionalText}</Moment>
        </span>
      </div>
    </div>
  );
};
