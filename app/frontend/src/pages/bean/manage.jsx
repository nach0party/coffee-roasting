import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import { CoffeeRoastingMenu } from "../../components/menu";
import api from "../../api/coffee-roasting-api";

// TODO make the coffee roasting menu provide wrapper / padding / productionize the styling!
// TODO remove inline styling obviously...
export const ManageBean = () => {
  let navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const availableProcessing = ["washed", "natural", "honey"]; // TCDO consider pulling from API
  const gradeRange = {
    MIN: 0,
    MAX: 100,
  };
  const [name, setName] = useState();
  const [grade, setGrade] = useState();
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(availableProcessing[0]);
  const [saving, setSaving] = useState(false);

  const getAndSetBean = useCallback(async () => {
    const response = await api.beans.get(id);
    setName(response.data.name);
    setGrade(response.data.sca_grade);
    setProcessing(response.data.processing);
  });

  useEffect(() => {
    const initialize = async () => {
      if (id) {
        await getAndSetBean();
      }
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
      navigate("/bean/select");
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
