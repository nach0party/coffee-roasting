import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';

import api from '../../../api/coffee-roasting-api';
import { RawBeanAvatar } from '../../../components/rawBeanAvatar/rawBeanAvatar';
import { ViewBean } from '../view';
import { CoffeeRoastingMenu } from '../../../components/menu';
import { CoffeeCuppingRadar } from '../../../charts/cupping';
import { BeanWorkflow } from '../workflow/workflow';
import { CoffeRoastingModal } from '../../../components/modal';

export const BeanLibrary = () => {
  const [existingBeans, setExistingBeans] = useState([]);
  const [bean, setBean] = useState({});
  const [openBeanWorkflow, setOpenBeanWorkflow] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [roastProfileAnalytics, setRoastProfileAnalytics] = useState({});

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

  const retrieveBeanRoastProfileAnalytics = async (id) => {
    try {
      const response = await api.beans.retrieveAllRoastsAnalytics(id);
      setRoastProfileAnalytics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CoffeeRoastingMenu
      title={'Library'}
      rightSideMenuBar={
        <TextField
          size="small"
          onChange={async (e) => {
            await getBeans(e.target.value);
          }}
          sx={{ cursor: 'pointer', width: '75%' }}
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
            minHeight: 215,
            maxHeight: 215,
            overflowX: 'auto',
            width: '100%',
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
              setBean({});
              setOpenBeanWorkflow(true);
            }}
            src={'/new-bean3.avif'}
          />
          {existingBeans.map((mappedBean) => {
            const isSelected = bean?.id === mappedBean.id;
            return (
              <RawBeanAvatar
                key={mappedBean.id}
                sx={{ width: 125, height: 125 }}
                name={mappedBean.name}
                onClick={async () => {
                  setBean(mappedBean);
                  await retrieveBeanRoastProfileAnalytics(mappedBean.id);
                }}
                isSelected={isSelected}
                src={'/coffee-being-roasted.jpg'}
              />
            );
          })}
        </Stack>
      </Grid>
      <Grid sx={{ borderRadius: 1, p: 1 }}>
        <Grid container size={{ lg: 12 }}>
          <Grid
            size={{ xs: 12, sm: 12, lg: 8, xl: 8 }}
            sx={{ borderRadius: 5, borderColor: 'white', p: 1 }}
          >
            <ViewBean bean={bean} />
            <Grid sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                disabled={!bean?.id}
                onClick={() => {
                  setOpenBeanWorkflow(true);
                }}
                sx={{ mr: 3 }}
              >
                Edit Current Bean
              </Button>
              <Button
                variant="outlined"
                disabled={!bean?.id}
                onClick={async () => {
                  setOpenDeleteModal(true);
                }}
              >
                Delete Bean
              </Button>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, lg: 4, xl: 4 }} sx={{ p: 2 }}>
            {roastProfileAnalytics && (
              <CoffeeCuppingRadar data={roastProfileAnalytics} />
            )}
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
      <BeanWorkflow
        bean={bean}
        setBean={setBean}
        getBeans={getBeans}
        openBeanWorkflow={openBeanWorkflow}
        setOpenBeanWorkflow={setOpenBeanWorkflow}
      />
      <CoffeRoastingModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        title={<Grid>Are you absolutely sure?</Grid>}
        content={<Grid>testing</Grid>}
        actions={
          <Grid>
            <Button
              onClick={async () => {
                try {
                  await api.beans.delete(bean.id);
                  setBean({});
                  await getBeans();
                  setOpenDeleteModal(false);
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Delete
            </Button>
          </Grid>
        }
      />
    </CoffeeRoastingMenu>
  );
};
