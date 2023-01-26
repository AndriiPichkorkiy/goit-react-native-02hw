import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  nickname: null,
  stateChange: null,
  email: "example@example.cpm",
  photoURL:
    "https://firebasestorage.googleapis.com/v0/b/react-native-social-9d60d.appspot.com/o/avatarImage%2Fimg404.png?alt=media&token=673d5c54-f875-476b-93d5-3c15d9eb83b8",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickname: payload.nickname,
      email: payload.email,
      photoURL: payload.photoURL,
    }),
    authStateChage: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
    updateUserAvatar: (state, { payload }) => ({
      ...state,
      photoURL: payload.photoURL,
    }),
    showError: (state, { payload }) => ({
      ...state,
      error: payload.error,
    }),
    hideError: (state, { payload }) => ({
      ...state,
      error: null,
    }),
  },
});
