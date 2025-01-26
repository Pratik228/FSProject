/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("winter"); // Default theme

  const toggleTheme = () => {
    setTheme((prev) => (prev === "winter" ? "dracula" : "winter"));
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
