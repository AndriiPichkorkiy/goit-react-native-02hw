import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authSingUpUser =
  ({ email, password, login }) =>
  async (dispath, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: login });
      let user = auth.currentUser;
      dispath(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
        })
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`errorCode: ${errorCode}, errorMessage: ${errorMessage}`);
    }
  };

export const authSingInUser =
  ({ email, password }) =>
  async (dispath, getState) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user =>=>=> ", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`errorCode: ${errorCode}, errorMessage: ${errorMessage}`);
      });
  };

export const authSingOutUser = () => async (dispath, getState) => {
  try {
    const response = await signOut(auth);
    dispath(authSlice.actions.authSignOut());
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`errorCode: ${errorCode}, errorMessage: ${errorMessage}`);
  }
};

export const authStateChangeUser = () => async (dispath, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickname: user.displayName,
      };
      dispath(authSlice.actions.updateUserProfile(userUpdateProfile));
      dispath(authSlice.actions.authStateChage({ stateChange: true }));
    }
  });
};
