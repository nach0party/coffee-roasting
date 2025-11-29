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

/**
 * Component for starting a new roast, more or less the majority
 * of the apps functionality is going to be in here as this is the
 * main purpose of it all.
 */
export const CoffeeRoasting = () => {
  const [existingBeans, setExistingBeans] = useState([]);
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

  console.log(existingBeans, "existingBeans");

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
                </TableRow>
              </TableHead>
              <TableBody>
                {existingBeans.map((bean) => {
                  console.log(bean, "bean");
                  return (
                    <TableRow>
                      <TableCell>{bean.name}</TableCell>
                      <TableCell>{bean.sca_letter_grade}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </CoffeeRoastingMenu>
  );
};
