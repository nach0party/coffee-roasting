import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

/**
 * Controls for the bean view.
 * TODO should be tweaked to be more generic so we can add it anywhere.
 * @param {*} param0
 * @returns
 */
export const BeanControls = ({
  setBeanId,
  setBeanData,
  setOpenBeanModal,
  getBeans,
}) => {
  return (
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
  );
};
