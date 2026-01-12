import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const gradeRange = {
  MIN: 0,
  MAX: 100,
};

const availableProcessing = ["washed", "natural", "honey"];

export const ManageBean = ({ bean, setBean, setDisableManageBeanNextStep }) => {
  const [errors, setErrors] = useState({});
  const [name, setName] = useState(bean?.name || "");
  const [scaGrade, setScaGrade] = useState(bean?.sca_grade || null);
  const [processing, setProcessing] = useState(
    bean?.processing || availableProcessing[0]
  );

  useEffect(() => {
    if (!bean?.processing) {
      bean.processing = processing;
      setBean(bean);
    }
  }, [bean?.id]);

  const handleGradeChange = (newValue) => {
    setScaGrade(null);
    setErrors({ grade: [] });

    if (isNaN(newValue)) {
      setErrors({
        grade: [`Grade must be a number.`],
      });
      setDisableManageBeanNextStep(true);
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
      setDisableManageBeanNextStep(true);
      return;
    }
    if (newValue > gradeRange.MAX) {
      setErrors({
        grade: [
          `Grade is higher than the minimum allowed value of ${gradeRange.MAX}`,
        ],
      });
      setDisableManageBeanNextStep(true);
      return;
    }
    setDisableManageBeanNextStep(false);

    bean.sca_grade = newValue;
    scaGrade(newValue);
    setBean(bean);
  };

  const hasErrors = (fieldName) => {
    if (errors[fieldName] && errors[fieldName].length > 0) {
      return true;
    }
    return false;
  };

  console.log(processing, "processing");
  console.log(bean, "bean");

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
            onBlur={async () => {
              await updateAndSetBean();
            }}
            onChange={(event) => {
              setName(event.target.value);
              bean.name = event.target.value;
              setBean(bean);
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
            value={scaGrade}
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
            {scaGrade}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <TextField
            select
            label="Processing"
            value={processing}
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
                    bean.processing = process;
                    setBean(bean);
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
