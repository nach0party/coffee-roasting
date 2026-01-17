import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import api from '../api/coffee-roasting-api';

const RoastLevelChoices = {
  Light: 'light',
  Medium: 'medium',
  Dark: 'dark',
};

// TODO maybe we could just pass the roast profile object
// TODO ask the user if they want to generate a roast profile or not?
export const ManageRoastProfile = ({ profile, setProfile }) => {
  const [level, setLevel] = useState(profile.level || '');

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
    <Grid>
      <TextField
        select
        label="Roast Level"
        value={level}
        onChange={(event) => {
          setLevel(event.target.value);
        }}
        helperText="What roast level would you consider this roast to be?"
      >
        {Object.entries(RoastLevelChoices).map(
          ([friendlyValue, storedValue]) => {
            return (
              <MenuItem key={friendlyValue} value={storedValue}>
                {friendlyValue}
              </MenuItem>
            );
          }
        )}
      </TextField>
      {/** TODO manage flavors in modal... */}
      <TextField label="Flavor profile"></TextField>
    </Grid>
  );
};
