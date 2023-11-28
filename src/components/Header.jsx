
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
            <Stack direction="row" justifyContent="center" width="100%">
             <Stack direction="row" alignItems="center">
              <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuBookIcon />
            </IconButton>
          <Link href="/" underline="none" color="inherit">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
            Cute dictionary
          </Typography>
          </Link>
            </Stack>
            </Stack> 
        </Toolbar>
      </AppBar>
    </Box>
  );
}
