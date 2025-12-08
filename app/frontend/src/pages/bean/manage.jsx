import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import api from "../../api/coffee-roasting-api";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

/**
 * Does all CRUD on behalf of a bean.  If an ID is provided we go into maintenance
 * mode for the component where we update and / or offer deletion if needed.
 *
 * @param {*} param0
 * @returns
 */
export const ManageBean = ({ id, setId }) => {
  console.log(id, "id");
  const availableProcessing = ["washed", "natural", "honey"]; // TODO consider pulling from API
  const [availableCountries, setAvailableCountries] = useState([]);
  const gradeRange = {
    MIN: 0,
    MAX: 100,
  };
  // Controls the Bean object fields that are savable
  const [name, setName] = useState();
  const [grade, setGrade] = useState();
  const [errors, setErrors] = useState({});

  // Controls the Origin object fields that are savable
  const [originId, setOriginId] = useState();
  const [country, setCountry] = useState();
  const [region, setRegion] = useState("");
  const [municipality, setMunicipality] = useState("");

  // Flow / state
  const [processing, setProcessing] = useState(availableProcessing[0]);
  const [saving, setSaving] = useState(false);

  const getAndSetBeanAndOrigin = async () => {
    const response = await api.beans.get(id);
    setName(response.data.name || "");
    setGrade(response.data.sca_grade || "");
    setProcessing(response.data.processing);
    if (response.data.origin) {
      setOriginId(response.data.origin.id);
      setRegion(response.data.origin.region);
      setMunicipality(response.data.origin.municipality);
    }
  };

  console.log(originId, "originId");

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

  useEffect(() => {
    const reloadData = async () => {
      if (id) {
        await getAndSetBeanAndOrigin();
      }
    };
    reloadData();
  }, [id]);

  const handleNameChange = (newValue) => {
    setName(newValue);
  };

  const handleRegionChange = (newValue) => {
    setRegion(newValue);
  };

  const handleMunicipalityChange = (newValue) => {
    setMunicipality(newValue);
  };

  // TODO make sure grade if left blank is technically null / undefined
  const handleGradeChange = (newValue) => {
    // reset
    setGrade();
    setErrors({ grade: [] });

    if (isNaN(newValue)) {
      setErrors({
        grade: [`Grade must be a number.`],
      });
      return;
    }

    // for whatever reason textfield turns no value back into empty string
    if (newValue.length === 0) {
      return;
    }

    newValue = Number(newValue);
    if (newValue < gradeRange.MIN) {
      setErrors({
        grade: [
          `Grade is lower than the minimum allowed value of ${gradeRange.MIN}`,
        ],
      });
      return;
    }
    if (newValue > gradeRange.MAX) {
      setErrors({
        grade: [
          `Grade is higher than the minimum allowed value of ${gradeRange.MAX}`,
        ],
      });
      return;
    }
    setGrade(newValue);
  };

  const hasErrors = (fieldName) => {
    if (errors[fieldName] && errors[fieldName].length > 0) {
      return true;
    }
    return false;
  };

  /**
   * If we have the id, create a new one, if not, then we're updating...
   */
  const handleSave = async () => {
    try {
      setSaving(true);

      const beanPayload = {
        name: name,
        sca_grade: grade || null,
        processing: processing,
      };

      if (id) {
        // TODO we should track to make sure we're not making extra origins, but, this should work for now
        // TODO functionalize the origin code
        // TODO consider encapsulating the origin code...
        const response = await api.beans.partialUpdate(id, beanPayload);
        let originId = response.data.origin;
        if (country || region || municipality) {
          const originPayload = {
            country: country,
            region: region,
            municipality: municipality,
          };
          if (!originId) {
            await api.origins.create(originPayload);
          } else {
            await api.origins.partialUpdatei(originId, originPayload);
          }
        }
      } else {
        await api.beans.create(beanPayload);
      }
    } finally {
      setSaving(false);
    }
  };

  const disableForm = () => {
    return !!saving;
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
      <Typography sx={{ mb: 2, ml: 1 }}>Bean</Typography>
      <Grid container size={12} spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <TextField
            disabled={disableForm()}
            label="Name"
            value={name}
            // FIXME so when the data gets loaded in it automatically moves
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            onChange={(event) => {
              handleNameChange(event.target.value);
            }}
            helperText="Provide the name of the Bean"
            size="small"
            sx={{ width: "100%" }}
          >
            {name}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <TextField
            disabled={disableForm()}
            error={hasErrors("grade")}
            label="Grade"
            value={grade}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            onChange={(event) => {
              handleGradeChange(event.target.value);
            }}
            helperText={`Provide the grade of the bean, must be a number between ${gradeRange.MIN} and ${gradeRange.MAX}`}
            size="small"
            sx={{ width: "100%" }}
          >
            {grade}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <TextField
            disabled={disableForm()}
            select
            label="Processing"
            defaultValue={availableProcessing[0]}
            helperText={`Provide the processing method`}
            size="small"
            sx={{ width: "100%" }}
          >
            {availableProcessing.map((process, index) => {
              return (
                <MenuItem
                  key={index}
                  value={process}
                  onClick={(event) => {
                    setProcessing(process);
                  }}
                >
                  {process}
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <Divider />
          <Typography sx={{ mt: 2 }}>Origin</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <TextField
            disabled={disableForm()}
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
            disabled={disableForm()}
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
            disabled={disableForm()}
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
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <Button
            disabled={disableForm()}
            onClick={async () => {
              await handleSave();
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
