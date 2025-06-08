import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0F52BA', // blue
            light: '#4B83DB',
            dark: '#0A3A82',
        },
        secondary: {
            main: '#7B68EE', // Purple
            light: '#9F8FF7',
            dark: '#5A4AA8',
        },
        background: {
            default: '#F8F9FA',
            paper: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        },
        h4: {
        fontWeight: 600,
        fontSize: '1.25rem',
        },
    },
});

export default theme;