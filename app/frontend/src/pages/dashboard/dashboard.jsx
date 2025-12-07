import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { CoffeeRoastingMenu } from "../../components/menu";
import { ActiveRoastCard } from "../../components/activeRoastCard/activeRoastCard";
import { CompletedRoastCard } from "../../components/completedRoastCard";
import { PendingRoastCard } from "../../components/pendingRoastCard/pendingRoastCard";

import api from "../../api/coffee-roasting-api";

export function CoffeeRoastingDashboard() {
  const [activeRoasts, setActiveRoasts] = useState([]);
  const [completedRoasts, setCompletedRoasts] = useState([]);
  const [pendingRoasts, setPendingRoasts] = useState([]);

  // TODO 2 api calls to the same endpoint isnt' ideal, however, we do have 2 separate
  // concepts and want a total count
  // TODO leverage the api count to know the complete amount of total active / completed
  // TODO consider moving this into context, or simplifying
  // the concept of checking for "an active roast"
  const checkForActiveRoasts = async () => {
    const response = await api.roasts.list({ started: true, ended: false });
    setActiveRoasts(response.data.results);
  };

  const checkForCompletedRoasts = async () => {
    const response = await api.roasts.list({ started: true, ended: true });
    setCompletedRoasts(response.data.results);
  };

  /**
   * User started a roast, we created a record, but technically
   * speaking they didn't actually "start" it.  We want to use this
   * to avoid "clogging" up the app with unstarted roasts.
   */
  const checkForPendingRoasts = async () => {
    const response = await api.roasts.list({ started: false, ended: false });
    setPendingRoasts(response.data.results);
  };

  useEffect(() => {
    const initialize = async () => {
      checkForActiveRoasts();
      checkForCompletedRoasts();
      checkForPendingRoasts();
    };
    initialize();
  }, []);

  // TODO remove all the inline styling...
  return (
    <CoffeeRoastingMenu
      title="Dashboard"
      hasActiveRoasts={activeRoasts.length + pendingRoasts.length > 0}
    >
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Pending Roasts: ({pendingRoasts.length})
        </Typography>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {pendingRoasts.map((roast) => (
            <Grid key={roast.id}>
              <PendingRoastCard roast={roast} />
            </Grid>
          ))}
        </Grid>

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

        <Typography variant="h4" gutterBottom>
          Completed Roasts ({completedRoasts.length})
        </Typography>
        <Grid container spacing={3}>
          {completedRoasts.map((roast) => (
            <Grid key={roast.id}>
              <CompletedRoastCard roast={roast} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </CoffeeRoastingMenu>
  );
}
