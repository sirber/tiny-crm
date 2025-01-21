"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "@/assets/people.png";
import { useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const pages = [
  {
    name: "People",
    children: [
      { name: "Contacts", url: "/people/contacts" },
      { name: "Prospects", url: "/people/prospects" },
      { name: "Customers", url: "/people/customers" },
    ],
  },
  { name: "Products", url: "/products" },
  { name: "Payments", url: "/payments" },
];

const settings = [
  { name: "Profile", url: "/profile" },
  { name: "Logout", url: "/logout" },
];

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElCustomers, setAnchorElCustomers] =
    React.useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenCustomersMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCustomers(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseCustomersMenu = () => {
    setAnchorElCustomers(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {!isMobile && (
            <Image
              src={Logo}
              alt="Logo"
              height={40}
              width={40}
              style={{
                marginRight: "10px",
                display: "flex",
                alignItems: "center",
              }}
            />
          )}

          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Tiny CRM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  {page.url ? (
                    <Link href={page.url} passHref>
                      <Typography
                        textAlign="center"
                        sx={{
                          color: "inherit",
                          textDecoration: "none",
                        }}
                      >
                        {page.name}
                      </Typography>
                    </Link>
                  ) : (
                    <Typography
                      textAlign="center"
                      sx={{
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      {page.name}
                    </Typography>
                  )}

                  {page.children && (
                    <Menu
                      id={`submenu-${page.name}`}
                      anchorEl={anchorElCustomers}
                      open={Boolean(anchorElCustomers)}
                      onClose={handleCloseCustomersMenu}
                    >
                      {page.children.map((child) => (
                        <MenuItem
                          key={child.name}
                          onClick={handleCloseCustomersMenu}
                        >
                          <Typography
                            textAlign="center"
                            component={Link}
                            href={child.url}
                            sx={{
                              color: "inherit",
                              textDecoration: "none",
                            }}
                          >
                            {child.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={
                  page.children ? handleOpenCustomersMenu : handleCloseNavMenu
                }
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href={page.url || ""}>
                  <Typography
                    textAlign="center"
                    sx={{
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {page.name}
                  </Typography>
                </Link>
                {page.children && (
                  <Menu
                    id={`submenu-${page.name}`}
                    anchorEl={anchorElCustomers}
                    open={Boolean(anchorElCustomers)}
                    onClose={handleCloseCustomersMenu}
                  >
                    {page.children.map((child) => (
                      <MenuItem
                        key={child.name}
                        onClick={handleCloseCustomersMenu}
                      >
                        <Typography
                          textAlign="center"
                          component={Link}
                          href={child.url}
                          sx={{
                            color: "inherit",
                            textDecoration: "none",
                          }}
                        >
                          {child.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    component={Link}
                    href={setting.url}
                    sx={{
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
