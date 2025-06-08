import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    styled
} from '@mui/material';
import {
    Home as HomeIcon,
    Settings as SettingsIcon,
    Psychology as ModelsIcon,
    Security as SecurityIcon,
} from '@mui/icons-material';

// Custom styled components
const SidebarContainer = styled(Box)(({theme}) => ({
    width: 240,
    height: '100vh',
    backgroundColor: '#7B68EE',
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.common.white,
}));

const Logo = styled(Typography)(({theme}) => ({
    fontSize: 24,
    fontWeight: 600,
    padding: theme.spacing(3),
    color: 'white',
}));

const StyledListItem = styled(ListItem)(({ isactive, theme }) => ({
    marginBottom: theme.spacing(0.5),
    borderRadius: theme.spacing(1),
    margin: theme.spacing(0, 1),
    '& .MuiListItemButton-root': {
        borderRadius: theme.spacing(1),
        backgroundColor: isactive === 'true' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
    },
}));

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            text: 'Dashboard',
            icon: <HomeIcon />,  // <-- Das Komma hat gefehlt!
            path: '/dashboard'
        },
        {
            text: 'Settings',
            icon: <SettingsIcon />,
            path: '/settings'
        },
        {
            text: 'Models',
            icon: <ModelsIcon />,
            path: '/models'
        },
        {
            text: 'Security',
            icon: <SecurityIcon />,
            path: '/security'
        },
    ];

    return(
        <SidebarContainer>
            <Logo variant="h1">MailFokus</Logo>
            <List>
                {menuItems.map((item) => (
                    <StyledListItem
                        key={item.text}
                        disablePadding
                        isactive={(location.pathname === item.path).toString()}
                    >
                        <ListItemButton onClick={() => navigate(item.path)}>
                            <ListItemIcon sx={{color: 'white'}}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{fontSize: 16, fontWeight: 500}}
                            />
                        </ListItemButton>
                    </StyledListItem>
                ))}
            </List>
        </SidebarContainer>
    );
};

export default Sidebar;