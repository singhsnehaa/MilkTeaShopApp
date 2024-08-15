export const TOGGLE_THEME_BEGAIN = "TOGGLE_THEME_BEGAIN";
export const TOGGLE_THEME_SUCCESS = "TOGGLE_THEME_SUCCESS";
export const TOGGLE_THEME_FAILURE = "TOGGLE_THEME_FAILURE";

export const toggleThemeBegain = () => ({
  type: TOGGLE_THEME_BEGAIN,
});

export const toggleThemeSuccess = (selectedTheam) => ({
  type: TOGGLE_THEME_SUCCESS,
  payload: { selectedTheam },
});

export const toggleThemeFailure = (error) => ({
  type: TOGGLE_THEME_FAILURE,
  payload: { error },
});

export function toggleTheme(themeType) {
  return (dispatch) => {
    dispatch(toggleThemeBegain());
    switch (themeType) {
      case "dark":
        dispatch(toggleThemeSuccess(darkTheme));
        break;
      case "light":
        dispatch(toggleThemeSuccess(lightTheme));
        break;
      case "dark":
        dispatch(toggleThemeFailure({ error: "Invalid theme type" }));
        break;
    }
  };
}
