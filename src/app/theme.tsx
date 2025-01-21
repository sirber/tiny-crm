"use client";
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

// Function to create the theme based on the system's color scheme
const createAppTheme = (prefersDarkMode: boolean) => {
  return createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light", // Dynamically set theme mode
    },
  });
};

interface ThemeProps {
  children: React.ReactNode;
}

const Theme: React.FC<ThemeProps> = ({ children }) => {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);

  // Detect system theme preference on mount
  useEffect(() => {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setPrefersDarkMode(isDarkMode);
  }, []);

  // Create theme based on system preference
  const theme = createAppTheme(prefersDarkMode);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
