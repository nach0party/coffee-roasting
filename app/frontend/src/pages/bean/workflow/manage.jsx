import { useEffect, useState, useImperativeHandle } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import api from "../../../api/coffee-roasting-api";

const gradeRange = {
  MIN: 0,
  MAX: 100,
};

const availableProcessing = ["washed", "natural", "honey"];

/**
 * TODO This is really the new management component...
 * @param {*} param0
 */
export const ManageBean = ({ beanId, setDisableNextStep, ref }) => {
  const [name, setName] = useState();
  const [grade, setGrade] = useState();
  const [processing, setProcessing] = useState(availableProcessing[0]);
  const [errors, setErrors] = useState({});

  const getAndSetBean = async () => {
    const response = await api.beans.get(beanId);
    setName(response.data.name || "");
    setGrade(response.data.sca_grade || "");
    setProcessing(response.data.processing);
  };

  useEffect(() => {
    const reloadData = async () => {
      if (beanId) {
        await getAndSetBean();
      }
    };
    reloadData();
  }, [beanId]);

  const handleNameChange = (newValue) => {
    setName(newValue);
  };

  useImperativeHandle(ref, () => ({
    executeChildLogic: async () => {
      try {
        const response = await api.beans.create({
          name: name,
          sca_grade: grade,
          processing: processing,
        });
        return {
          beanData: { ...response.data },
        };
      } catch (error) {
        return error;
      }
    },
  }));

  const handleGradeChange = (newValue) => {
    setGrade();
    setErrors({ grade: [] });

    if (isNaN(newValue)) {
      setErrors({
        grade: [`Grade must be a number.`],
      });
      setDisableNextStep(true);
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
      setDisableNextStep(true);
      return;
    }
    if (newValue > gradeRange.MAX) {
      setErrors({
        grade: [
          `Grade is higher than the minimum allowed value of ${gradeRange.MAX}`,
        ],
      });
      setDisableNextStep(true);
      return;
    }
    setDisableNextStep(false);
    setGrade(newValue);
  };

  console.log(grade, "grade");

  const hasErrors = (fieldName) => {
    if (errors[fieldName] && errors[fieldName].length > 0) {
      return true;
    }
    return false;
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
      </Grid>
    </Grid>
  );
};
