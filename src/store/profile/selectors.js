export const selectProfileState = state => state.profile;
export const selectProfile = state => state.profile;
export const selectIsAuth = state => state.profile.isAuth;
export const selectIsMetric = state => state.profile.profileSettings.isMetric;
export const selectLocation = state => state.profile.profileSettings.location;
export const selectFavoriteCities = state => state.profile.favoriteCities;
export const selectFavoriteSportEvents = state => state.profile.favoriteSportEvents;
