import React, { useEffect, useState, useCallback } from "react";
import { CoffeeRoastingMenu } from "../components/menu";
import Grid from "@mui/material/Grid";
import api from "../api/coffee-roasting-api";
/**
 * Component for starting a new roast, more or less the majority of the apps functionality
 * is going to be in here as this is the main purpose of it all.
 */
export const CoffeeRoasting = () => {
  const [existingBeans, setExistingBeans] = useState([]);

  const getBeans = useCallback(async () => {
    const response = await api.beans.list();
    console.log(response, "response");
    console.log("retrieving the beans");
  });

  useEffect(() => {
    const initialize = async () => {
      await getBeans();
    };

    initialize();
  }, []);

  return (
    <CoffeeRoastingMenu>
      <Grid>Choose Bean</Grid>
    </CoffeeRoastingMenu>
  );
};
