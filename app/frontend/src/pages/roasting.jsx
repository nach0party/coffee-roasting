import React, { useEffect, useState, useCallback } from "react";
import { CoffeeRoastingMenu } from "../components/menu";
import Grid from "@mui/material/Grid";
import api from "../api/coffee-roasting-api";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

/**
 * Component for starting a new roast, more or less the majority
 * of the apps functionality is going to be in here as this is the
 * main purpose of it all.
 */
export const CoffeeRoasting = () => {
  const [existingBeans, setExistingBeans] = useState([]);
  const [selectedBean, setSelectedBean] = useState();
  const [loading, setLoading] = useState(true);

  // TODO just a reminder, set some query params or alter queryset so it only pulls beans per user...
  const getBeans = useCallback(async () => {
    const response = await api.beans.list();
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
    <CoffeeRoastingMenu>
      {!loading && (
        <>
          <Grid>Choose Bean:</Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Region</TableCell>
                  <TableCell>Municipality</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {existingBeans.map((bean) => {
                  return (
                    <TableRow
                      key={bean.id}
                      onClick={async () => {
                        await selectBean(bean.id);
                      }}
                    >
                      <TableCell>{bean.name}</TableCell>
                      <TableCell>{bean.sca_letter_grade}</TableCell>
                      <TableCell>{bean.origin?.country}</TableCell>
                      <TableCell>{bean.origin?.region}</TableCell>
                      <TableCell>{bean.origin?.municipality}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Button disabled={!selectedBean}>Start</Button>
        </>
      )}
    </CoffeeRoastingMenu>
  );
};
