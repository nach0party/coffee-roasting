import { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { CoffeeRoastingMenu } from "../../../components/menu";
import api from "../../../api/coffee-roasting-api";
import Box from "@mui/material/Box";
import { RawBeanAvatar } from "../../../components/rawBeanAvatar/rawBeanAvatar";
import Stack from "@mui/material/Stack";
import { ManageBean } from "../manage";
import Typography from "@mui/material/Typography";

// this is repeat of BeanSelection logic, should we centralize some generic functions?
export const BeanLibrary = () => {
  const [existingBeans, setExistingBeans] = useState([]);
  const [selectedBean, setSelectedBean] = useState();

  const getBeans = useCallback(async (search) => {
    const params = {};
    if (search) {
      params.search = search;
    }
    const response = await api.beans.list(params);
    setExistingBeans(response.data.results);
  });

  useEffect(() => {
    const initialize = async () => {
      await getBeans();
      setLoading(false);
    };

    initialize();
  }, []);

  const selectBean = async (id) => {
    setSelectedBean(id);
  };

  return (
    <CoffeeRoastingMenu title={"Raw Coffee Bean Library"}>
      <Grid>
        <Grid container>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              overflowX: "auto",
              width: "100%",
              paddingY: 2,
              paddingX: 2,
              paddingBottom: 0,
              marginBottom: 0,
            }}
          >
            {existingBeans.map((bean) => {
              const isSelected = selectedBean === bean.id;
              return (
                <RawBeanAvatar
                  sx={{ width: 125, height: 125 }}
                  name={bean.name}
                  onClick={() => {
                    selectBean(bean.id);
                  }}
                  isSelected={isSelected}
                />
              );
            })}
          </Stack>
        </Grid>
        <Grid sx={{ mt: 2, borderRadius: 1 }}>
          {/* <Stack direction="row"> */}
          <Grid container size={{ lg: 12 }}>
            <Grid size={{ xs: 12, sm: 12, lg: 4, xl: 4 }} sx={{ p: 2 }}>
              <img
                src="/library-bean-display.jpg"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 5,
                }}
              />
            </Grid>
            <Grid
              size={{ xs: 12, sm: 12, lg: 8, xl: 8 }}
              sx={{ borderRadius: 5, borderColor: "white", p: 2 }}
            >
              <ManageBean />
            </Grid>
          </Grid>
          {/* </Stack> */}
        </Grid>
        <Grid sx={{ mt: 2, borderRadius: 1 }}>
          <Typography variant="button">Discovery</Typography>
        </Grid>
      </Grid>
    </CoffeeRoastingMenu>
  );
};
