/* eslint-disable react/prop-types */

import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Container, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import FavoriteDropdown from "./FavDropdown";
import MUISwitch from "./Switch";

export default function Header({ toggleTheme }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
              <Stack direction="row" justifyContent="center">
                <Stack direction="row" alignItems="center">
                  <Box mr={2}>
                    <MenuBookIcon />
                  </Box>
                  <Typography variant="h6" component="h6" sx={{ fontSize: { xs: 14, sm: 18, } }}>
                    Cute dictionary
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <FavoriteDropdown></FavoriteDropdown>
              <MUISwitch onChange={toggleTheme}></MUISwitch>
              </Stack>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
