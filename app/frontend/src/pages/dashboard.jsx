import React from "react";
import { CoffeeRoastingMenu } from "../components/menu";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const CoffeeRoastingDashboard = () => {
  return (
    <CoffeeRoastingMenu>
      <Grid>
        <Typography>Dashboard</Typography>
      </Grid>
    </CoffeeRoastingMenu>
  );
};
