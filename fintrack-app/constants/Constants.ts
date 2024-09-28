// styles/constants.js

import {string} from "prop-types";

export const COLORS = {
  // Primary Colors
  primary: '#A0CED9',    // Pastel Teal
  secondary: '#F7A8B8',  // Pastel Pink

  // Accent Colors
  accent: '#FFCCB6',     // Pastel Peach
  highlight: '#C1C0E8',  // Pastel Lavender

  // Neutral Colors
  background: '#F9F9F9', // Light Grey
  surface: '#FFFFFF',    // White
  text: '#4A4A4A',       // Dark Grey
  subtext: '#7D7D7D',    // Medium Grey

  // Status Colors
  success: '#B2E4C4',    // Pastel Green
  warning: '#FFE3B3',    // Pastel Yellow
  error: '#F7B1AB',      // Pastel Red
};

export const FONT_SIZES = {
  largeTitle: 34,
  title: 28,
  header: 22,
  body: 16,
  caption: 12,
};

export const SPACING = {
  tiny: 4,
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,
};

export const BORDER_RADIUS = {
  small: 4,
  medium: 8,
  large: 16,
};

export const FONT_WEIGHTS = {
  regular: '400' as "400",
  medium: '500' as "500",
  bold: '700' as "700",
};