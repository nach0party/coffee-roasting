import { useState, useEffect } from "react";
import api from "../api/coffee-roasting-api";

export const ManageRoastProfile = ({ roastId }) => {
  console.log(roastId, "roastId");

  const getRoastProfile = async () => {
    await api.roastProfiles.list({ roast: roastId });
  };

  useEffect(() => {
    const initialize = async () => {
      await getRoastProfile();
    };
    initialize();
  }, []);

  // only create a profile once the user starts filling out some of the data / information
  return <div>test</div>;
};
