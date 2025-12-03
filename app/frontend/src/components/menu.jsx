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
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CoffeRoastingModal from "./modal";
import Typography from "@mui/material/Typography";

/**
 * This is more or less the default component that should be the main wrapper component.
 * Provides menu functionality and the base of the app in general for navigating around.
 * Can be not used if decided for a bit of flexibility per component.
 *
 * You can query / pass in hasActiveRoasts to prevent start roast (where applicable) from triggering
 * a new roast if needed.
 *
 * TODO there might be a better way to handle that but in the meantime this should be fine.
 * TODO handle this differently in a phone vs web app.
 * TODO change this to be CoffeeRoastingAppWrapper and change the menu to be its own component (but still include it)
 */
export const CoffeeRoastingMenu = ({ children, hasActiveRoasts = false }) => {
  let navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [openRoastWarningModal, setOpenRoastWarningModal] = useState(false);

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
    if (hasActiveRoasts) {
      setOpenRoastWarningModal(true);
      return;
    }
    navigate("/bean/select");
  };

  return (
    <Grid>
      <Fragment key={"anchor"}>
        <Button
          onClick={(e) => {
            toggleDrawer(e, true);
          }}
          // Position the button absolutely within the viewport
          sx={{
            // top: 20, // 16px from the top
            // left: 20, // 16px from the left
            borderRadius: 1, // Optional: make it a square button
            marginTop: 2,
            marginLeft: 2,
            marginBottom: 2,
            boxShadow: 3,
            height: 40,
            width: 40,
            paddingRight: 5,
            paddingLeft: 5,
          }}
          aria-label="open drawer"
          startIcon={<MenuIcon />}
        >
          Menu
        </Button>
        <Drawer
          anchor={"left"}
          open={openMenu}
          onClose={(e) => {
            toggleDrawer(e);
          }}
        >
          <Box
            sx={{
              width: 300,
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
        </Drawer>
      </Fragment>
      <Grid sx={{ padding: "10px" }}>{children}</Grid>
      <CoffeRoastingModal
        open={openRoastWarningModal}
        setOpen={setOpenRoastWarningModal}
        title="Active Roast: Warning"
        content={
          <>
            <Typography gutterBottom>
              You have active roasts, are you sure you would like to proceed and
              start another roast?
            </Typography>
          </>
        }
        actions={
          <>
            <Button
              autoFocus
              onClick={() => {
                setOpenRoastWarningModal(false);
              }}
            >
              Close
            </Button>
            <Button
              autoFocus
              onClick={() => {
                setOpenRoastWarningModal(false);
                navigate("/bean/select");
              }}
            >
              Continue
            </Button>
          </>
        }
      />
    </Grid>
  );
};
