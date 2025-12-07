import { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { CoffeeRoastingMenu } from "../../../components/menu";
import api from "../../../api/coffee-roasting-api";
import Box from "@mui/material/Box";
import { RawBeanAvatar } from "../../../components/rawBeanAvatar/rawBeanAvatar";
import Stack from "@mui/material/Stack";

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
      <Stack
        direction="row"
        spacing={3}
        sx={{
          overflowX: "auto",
          padding: 2, // Add padding for scrolling visuals
          width: "100%",
        }}
      >
        {/* <Grid container spacing={{ xs: 2, md: 3, lg: 4, xl: 4 }}> */}
        {existingBeans.map((bean) => {
          const isSelected = selectedBean === bean.id;
          return (
            // <Grid key={bean.id}>
            <Box sx={{ textAlign: "center" }}>
              <RawBeanAvatar
                name={bean.name}
                onClick={() => {
                  selectBean(bean.id);
                }}
                isSelected={isSelected}
              />
            </Box>
            // </Grid>
          );
        })}
      </Stack>
      {/* </Grid> */}
    </CoffeeRoastingMenu>
  );
};
