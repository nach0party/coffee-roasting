import React, { useCallback, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CoffeeRoastingMenu } from "../../components/menu";
import api from "../../api/coffee-roasting-api";
import "./dashboard.css";
import LinearProgress from "@mui/material/LinearProgress";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";

export function CoffeeRoastingDashboard() {
  const [activeRoasts, setActiveRoasts] = useState([]);

  // TODO consider moving this into context, or simplifying
  // the concept of checking for "an active roast"
  const checkForActiveRoasts = useCallback(async () => {
    const response = await api.roasts.list({ has_begun: true });
    console.log(response, "response");
    setActiveRoasts(response.data.results);
  });

  useEffect(() => {
    const initialize = async () => {
      checkForActiveRoasts();
    };
    initialize();
  }, []);

  console.log(activeRoasts, "activeRoasts");

  // Dummy data for active and completed roasts
  const roastEvents = [
    {
      id: 1,
      bean: "Ethiopia Yirgacheffe",
      status: "active",
      temp: "405°F",
      time: "12:30",
      progress: 85,
    },
    {
      id: 2,
      bean: "Guatemala Huehuetenango",
      status: "active",
      temp: "250°F",
      time: "05:45",
      progress: 30,
    },
    {
      id: 3,
      bean: "Colombia Supremo",
      status: "completed",
      temp: "415°F",
      time: "15:00",
      progress: 100,
    },
  ];

  // TODO remove all the inline styling...
  return (
    <CoffeeRoastingMenu>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Active Roasting Events: ({activeRoasts.length})
        </Typography>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {activeRoasts.map((roast) => (
            <Grid key={roast.id}>
              <ActiveRoastCard roast={roast} />
            </Grid>
          ))}
        </Grid>

        {/* <Typography variant="h4" gutterBottom>
          Completed Roasts ({completedRoasts.length})
        </Typography>
        <Grid container spacing={3}>
          {completedRoasts.map((roast) => (
            <Grid item xs={12} sm={6} md={4} key={roast.id}>
              <ActiveRoastCard roast={roast} />
            </Grid>
          ))}
        </Grid> */}
      </Box>
    </CoffeeRoastingMenu>
  );
}

const ActiveRoastCard = ({ roast }) => {
  const isActive = true;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        // Apply conditional styling for the glow effect
        ...(isActive && {
          // Use the class defined in the CSS file
          "&.MuiCard-root": {
            // You need a way to integrate the CSS class,
            // here we manually apply a high-contrast border and background for the active state
            // The actual glow class should be applied via className="active-roast-card"
          },
        }),
        // Basic styling
        border: isActive ? "2px solid orange" : "1px solid #ddd",
      }}
      // Apply the CSS class for the animation
      className={isActive ? "active-roast-card" : ""}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height={140}
          image="/public/coffee-being-roasted.jpg"
        />
      </CardActionArea>
      <CardContent>
        <Typography variant="h6" component="div">
          {roast.bean}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          Status: {isActive ? "In Progress" : "Completed"}
        </Typography>

        {isActive && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="primary">
              Current Temp: {roast.temp} | Time Elapsed: {roast.time}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={roast.progress}
              color="warning"
              sx={{ height: 10, borderRadius: 5, mt: 1 }}
            />
            <Typography variant="body2" align="right">
              {roast.progress}%
            </Typography>
          </Box>
        )}

        {!isActive && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Final Temp: {roast.temp} | Total Time: {roast.time}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
