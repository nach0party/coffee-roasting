import { Fragment, useState } from "react";
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
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";

import { CoffeRoastingModal } from "./modal";

/**
 * Main wrapper component for the app, including the header strip and menu.
 */
export const CoffeeRoastingMenu = ({
  title,
  rightSideMenuBar,
  children,
  hasActiveRoasts = false,
}) => {
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

  const goToDashboard = () => {
    navigate("/");
  };
  const goToRawCoffeeBeanLibrary = () => {
    navigate("/bean/library");
  };
  const startRoast = async () => {
    if (hasActiveRoasts) {
      setOpenRoastWarningModal(true);
      return;
    }
    navigate("/bean/select");
  };

  return (
    <Grid>
      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "64px",
          backgroundColor: theme.palette.background.paper,
          position: "sticky",
          top: 0,
          zIndex: 1100,
          padding: theme.spacing(0, 3),
          boxShadow: theme.shadows[1],
        })}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={(e) => toggleDrawer(e, true)}
            edge="start"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <WidgetsOutlinedIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            height: "100%",
            paddingY: 0,
            marginY: 0,
            "& > *": {
              marginTop: 0,
              marginBottom: 0,
            },
          }}
        >
          {rightSideMenuBar}
        </Box>
      </Box>
      <Fragment key={"anchor"}>
        <Drawer
          anchor={"left"}
          open={openMenu}
          onClose={(e) => toggleDrawer(e)}
        >
          <Box
            sx={{ width: 300 }}
            role="presentation"
            onClick={(e) => toggleDrawer(e)}
            onKeyDown={(e) => toggleDrawer(e)}
          >
            <List>
              <ListItem
                onClick={async () => {
                  await startRoast();
                }}
                key={"roast-menu"}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <LocalFireDepartmentIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Start Roast"} />
                </ListItemButton>
              </ListItem>
              <ListItem
                onClick={goToRawCoffeeBeanLibrary}
                key={"Raw Coffee Bean Library"}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <WhatshotOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Raw Coffee Bean Library"} />
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
            <List>
              <ListItem key={"settings"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Settings"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Fragment>
      <Grid sx={{ padding: "10px", marginTop: "10px" }}>{children}</Grid>
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
