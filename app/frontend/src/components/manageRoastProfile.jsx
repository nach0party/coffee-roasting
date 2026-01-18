import { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

import { CoffeRoastingModal } from './modal';
import { CoffeeCuppingRadar } from '../charts/cupping';
import api from '../api/coffee-roasting-api';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const RoastLevelChoices = {
  Light: 'light',
  Medium: 'medium',
  Dark: 'dark',
};

// TODO maybe we could just pass the roast profile object
// TODO ask the user if they want to generate a roast profile or not?
export const ManageRoastProfile = ({ profile, setProfile }) => {
  const [level, setLevel] = useState(profile.level || '');
  const [openFlavorModal, setOpenFlavorModal] = useState(false);
  const [openFlavorManagementModal, setOpenFlavorManagementModal] =
    useState(false);
  const [flavors, setFlavors] = useState();

  useEffect(() => {
    const initialize = async () => {
      await retrieveRoastProfileFlavors();
    };
    initialize();
  }, []);

  const retrieveRoastProfileFlavors = async () => {
    try {
      const response = await api.roastProfileFlavors.list({
        profile: profile.id,
      });
      setFlavors(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const saveRoastProfile = async () => {
    try {
      const response = await api.roastProfiles.partialUpdate(profile.id, {
        level: profile.level,
      });
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
      {/** TODO pull out the flavors... */}
      <CoffeRoastingModal
        open={openFlavorModal}
        setOpen={setOpenFlavorModal}
        content={
          <>
            {flavors ? (
              <Grid>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Flavor</TableCell>
                      <TableCell>Scale [0-100]</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {flavors.map((flavor) => {
                        console.log(flavor);
                        return <TableCell>placeholder</TableCell>;
                      })}
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            ) : (
              <div>Loading data...</div>
            )}
          </>
        }
        title="Assign flavors to this roast"
        actions={
          <Grid>
            <Button
              onClick={async () => {
                setOpenFlavorManagementModal(true);
              }}
            >
              Add flavor profile
            </Button>
          </Grid>
        }
      />
      {/** TODO set it up... */}
      <CoffeRoastingModal
        open={openFlavorManagementModal}
        setOpen={setOpenFlavorManagementModal}
        content={<div>test</div>}
      />
    </Grid>
  );
};
