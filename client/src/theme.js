import { createTheme } from '@mui/material/styles';
const themeOptions = {
    palette: {
        type: 'dark',
        primary: {
            main: '#1cc0df',
        },
        secondary: {
            main: '#fe0072',
        },
        error: {
            main: '#f50057',
        },
        warning: {
            main: '#ff3d00',
        },
        info: {
            main: '#00e5ff',
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