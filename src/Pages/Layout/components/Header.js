import { useState } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Login from "@mui/icons-material/Login";
import Logout from '@mui/icons-material/Logout';
import styles from "../styles/styles.module.css";

export default function AccountMenu() {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={styles.header}>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: "flex-end", padding: "1rem" }}>
        <Link to={"/"}>
          <Typography sx={{ minWidth: 100, fontWeight: "bold" }}>Home</Typography>
        </Link>
        <Tooltip title="Publish an article">
          <Link to={"/publish"}>
            <Typography sx={{ minWidth: 100, fontWeight: "bold" }}>Publish</Typography>
          </Link>
        </Tooltip>
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
      { localStorage.getItem("news-app-authToken") === "null" ?
        <Link to={"/signin"}>
          <MenuItem>
            <ListItemIcon>
              <Login fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        </Link> :
        <div>
          <Tooltip title="Update your account">
            <Link to={"/account"}>
              <MenuItem>
                <Avatar /> My account
              </MenuItem>
            </Link>
          </Tooltip>
          <Divider />
          <MenuItem
            onClick={() => {
              localStorage.setItem("news-app-authToken", "null")
            }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </div>}
      </Menu>
    </header>
  );
}
