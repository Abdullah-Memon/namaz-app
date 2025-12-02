// Theme management utilities
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

// Get current theme from localStorage or default to light
export const getCurrentTheme = () => {
  return localStorage.getItem('theme') || THEMES.LIGHT;
};

// Set theme and apply to document
export const setTheme = (theme) => {
  localStorage.setItem('theme', theme);
  applyTheme(theme);
};

// Apply theme to document
export const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
};

// Toggle between light and dark theme
export const toggleTheme = () => {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
  setTheme(newTheme);
  return newTheme;
};

// Initialize theme on app load
export const initializeTheme = () => {
  const savedTheme = getCurrentTheme();
  applyTheme(savedTheme);
  return savedTheme;
};