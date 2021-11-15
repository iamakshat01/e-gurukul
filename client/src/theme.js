import { createTheme } from '@mui/material/styles';
const themeOptions = {
    palette: {
        type: 'light',
        primary: {
            main: '#0074e1',
        },
        secondary: {
            main: '#6cdaee',
        },
        error: {
            main: '#ff1744',
        },
        warning: {
            main: '#e64a19',
        },
        info: {
            main: '#1b9ce5',
        },
        success: {
            main: '#1de9b6',
        },
    },
    typography: {
        fontFamily: "'Spectral', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
    },
};
const theme = createTheme(themeOptions);
export default theme;