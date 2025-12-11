import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from "../../api/coffee-roasting-api";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { BeanWorkflow } from "./workflow/workflow";

const generateDefaultBeanState = () => {
  return {
    name: "",
    sca_grade: "",
    processing: "",
    origin: { country: "", municipality: "", region: "" },
  };
};

/**
 * Provides a view / display of a configurable bean.  Does not handle configuration but
 * just all the properties of what we consider to be a bean.
 * @param {*} param0
 * @returns
 */
export const ViewBean = ({ beanId, setBeanId, getBeans }) => {
  const [beanData, setBeanData] = useState(generateDefaultBeanState());
  const [openBeanModal, setOpenBeanModal] = useState(false);

  const getAndSetBeanAndOrigin = async () => {
    const response = await api.beans.get(beanId);
    setBeanData(response.data);
  };

  useEffect(() => {
    const reloadData = async () => {
      if (beanId) {
        await getAndSetBeanAndOrigin();
      }
    };
    reloadData();
  }, [beanId, openBeanModal]);

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
            label="Name"
            value={beanData.name}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                readOnly: true,
              },
            }}
            helperText="The name used to identify the bean"
            size="small"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <TextField
            label="Grade"
            value={beanData.sca_grade}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                readOnly: true,
              },
            }}
            helperText={`The SCA grade of the bean.`}
            size="small"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <TextField
            value={beanData.processing}
            label="Processing"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                readOnly: true,
              },
            }}
            helperText={`The processing method`}
            size="small"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <Divider />
          <Typography sx={{ mt: 2 }}>Origin</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <TextField
            value={beanData.origin?.country}
            label="Country Of Origin"
            helperText={`Provide the country the bean is from`}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                readOnly: true,
              },
            }}
            size="small"
            sx={{ width: "100%" }}
          >
            {beanData.origin?.country}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <TextField
            label="Region"
            value={beanData.origin?.region}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                readOnly: true,
              },
            }}
            helperText="Provide The Region Of the Bean"
            size="small"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <TextField
            label="Municipality"
            value={beanData.origin?.municipality}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              input: {
                readOnly: true,
              },
            }}
            helperText="Provide The Municipality Of The Bean"
            size="small"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <Button
            onClick={() => {
              console.log("seriously?");
              setBeanId();
              setBeanData(generateDefaultBeanState());
              setOpenBeanModal(true);
            }}
          >
            New Bean
          </Button>
          <Button
            disabled={!beanId}
            onClick={() => {
              setOpenBeanModal(true);
            }}
          >
            Edit Current Bean
          </Button>
          <Button
            disabled={!beanId}
            onClick={async () => {
              try {
                await api.beans.delete(beanId);
                setBeanId();
                await getBeans();
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Delete Bean
          </Button>
        </Grid>
      </Grid>
      {/** TODO maybe this should live off of the view...? */}
      <BeanWorkflow
        beanId={beanId}
        setBeanId={setBeanId}
        open={openBeanModal}
        setOpen={setOpenBeanModal}
        getBeans={getBeans}
      />
    </Grid>
  );
};
