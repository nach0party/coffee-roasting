import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

/**
 * This is more or less the default component that should be the main wrapper component.
 * Provides menu functionality and the base of the app in general for navigating around.
 * Can be not used if decided for a bit of flexibility per component.
 *
 * TODO handle this differently in a phone vs web app.
 * TODO change this to be CoffeeRoastingAppWrapper and change the menu to be its own component (but still include it)
 */
export const CoffeeRoastingMenu = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  // const [state, setState] = useState({ left: false });

  const toggleDrawer = (event, shouldOpen = false) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenMenu(shouldOpen);
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
        <Drawer
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
              {["Inbox", "Starred", "Send email", "Drafts"].map(
                (text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
            <Divider />
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Fragment>
    </Grid>
  );
  // let navigate = useNavigate();
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const startRoast = () => {
  //   navigate("/bean/select");
  // };

  // const goToDashboard = () => {
  //   navigate("/");
  // };

  // return (
  //   <Grid>
  //     <Grid>{children}</Grid>
  //     <div>
  //       <Button
  //         id="basic-button"
  //         aria-controls={open ? "basic-menu" : undefined}
  //         aria-haspopup="true"
  //         aria-expanded={open ? "true" : undefined}
  //         onClick={handleClick}
  //       >
  //         Menu
  //       </Button>
  //       <Menu
  //         id="basic-menu"
  //         anchorEl={anchorEl}
  //         open={open}
  //         onClose={handleClose}
  //         slotProps={{
  //           list: {
  //             "aria-labelledby": "basic-button",
  //           },
  //         }}
  //       >
  //         <MenuItem onClick={startRoast}>Start Roast</MenuItem>
  //         <MenuItem onClick={goToDashboard}>Dashboard</MenuItem>
  //       </Menu>
  //     </div>
  //   </Grid>
  // );
};
