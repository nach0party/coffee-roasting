import { useState } from 'react';
import { Slider } from '@mui/material';

export const RoastProfileFlavorSlider = ({
  flavorProfile,
  updateRoastProfileFlavor,
  retrieveRoastProfileFlavors,
  getRoastProfileFlavorAnalytics,
}) => {
  const [value, setValue] = useState(flavorProfile?.scale || 50);

  return (
    <Slider
      value={value}
      valueLabelDisplay="auto"
      min={0}
      max={100}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      onChangeCommitted={async (event, newValue) => {
        await updateRoastProfileFlavor(flavorProfile.id, {
          scale: newValue,
        });
        await retrieveRoastProfileFlavors();
        await getRoastProfileFlavorAnalytics();
      }}
    />
  );
};
