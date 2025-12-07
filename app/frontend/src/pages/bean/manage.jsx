import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import api from "../../api/coffee-roasting-api";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export const ManageBean = ({ id }) => {
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
  const [region, setRegion] = useState("");
  const [municipality, setMunicipality] = useState("");
  // Flow / state
  const [processing, setProcessing] = useState(availableProcessing[0]);
  const [saving, setSaving] = useState(false);

  const getAndSetBean = async () => {
    const response = await api.beans.get(id);
    setName(response.data.name);
    setGrade(response.data.sca_grade);
    setProcessing(response.data.processing);
  };

  const getCountries = async () => {
    const response = await api.origins.countries();
    setAvailableCountries(response.data.results);
  };

  useEffect(() => {
    const initialize = async () => {
      if (id) {
        await getAndSetBean();
      }
      await getCountries();
    };
    initialize();
  }, []);

  const handleNameChange = (newValue) => {
    setName(newValue);
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
      const response = await api.beans.create({
        name: name,
        sca_grade: grade,
        processing: processing,
      });
      // navigate("/bean/select");
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
            defaultValue={70}
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
            label="Name"
            value={name}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            onChange={(event) => {
              handleNameChange(event.target.value);
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
            label="Name"
            value={name}
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
