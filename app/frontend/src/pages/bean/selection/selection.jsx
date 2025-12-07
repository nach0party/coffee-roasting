import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import api from "../../../api/coffee-roasting-api";
import { CoffeeRoastingMenu } from "../../../components/menu";
import { CoffeeTableContainer } from "../../../components/styled/table-container";
import "./selection.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";

export const BeanSelection = () => {
  let navigate = useNavigate();
  const [existingBeans, setExistingBeans] = useState([]);
  const [selectedBean, setSelectedBean] = useState();
  // const [search, setSearch] = useState()
  const [loading, setLoading] = useState(true);

  // TODO just a reminder, set some query params or alter queryset so it only pulls beans per user...
  const getBeans = useCallback(async (search) => {
    const params = {};
    if (search) {
      params.search = search;
    }
    console.log(params, "params");
    const response = await api.beans.list(params);
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

  const startRoast = async () => {
    try {
      const response = await api.roasts.create({ bean: selectedBean });
      navigate(`/roast/${response.data.id}`);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  // TODO add pagination
  // TODO add searching
  // TODO add extra bean creation
  // TODO add unselection?
  // TODO add some bean popup / drawer (would be nice / useful)

  return (
    <CoffeeRoastingMenu title="Raw Coffee Bean Library">
      {!loading && (
        <>
          <TextField
            onChange={async (e) => {
              await getBeans(e.target.value);
            }}
            sx={{ pl: 1, pb: 3 }}
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
          <Grid container spacing={{ xs: 2, md: 3, lg: 4 }}>
            {existingBeans.map((bean) => (
              <Grid key={bean.id}>
                <Box sx={{ textAlign: "center" }}>
                  <Avatar
                    className={"coffee-grid"}
                    sx={{ width: 175, height: 175 }}
                    src="/coffee-being-roasted.jpg"
                  />
                  <p>{bean.name}</p>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </CoffeeRoastingMenu>
  );
};
