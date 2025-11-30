import React, { useEffect, useState, useCallback } from "react";
import Grid from "@mui/material/Grid";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import api from "../../api/coffee-roasting-api";
import { CoffeeRoastingMenu } from "../../components/menu";
import Radio from "@mui/material/Radio";
import { CoffeeTableContainer } from "../../components/styled/table-container";
import { useNavigate } from "react-router";

export const BeanSelection = () => {
  let navigate = useNavigate();
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

  // TODO add pagination
  // TODO add searching
  // TODO add extra bean creation
  // TODO add unselection?
  // TODO add some bean popup / drawer (would be nice / useful)
  return (
    <CoffeeRoastingMenu>
      {!loading && (
        <>
          <Grid>Choose Bean:</Grid>
          <CoffeeTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
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
                      <TableCell>
                        <Radio
                          name="selected-bean-group"
                          value={bean.id}
                          checked={selectedBean === bean.id}
                        />
                      </TableCell>
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
          </CoffeeTableContainer>
          <Button disabled={!selectedBean}>Start</Button>
          <Button
            onClick={() => {
              navigate("/bean/add");
            }}
          >
            Is your bean missing? Add a new Bean!
          </Button>
        </>
      )}
    </CoffeeRoastingMenu>
  );
};
