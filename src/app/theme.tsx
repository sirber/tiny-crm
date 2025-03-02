"use client";
import {useEffect, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material";

// Function to create the theme based on the system's color scheme
const createAppTheme = (prefersDarkMode: boolean) => {
    return createTheme({
        palette: {
            mode: prefersDarkMode ? "dark" : "light",
        },
    });
};

interface ThemeProps {
    children: React.ReactNode;
}

function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );
        setIsDarkMode(darkModeMediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        darkModeMediaQuery.addEventListener("change", handleChange);

        return () => darkModeMediaQuery.removeEventListener("change", handleChange);
    }, []);

    return isDarkMode;
}

const Theme: React.FC<ThemeProps> = ({children}) => {
    const isDarkMode = useDarkMode();

    // Wait until client-side theme detection has run
    if (null === isDarkMode) {
        return null;
    }

    // Create theme based on detected preference
    const theme = createAppTheme(isDarkMode);

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
