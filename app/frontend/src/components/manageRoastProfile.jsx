import { useEffect, useState } from 'react';

import { Box, Button, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { RoastProfileFlavorSlider } from './roastProfileFlavorSlider';
import { CoffeRoastingModal } from './modal';
import { CoffeeCuppingRadar } from '../charts/cupping';
import api from '../api/coffee-roasting-api';

const RoastLevelChoices = {
  Light: 'light',
  Medium: 'medium',
  Dark: 'dark',
};

export const ManageRoastProfile = ({ profile, setProfile }) => {
  const [level, setLevel] = useState(profile.level || '');
  const [openFlavorModal, setOpenFlavorModal] = useState(false);
  const [flavorProfiles, setFlavorProfiles] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await retrieveRoastProfileFlavors();
      await retrieveFlavors();
      await getRoastProfileFlavorAnalytics();
      setLoading(false);
    };
    initialize();
  }, []);

  /** Flavors are generic one time created records */
  const retrieveFlavors = async () => {
    try {
      const response = await api.roastFlavors.list();
      setFlavors(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Flavor profiles are taking those generic 1
   * time created records and applying it to the roast.
   */
  const retrieveRoastProfileFlavors = async () => {
    try {
      const response = await api.roastProfileFlavors.list({
        profile: profile.id,
      });
      setFlavorProfiles(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRoastProfileFlavors = async (id) => {
    try {
      await api.roastProfileFlavors.delete(id);
    } catch (error) {
      console.error(error);
    }
  };

  const updateRoastProfileFlavor = async (id, data) => {
    try {
      await api.roastProfileFlavors.partialUpdate(id, data);
    } catch (error) {
      console.error(error);
    }
  };

  const createRoastProfileFlavor = async () => {
    try {
      await api.roastProfileFlavors.create({ roast_profile: profile.id });
    } catch (error) {
      console.error(error);
    }
  };

  const updateRoastProfile = async (id, data) => {
    try {
      await api.roastProfiles.partialUpdate(id, data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRoastProfileFlavorAnalytics = async () => {
    try {
      const response = await api.roastProfileFlavors.getAnalytics({
        profile: profile.id,
      });
      setAnalyticsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(analyticsData, 'analyticsData');

  return (
    <>
      {!loading && (
        <Grid container>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ p: 1 }}>
            <TextField
              fullWidth
              select
              label="Roast Level"
              value={level}
              onChange={async (event) => {
                setLevel(event.target.value);
                await updateRoastProfile(profile.id, {
                  level: event.target.value,
                });
              }}
              helperText="What roast level did the roast reach?"
            >
              {Object.entries(RoastLevelChoices).map(
                ([friendlyValue, storedValue]) => {
                  return (
                    <MenuItem key={friendlyValue} value={storedValue}>
                      {friendlyValue}
                    </MenuItem>
                  );
                },
              )}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ p: 1 }}>
            <Button
              sx={{ mt: 2 }}
              fullWidth
              variant="contained"
              onClick={async () => {
                setOpenFlavorModal(true);
              }}
            >
              Assign Flavor Profile
            </Button>
          </Grid>
          {analyticsData && (
            <Grid
              size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
              sx={{ mt: 2 }}
            >
              <CoffeeCuppingRadar data={analyticsData} />
            </Grid>
          )}
          <CoffeRoastingModal
            open={openFlavorModal}
            setOpen={setOpenFlavorModal}
            content={
              <>
                {flavorProfiles ? (
                  <>
                    {flavorProfiles.map((flavorProfile) => (
                      <Grid
                        container
                        key={flavorProfile.id}
                        alignItems="center"
                      >
                        <Grid size={{ xs: 10, sm: 11 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 1,
                            }}
                          >
                            <TextField
                              select
                              fullWidth
                              label="Flavor Name"
                              variant="outlined"
                              size="small"
                              value={flavorProfile.roast_flavor?.id || ''}
                              onChange={async (event) => {
                                const selectedFlavorId = event.target.value;
                                await updateRoastProfileFlavor(
                                  flavorProfile.id,
                                  {
                                    roast_flavor: selectedFlavorId,
                                  },
                                );
                                await retrieveRoastProfileFlavors();
                                await getRoastProfileFlavorAnalytics();
                              }}
                            >
                              {flavors.map((flavor) => (
                                <MenuItem key={flavor.id} value={flavor.id}>
                                  {flavor.name}
                                </MenuItem>
                              ))}
                            </TextField>
                            <Box sx={{ px: 1 }}>
                              <RoastProfileFlavorSlider
                                flavorProfile={flavorProfile}
                                updateRoastProfileFlavor={
                                  updateRoastProfileFlavor
                                }
                                retrieveRoastProfileFlavors={
                                  retrieveRoastProfileFlavors
                                }
                                getRoastProfileFlavorAnalytics={
                                  getRoastProfileFlavorAnalytics
                                }
                              />
                            </Box>
                          </Box>
                        </Grid>
                        <Grid
                          size={{ xs: 2, sm: 1 }}
                          sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <IconButton
                            color="error"
                            onClick={async () => {
                              await deleteRoastProfileFlavors(flavorProfile.id);
                              await retrieveRoastProfileFlavors();
                              await getRoastProfileFlavorAnalytics();
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </>
                ) : (
                  <Grid>Loading data...</Grid>
                )}
              </>
            }
            title="Assign flavor profiles"
            actions={
              <Button
                onClick={async () => {
                  await createRoastProfileFlavor();
                  await retrieveRoastProfileFlavors();
                }}
                startIcon={<AddIcon />}
              >
                Add a Flavor Profile
              </Button>
            }
          />
        </Grid>
      )}
    </>
  );
};
