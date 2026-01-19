import { useEffect, useState } from 'react';

import { Box, Button, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import Slider from '@mui/material/Slider';
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
  const [flavorProfiles, setFlavorProfiles] = useState();
  const [flavors, setFlavors] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      await retrieveRoastProfileFlavors();
      await retrieveFlavors();
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

  // only create a profile once the user starts filling out some of the data / information
  return (
    <Grid container>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
        <TextField
          select
          label="Roast Level"
          value={level}
          onChange={(event) => {
            setLevel(event.target.value);
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
        <Button
          variant="contained"
          onClick={() => {
            setOpenFlavorModal(true);
          }}
        >
          Assign Flavor Profile
        </Button>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
        <CoffeeCuppingRadar />
      </Grid>
      {/** TODO pull out the flavorProfiles... */}
      <CoffeRoastingModal
        open={openFlavorModal}
        setOpen={setOpenFlavorModal}
        content={
          <>
            {flavorProfiles ? (
              <>
                {flavorProfiles.map((flavorProfile) => (
                  <Grid container key={flavorProfile.id} alignItems="center">
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
                            await updateRoastProfileFlavor(flavorProfile.id, {
                              roast_flavor: selectedFlavorId,
                            });
                            await retrieveRoastProfileFlavors();
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
                            updateRoastProfileFlavor={updateRoastProfileFlavor}
                            retrieveRoastProfileFlavors={
                              retrieveRoastProfileFlavors
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
  );
};
