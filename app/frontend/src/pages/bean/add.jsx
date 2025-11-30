import React, { useState, useEffect } from "react";
import { CoffeeRoastingMenu } from "../../components/menu";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import api from "../../api/coffee-roasting-api";

// TODO make the coffee roasting menu provide wrapper / padding / productionize the styling!
// TODO remove inline styling obviously...
export const AddBean = () => {
  // We could make this an endpoint so we can control it via api call instead...
  const availableProcessing = ["washed", "natural", "honey"];

  const [name, setName] = useState();
  const [grade, setGrade] = useState();
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(availableProcessing[0]);
  // TODO setup origin, separate component?
  // const [origin, setOrigin] = useState(); // TODO origin must (likely) be populated via dropdown or created on this page... for now?
  const [saving, setSaving] = useState(false);

  const gradeRange = {
    MIN: 0,
    MAX: 100,
  };

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

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await api.beans.create({
        name: name,
        sca_grade: grade,
        processing: processing,
      });
      console.log(response, "response");
    } finally {
      setSaving(false);
    }
  };

  const disableForm = () => {
    return !!saving;
  };

  return (
    <CoffeeRoastingMenu>
      <Grid sx={{ p: 5 }}>
        {/**
         * TODO somewhat of a code smell but I wonder if name isn't really a great implementation right now...
         */}
        <Grid>
          <TextField
            disabled={disableForm()}
            label="Name"
            onChange={(event) => {
              handleNameChange(event.target.value);
            }}
            helperText="Provide the name of the Bean"
          >
            {name}
          </TextField>
        </Grid>
        <Grid>
          <TextField
            disabled={disableForm()}
            error={hasErrors("grade")}
            label="Grade"
            defaultValue={70}
            onChange={(event) => {
              handleGradeChange(event.target.value);
            }}
            helperText={`Provide the grade of the bean, must be a number between ${gradeRange.MIN} and ${gradeRange.MAX}`}
          >
            {grade}
          </TextField>
        </Grid>
        <Grid>
          <TextField
            disabled={disableForm()}
            select
            label="Origin"
            defaultValue={availableProcessing[0]}
            helperText={`Provide the processing method`}
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
        <Grid>
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
    </CoffeeRoastingMenu>
  );
};
