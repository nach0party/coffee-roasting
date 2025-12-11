import { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { CoffeeRoastingMenu } from "../../../components/menu";
import api from "../../../api/coffee-roasting-api";
import Box from "@mui/material/Box";
import { RawBeanAvatar } from "../../../components/rawBeanAvatar/rawBeanAvatar";
import Stack from "@mui/material/Stack";
import { ViewBean } from "../view";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

// this is repeat of BeanSelection logic, should we centralize some generic functions?
export const BeanLibrary = () => {
  const [existingBeans, setExistingBeans] = useState([]);
  const [selectedBean, setSelectedBean] = useState();

  const getBeans = async (search) => {
    const params = {};
    if (search) {
      params.search = search;
    }
    const response = await api.beans.list(params);
    setExistingBeans(response.data.results);
  };

  useEffect(() => {
    const initialize = async () => {
      await getBeans();
    };

    initialize();
  }, []);

  // TODO skeleton for loading on first attempt
  // auto select first bean in the menu...
  const selectBean = async (id) => {
    if (id === selectedBean) {
      setSelectedBean();
      return;
    }
    setSelectedBean(id);
  };

  return (
    <CoffeeRoastingMenu
      title={"Library"}
      rightSideMenuBar={
        <TextField
          size="small"
          onChange={async (e) => {
            await getBeans(e.target.value);
          }}
          sx={{ cursor: "pointer", width: "75%" }}
          label="Search"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      }
    >
      <Grid>
        <Grid container>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              // Enforces the area to remain if there's no data
              minHeight: 225,
              maxHeight: 225,
              overflowX: "auto",
              width: "100%",
              paddingY: 2,
              paddingX: 2,
              paddingBottom: 0,
              marginBottom: 0,
            }}
          >
            {existingBeans.length === 0 && (
              <Typography variant="h5">No Beans Match This Search</Typography>
            )}
            {existingBeans.map((bean) => {
              const isSelected = selectedBean === bean.id;
              return (
                <RawBeanAvatar
                  key={bean.id}
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
              <ViewBean
                beanId={selectedBean}
                setBeanId={setSelectedBean}
                getBeans={getBeans}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ mt: 2, borderRadius: 1 }}>
          <Typography variant="button">Discovery</Typography>
        </Grid>
      </Grid>
    </CoffeeRoastingMenu>
  );
};
