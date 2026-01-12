import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

/**
 * Provides a view / display of a configurable bean?.  Does not handle
 * configuration but just all the properties of what we consider to be a bean? to
 * be displayed in an ordinary fashion.
 * @param {*} param0
 * @returns
 */
export const ViewBean = ({ bean }) => {
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
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          {/** TODO move "New Bean" to the top where it's a non movable  */}
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <Grid>
            <Typography sx={{ mb: 2, ml: 1 }}>Bean</Typography>
          </Grid>
          <Grid>
            <TextField
              label="Name"
              value={bean?.name}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                input: {
                  readOnly: true,
                },
              }}
              helperText="The name used to identify the bean?"
              size="small"
              sx={{ width: "100%", mt: 2, mb: 2 }}
            />
          </Grid>
          <Grid>
            <TextField
              label="Grade"
              value={bean?.sca_grade}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                input: {
                  readOnly: true,
                },
              }}
              helperText={`The SCA grade of the bean?.`}
              size="small"
              sx={{ width: "100%", mt: 2, mb: 2 }}
            />
          </Grid>
          <Grid>
            <TextField
              value={bean?.processing}
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
              sx={{ width: "100%", mt: 2, mb: 2 }}
            />
          </Grid>
        </Grid>
        {/* <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <Divider />
          <Typography sx={{ mt: 2 }}>Origin</Typography>
        </Grid> */}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <Grid>
            <Typography sx={{ mb: 2, ml: 1 }}>Origin</Typography>
          </Grid>
          <Grid>
            <TextField
              value={bean?.origin?.country || ""}
              label="Country Of Origin"
              helperText={`Provide the country the bean? is from`}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                input: {
                  readOnly: true,
                },
              }}
              size="small"
              sx={{ width: "100%", mt: 2, mb: 2 }}
            />
          </Grid>
          <Grid>
            <TextField
              label="Region"
              value={bean?.origin?.region || ""}
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
              sx={{ width: "100%", mt: 2, mb: 2 }}
            />
          </Grid>
          <Grid>
            <TextField
              label="Municipality"
              value={bean?.origin?.municipality || ""}
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
              sx={{ width: "100%", mt: 2, mb: 2 }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
