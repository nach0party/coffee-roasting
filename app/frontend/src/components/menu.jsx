import React, { useState } from "react";
import { useNavigate } from "react-router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

/**
 * This is more or less the default component that should be the main wrapper component.
 * Provides menu functionality and the base of the app in general for navigating around.
 * Can be not used if decided for a bit of flexibility per component.
 *
 * TODO handle this differently in a phone vs web app.
 */
export const CoffeeRoastingMenu = ({ children }) => {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const startRoast = () => {
    navigate("/roasting");
  };

  return (
    <Grid>
      <Grid>{children}</Grid>
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
        >
          <MenuItem onClick={startRoast}>Start Roast</MenuItem>
        </Menu>
      </div>
    </Grid>
  );
};
