import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Avatar,
    Box,
    styled
} from '@mui/material';
import {
    Search as SearchIcon,
    Notifications as NotificationsIcon
} from '@mui/icons-material';

// Custom styled components
const SearchContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.text.primary,
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
}));

const Header = () => {
    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
                <SearchContainer>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search emails…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </SearchContainer>
                {/* <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size="large" color="inherit">
                        <NotificationsIcon />
                    </IconButton>
                    <Avatar sx={{ bgcolor: 'primary.main', ml: 2 }}>
                        U
                    </Avatar>
                </Box> */}
            </Toolbar>
        </AppBar>
    );
};

export default Header;