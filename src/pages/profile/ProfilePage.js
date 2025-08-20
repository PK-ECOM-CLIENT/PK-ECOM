import React from "react";
import { AppLayOut } from "../../components/layout/AppLayOut";
import BackButton from "../../components/backbutton/BackButton";

const Profile = () => {
  return (
    <AppLayOut>
      <div className="-util-back_btn_wraper">
        <BackButton></BackButton>
      </div>
      <div>Profile</div>
    </AppLayOut>
  );
};

export default Profile;
