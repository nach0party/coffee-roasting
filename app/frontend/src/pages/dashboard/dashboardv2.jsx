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

const RowsPerpageOptions = {
  TEN: 10,
  TWENTY_FIVE: 25,
  FIFTY: 50,
  SEVENTY_FIVE: 75,
  ONE_HUNDRED: 100,
};

// TODO rename to the normal one once done...
export function CoffeeRoastingDashboardV2() {
  let navigate = useNavigate();
  const [roasts, setRoasts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(RowsPerpageOptions.TEN);

  // TODO setup a generic search?
  const loadRoasts = async () => {
    const response = await api.roasts.list();
    setRoasts(response.data.results);
  };

  useEffect(() => {
    const initialize = async () => {
      await loadRoasts();
    };
    initialize();
  }, []);

  return (
    <CoffeeRoastingMenu>
      <Grid container>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          This is some graphing sections / stuff
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {/** TODO I do think this should be a standardized component */}
                  <TextField
                    onChange={async (e) => {
                      // await loadRoasts();
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
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bean Name</TableCell>
                <TableCell>Roast Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {roasts.map((roastData) => {
                return (
                  <TableRow
                    key={roastData.id}
                    onClick={() => {
                      console.log('ye?');
                      navigate(`/roast/${roastData.id}`);
                    }}
                  >
                    <TableCell>{roastData.bean.name}</TableCell>
                    <TableCell>{roastData.created_when}</TableCell>
                    <TableCell>nope</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {/* <TableFooter> */}
            {/* <TablePagination
              onChange={() => {
                console.log('okay');
              }}
              rowsPerPage={rowsPerPage}
            ></TablePagination> */}
            {/* </TableFooter> */}
          </Table>
        </Grid>
      </Grid>
    </CoffeeRoastingMenu>
  );
}
