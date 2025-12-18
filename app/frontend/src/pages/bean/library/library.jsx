import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Skeleton from "@mui/material/Skeleton";

import api from "../../../api/coffee-roasting-api";
import { RawBeanAvatar } from "../../../components/rawBeanAvatar/rawBeanAvatar";
import { ViewBean } from "../view";
import { CoffeeRoastingMenu } from "../../../components/menu";
import CoffeeCuppingRadar from "../../../charts/cupping";

// this is repeat of BeanSelection logic, should we centralize some generic functions?
export const BeanLibrary = () => {
  const [existingBeans, setExistingBeans] = useState([]);
  const [selectedBean, setSelectedBean] = useState();
  const [openBeanModal, setOpenBeanModal] = useState(false);

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
      <Grid container>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            // Enforces the area to remain if there's no data
            minHeight: 200,
            maxHeight: 200,
            overflowX: "auto",
            width: "100%",
            paddingY: 2,
            paddingX: 2,
            paddingBottom: 0,
            marginBottom: 0,
          }}
        >
          <RawBeanAvatar
            sx={{ width: 125, height: 125 }}
            name="New Bean"
            onClick={() => {
              setSelectedBean();
              setOpenBeanModal(true);
            }}
            src={"/new-bean3.avif"}
          />
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
                src={"/coffee-being-roasted.jpg"}
              />
            );
          })}
        </Stack>
      </Grid>
      <Grid sx={{ borderRadius: 1, p: 1 }}>
        <Grid container size={{ lg: 12 }}>
          {/* <Grid size={{ xs: 12, sm: 12, lg: 8, xl: 8 }} sx={{ p: 1 }}> */}
          {/* <Button
              variant="outlined"
              onClick={() => {
                setSelectedBean();
                setOpenBeanModal(true);
              }}
            >
              New Bean
            </Button> */}
          {/* </Grid> */}
          {/** TODO replace at some point */}
          <Grid
            size={{ xs: 12, sm: 12, lg: 8, xl: 8 }}
            sx={{ borderRadius: 5, borderColor: "white", p: 1 }}
          >
            <ViewBean
              beanId={selectedBean}
              setBeanId={setSelectedBean}
              getBeans={getBeans}
              openBeanModal={openBeanModal}
              setOpenBeanModal={setOpenBeanModal}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, lg: 4, xl: 4 }} sx={{ p: 2 }}>
            {/* <Skeleton variant="rectangular" width="100%" height={350} /> */}
            <CoffeeCuppingRadar />
          </Grid>
        </Grid>
      </Grid>
      <Grid sx={{ mt: 2, borderRadius: 1 }}>
        <Grid container size={{ lg: 12 }}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ p: 2 }}>
            <Typography variant="button">
              Cupping Profile & History [WIP]
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }} sx={{ p: 2 }}>
            {/** This is a great idea */}
            {/* <CoffeeCuppingRadar /> */}
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ p: 2 }}>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }} sx={{ p: 2 }}>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Grid>
        </Grid>
      </Grid>
    </CoffeeRoastingMenu>
  );
};
