import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';

import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import api from '../../api/coffee-roasting-api';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

import { CoffeeRoastingMenu } from '../../components/menu';
import { displayFriendlyRoastState } from '../../utils';
import { ActiveRoastCard } from '../../components/activeRoastCard/activeRoastCard';
import { Button, TableContainer } from '@mui/material';

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
  const [page, setPage] = useState(0);

  const loadPendingOrStartedRoasts = async () => {
    const response = await api.roasts.list({ ended: false });
    setPendingOrStartedRoasts(response.data.results);
  };

  // TODO setup a generic search?
  const loadCompletedRoasts = async (limit, offset) => {
    const response = await api.roasts.list({
      started: true,
      ended: true,
      limit: limit,
      offset: offset,
    });
    setTotalRecords(response.data.count);
    setCompletedRoasts(response.data.results);
  };

  useEffect(() => {
    const initialize = async () => {
      await loadCompletedRoasts(rowsPerPage);
      await loadPendingOrStartedRoasts();
    };
    initialize();
  }, []);

  return (
    <CoffeeRoastingMenu
      title={'Dashboard'}
      rightSideMenuBar={
        <Button
          onClick={() => {
            navigate('bean/select');
          }}
        >
          Setup A New Roast
        </Button>
      }
    >
      <Grid container>
        {pendingOrStartedRoasts.map((roast) => (
          <Grid
            size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}
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
                        navigate(`/roast/${roastData.id}`);
                      }}
                    >
                      <TableCell>{roastData.bean.name}</TableCell>
                      <TableCell>
                        {format(roastData.created_when, 'MMMM do, h:mm a')}
                      </TableCell>
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
                    onRowsPerPageChange={async (e) => {
                      const newRowsPerPage = e.target.value;
                      setRowsPerPage(newRowsPerPage);
                      setPage(0);
                      await loadCompletedRoasts(newRowsPerPage);
                    }}
                    slotProps={{
                      select: {
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      },
                    }}
                    onPageChange={async (e, newPage) => {
                      const offset = rowsPerPage * newPage;
                      await loadCompletedRoasts(rowsPerPage, offset);
                      setPage(newPage);
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
