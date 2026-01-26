import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import api from '../../api/coffee-roasting-api';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import { CoffeeRoastingMenu } from '../../components/menu';
import {
  determineRoastState,
  displayFriendlyRoastState,
  RoastState,
} from '../../utils';
import { ActiveRoastCard } from '../../components/activeRoastCard/activeRoastCard';
import { TableContainer, Typography } from '@mui/material';

const RowsPerpageOptions = {
  FIVE: 5,
  TEN: 10,
  TWENTY_FIVE: 25,
  FIFTY: 50,
  SEVENTY_FIVE: 75,
  ONE_HUNDRED: 100,
};

// TODO rename to the normal one once done...
export const CoffeeRoastingDashboardV2 = () => {
  let navigate = useNavigate();
  const [completedRoasts, setCompletedRoasts] = useState([]);
  const [pendingOrStartedRoasts, setPendingOrStartedRoasts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(RowsPerpageOptions.FIVE);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);

  const loadPendingOrStartedRoasts = async () => {
    const response = await api.roasts.list({ ended: false });
    setTotalRecords(response.data.count);
    setPendingOrStartedRoasts(response.data.results);
  };

  // TODO setup a generic search?
  const loadCompletedRoasts = async () => {
    const response = await api.roasts.list({
      started: true,
      ended: true,
      limit: rowsPerPage,
    });
    console.log(response, 'response');
    setCompletedRoasts(response.data.results);
  };

  useEffect(() => {
    const initialize = async () => {
      await loadCompletedRoasts();
      await loadPendingOrStartedRoasts();
    };
    initialize();
  }, []);

  return (
    <CoffeeRoastingMenu title={'Dashboard V2'}>
      <Grid container>
        {/* {pendingOrStartedRoasts.length > 0 && <Typography></Typography>} */}
        {pendingOrStartedRoasts.map((roast) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}
            key={roast.id}
            sx={{ p: 2 }}
          >
            <ActiveRoastCard roast={roast} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Bean Name</TableCell>
                  <TableCell>Roast Date</TableCell>
                  <TableCell>State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {completedRoasts.map((roastData) => {
                  return (
                    <TableRow
                      hover
                      key={roastData.id}
                      onClick={() => {
                        console.log('ye?');
                        navigate(`/roast/${roastData.id}`);
                      }}
                    >
                      <TableCell>{roastData.bean.name}</TableCell>
                      <TableCell>{roastData.created_when}</TableCell>
                      <TableCell>
                        {displayFriendlyRoastState(roastData)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      RowsPerpageOptions.FIVE,
                      RowsPerpageOptions.TEN,
                      RowsPerpageOptions.TWENTY_FIVE,
                      RowsPerpageOptions.FIFTY,
                      RowsPerpageOptions.SEVENTY_FIVE,
                      RowsPerpageOptions.ONE_HUNDRED,
                      // { label: 'All', value: -1 },
                    ]}
                    colSpan={3}
                    count={totalRecords}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onRowsPerPageChange={(e) => {
                      setRowsPerPage(e.target.value);
                    }}
                    slotProps={{
                      select: {
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      },
                    }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </CoffeeRoastingMenu>
  );
};
