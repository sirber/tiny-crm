"use client";

import React, {MouseEvent, useState} from "react";
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    useMediaQuery,
    useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ContactsIcon from "@mui/icons-material/Contacts";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/people.png";

interface MenuItemType {
    label: string;
    link?: string;
    icon: React.ReactNode;
    submenu?: {
        label: string;
        link: string;
        icon: React.ReactNode;
    }[];
    align?: 'left' | 'right';
}

const menuData: MenuItemType[] = [
    {
        label: "People",
        icon: <PeopleIcon/>,
        align: 'left',
        submenu: [
            {label: "Contact", link: "/people/contact", icon: <ContactsIcon/>},
            {label: "Prospect", link: "/people/prospect", icon: <PersonAddIcon/>},
            {label: "Customer", link: "/people/customer", icon: <SupervisedUserCircleIcon/>},
        ],
    },
    {
        label: "Store",
        icon: <StoreIcon/>,
        align: 'left',
        submenu: [
            {label: "Product", link: "/product/inventory", icon: <InventoryIcon/>},
            {label: "Transactions", link: "/product/transaction", icon: <ReceiptIcon/>},
        ],
    },
    {
        label: "Profile",
        icon: <AccountCircleIcon/>,
        align: 'right',
        submenu: [
            {label: "My profile", link: "/profile", icon: <AccountCircleIcon/>},
            {label: "Administration", link: "/admin", icon: <AdminPanelSettingsIcon/>},
        ],
    },
    {
        label: "Logout",
        link: "/auth/logout",
        icon: <LogoutIcon/>,
        align: 'right'
    }
];

interface NavBarInterface {
    hasSession: boolean;
}

const NavBar = ({hasSession}: NavBarInterface) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeSubmenu, setActiveSubmenu] = useState<null | number>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>, index: number) => {
        setAnchorEl(event.currentTarget);
        setActiveSubmenu(index);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveSubmenu(null);
    };

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    // Separate menu items by alignment
    const leftMenuItems = menuData.filter(item => item.align !== 'right');
    const rightMenuItems = menuData.filter(item => item.align === 'right');

    if (!hasSession) {
        return null;
    }

    return (
        <nav>
            <AppBar position="static">
                <Toolbar>
                    {isMobile && (
                        <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                            <MenuIcon/>
                        </IconButton>
                    )}
                    <Link key='home' href='/'>
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
                    </Link>

                    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                        <List sx={{width: 250}}>
                            {menuData.map((menu) => (
                                <div key={menu.label}>
                                    {menu.submenu ? (
                                        <>
                                            <ListItem>
                                                <ListItemIcon>{menu.icon}</ListItemIcon>
                                                <ListItemText primary={menu.label}/>
                                            </ListItem>
                                            {menu.submenu.map((subItem) => (
                                                <Link key={subItem.label} href={subItem.link} passHref legacyBehavior>
                                                    <ListItem component="a" onClick={toggleDrawer(false)} sx={{pl: 4}}>
                                                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                                                        <ListItemText primary={subItem.label}/>
                                                    </ListItem>
                                                </Link>
                                            ))}
                                        </>
                                    ) : (
                                        <Link key={menu.label} href={menu.link!} passHref legacyBehavior>
                                            <ListItem component="a" onClick={toggleDrawer(false)}>
                                                <ListItemIcon>{menu.icon}</ListItemIcon>
                                                <ListItemText primary={menu.label}/>
                                            </ListItem>
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </List>
                    </Drawer>

                    {!isMobile && (
                        <>
                            {/* Left-aligned menu items */}
                            <Box sx={{display: 'flex', flexGrow: 1}}>
                                {leftMenuItems.map((menu) => (
                                    <div key={menu.label}>
                                        {menu.submenu ? (
                                            <>
                                                <Button
                                                    color="inherit"
                                                    onClick={(event) => handleMenuOpen(event, menuData.indexOf(menu))}
                                                    startIcon={menu.icon}
                                                >
                                                    {menu.label}
                                                </Button>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={activeSubmenu === menuData.indexOf(menu) && Boolean(anchorEl)}
                                                    onClose={handleMenuClose}
                                                >
                                                    {menu.submenu.map((subItem) => (
                                                        <MenuItem key={subItem.label} onClick={handleMenuClose}>
                                                            <ListItemIcon>{subItem.icon}</ListItemIcon>
                                                            <Link href={subItem.link}
                                                                  style={{textDecoration: "none", color: "inherit"}}>
                                                                {subItem.label}
                                                            </Link>
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            </>
                                        ) : (
                                            <Button
                                                color="inherit"
                                                component={Link}
                                                href={menu.link!}
                                                startIcon={menu.icon}
                                            >
                                                {menu.label}
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </Box>

                            {/* Right-aligned menu items */}
                            <Box sx={{display: 'flex'}}>
                                {rightMenuItems.map((menu) => (
                                    <div key={menu.label}>
                                        {menu.submenu ? (
                                            <>
                                                <Button
                                                    color="inherit"
                                                    onClick={(event) => handleMenuOpen(event, menuData.indexOf(menu))}
                                                    startIcon={menu.icon}
                                                >
                                                    {menu.label}
                                                </Button>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={activeSubmenu === menuData.indexOf(menu) && Boolean(anchorEl)}
                                                    onClose={handleMenuClose}
                                                >
                                                    {menu.submenu.map((subItem) => (
                                                        <MenuItem key={subItem.label} onClick={handleMenuClose}>
                                                            <ListItemIcon>{subItem.icon}</ListItemIcon>
                                                            <Link href={subItem.link}
                                                                  style={{textDecoration: "none", color: "inherit"}}>
                                                                {subItem.label}
                                                            </Link>
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            </>
                                        ) : (
                                            <Button
                                                color="inherit"
                                                component={Link}
                                                href={menu.link!}
                                                startIcon={menu.icon}
                                            >
                                                {menu.label}
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </Box>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </nav>
    );
};

export default NavBar;