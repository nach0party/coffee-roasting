import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import { CoffeeRoastingMenu } from '../../../components/menu';
import { RawBeanAvatar } from '../../../components/rawBeanAvatar/rawBeanAvatar';
import api from '../../../api/coffee-roasting-api';
import './selection.css';

/**
 * Component for selecting beans out of the bean library.
 * @returns
 */
export const BeanSelection = () => {
  let navigate = useNavigate();
  const [existingBeans, setExistingBeans] = useState([]);
  const [selectedBean, setSelectedBean] = useState();
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    };

    initialize();
  }, []);

  const selectBean = async (id) => {
    setSelectedBean(id);
  };

  const startRoast = async () => {
    try {
      const response = await api.roasts.create({ bean: selectedBean });
      navigate(`/roast/${response.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // TODO add pagination
  // TODO add extra bean creation
  // TODO add some bean popup / drawer (would be nice / useful)

  return (
    <CoffeeRoastingMenu
      title="Coffee Bean Selection"
      rightSideMenuBar={
        <Button
          disabled={!selectedBean}
          onClick={async () => {
            await startRoast();
          }}
        >
          Start Roast
        </Button>
      }
    >
      {!loading && (
        <>
          <TextField
            onChange={async (e) => {
              await getBeans(e.target.value);
            }}
            sx={{ pl: 1, pb: 3, cursor: 'pointer' }}
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
          <Grid container spacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 25 }}>
            {existingBeans.map((bean) => {
              const isSelected = selectedBean === bean.id;
              return (
                <Grid
                  size={{ xs: 6, sm: 4, md: 3, lg: 2, xl: 1 }}
                  key={bean.id}
                >
                  <RawBeanAvatar
                    name={bean.name}
                    onClick={() => {
                      selectBean(bean.id);
                    }}
                    isSelected={isSelected}
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </CoffeeRoastingMenu>
  );
};
