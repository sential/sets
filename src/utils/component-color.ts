import { transparency } from "../constants";

type UITheme = "light" | "dark";

export const getComponentColor = (
  color: string,
  toggled: boolean,
  disabled: boolean,
  theme: UITheme,
  returnOnlyAlpha: boolean = false
) => {
  const isLightTheme = theme === "light";
  const rgb = isLightTheme ? 0 : 255;

  let alpha;

  if (disabled) {
    alpha = transparency.disabledIcon;
  } else if (!toggled) {
    alpha = transparency.inactiveIcon;
  }

  if (returnOnlyAlpha) {
    return alpha;
  }
  return alpha != null ? `rgba(${rgb}, ${rgb}, ${rgb}, ${alpha})` : color;
};

export const getComponentRippleColor = (
  color: string,
  toggled: boolean,
  theme: UITheme
) => {
  if (toggled) {
    return color;
  }
  return theme === "light" ? "#000" : "#fff";
};

export const getComponentOpacity = (
  toggled: boolean,
  disabled: boolean,
  theme: UITheme
) => getComponentColor(null, toggled, disabled, theme, true);

export const getComponentForeground = (disabled: boolean) => {
  if (disabled) {
    return `rgba(0,0,0,${transparency.disabledIcon})`;
  }
  return `rgba(255,255,255,${transparency.inactiveIcon})`;
};
