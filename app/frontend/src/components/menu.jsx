import React, { Fragment, useState } from "react";

import { useNavigate } from "react-router";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

/**
 * This is more or less the default component that should be the main wrapper component.
 * Provides menu functionality and the base of the app in general for navigating around.
 * Can be not used if decided for a bit of flexibility per component.
 *
 * TODO handle this differently in a phone vs web app.
 * TODO change this to be CoffeeRoastingAppWrapper and change the menu to be its own component (but still include it)
 */
export const CoffeeRoastingMenu = ({ children }) => {
  let navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const toggleDrawer = (event, shouldOpen = false) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenMenu(shouldOpen);
  };

  // TODO it wouldn't hurt to maybe write something that maps routes
  // to the actual routes and some functions to
  const goToDashboard = () => {
    navigate("/");
  };

  const startRoast = () => {
    navigate("/bean/select");
  };

  return (
    <Grid>
      <Fragment key={"anchor"}>
        <Button
          onClick={(e) => {
            toggleDrawer(e, true);
          }}
        >
          Open Menu
        </Button>
        <SwipeableDrawer
          anchor={"left"}
          open={openMenu}
          onClose={(e) => {
            toggleDrawer(e);
          }}
        >
          <Box
            sx={{
              width: "left" === "top" || "left" === "bottom" ? "auto" : 250,
            }}
            role="presentation"
            onClick={(e) => {
              toggleDrawer(e);
            }}
            onKeyDown={() => {
              toggleDrawer(e);
            }}
          >
            <List>
              <ListItem onClick={startRoast} key={"roast-menu"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LocalFireDepartmentIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Start Roast"} />
                </ListItemButton>
              </ListItem>
              <ListItem onClick={goToDashboard} key={"Beans"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <WhatshotOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Beans"} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                onClick={goToDashboard}
                key={"dashboard"}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <LocalFireDepartmentIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </SwipeableDrawer>
      </Fragment>
      <Grid sx={{ padding: "10px" }}>{children}</Grid>
    </Grid>
  );
};
