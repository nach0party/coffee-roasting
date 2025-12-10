import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import api from "../../../api/coffee-roasting-api";

export const AssignOrigin = ({}) => {
  const [availableCountries, setAvailableCountries] = useState([]);
  const [country, setCountry] = useState();
  const [region, setRegion] = useState("");
  const [municipality, setMunicipality] = useState("");

  const getCountries = async () => {
    const response = await api.origins.countries();
    setAvailableCountries(response.data.results);
  };

  useEffect(() => {
    const initialize = async () => {
      await getCountries();
    };
    initialize();
  }, []);

  const handleRegionChange = (newValue) => {
    setRegion(newValue);
  };

  const handleMunicipalityChange = (newValue) => {
    setMunicipality(newValue);
  };

  return (
    <Grid
      sx={(theme) => ({
        border: 1,
        borderColor: theme.palette.background.paper,
        borderRadius: 1,
        p: 2,
      })}
    >
      <Grid container size={12} spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <TextField
            select
            label="Country Of Origin"
            defaultValue={""}
            helperText={`Provide the country the bean is from`}
            size="small"
            sx={{ width: "100%" }}
          >
            {availableCountries.map((country, index) => {
              console;
              return (
                <MenuItem
                  key={country}
                  value={country}
                  onClick={(event) => {
                    console.log(event, "event");
                  }}
                >
                  {country}
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <TextField
            label="Region"
            value={region}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            onChange={(event) => {
              handleRegionChange(event.target.value);
            }}
            helperText="Provide The Region Of the Bean"
            size="small"
            sx={{ width: "100%" }}
          >
            {name}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <TextField
            label="Municipality"
            value={municipality}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            onChange={(event) => {
              handleMunicipalityChange(event.target.value);
            }}
            helperText="Provide The Municipality Of The Bean"
            size="small"
            sx={{ width: "100%" }}
          >
            {name}
          </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
};
