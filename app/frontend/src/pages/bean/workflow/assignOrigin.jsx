import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import api from "../../../api/coffee-roasting-api";

export const AssignOrigin = ({ beanId }) => {
  const [availableCountries, setAvailableCountries] = useState([]);
  const [country, setCountry] = useState("United States");
  const [region, setRegion] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [loading, setLoading] = useState(true);

  const getCountries = async () => {
    const response = await api.origins.countries();
    setAvailableCountries(response.data.results);
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await getCountries();
      setLoading(false);
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
      {!loading && (
        <Grid container size={12} spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <TextField
              select
              label="Country Of Origin"
              value={country}
              defaultValue={availableCountries[0]}
              helperText={`Provide the country the bean is from`}
              size="small"
              sx={{ width: "100%" }}
            >
              {availableCountries.map((availbleCountry) => {
                return (
                  <MenuItem
                    key={availbleCountry}
                    value={availbleCountry}
                    onClick={() => {
                      setCountry(availbleCountry);
                    }}
                  >
                    {availbleCountry}
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
      )}
    </Grid>
  );
};
