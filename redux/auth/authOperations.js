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
    const state = getState();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: state.auth.photoURL,
      });
      let user = auth.currentUser;
      dispath(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
          photoURL: user.photoURL,
          email,
        })
      );
    } catch (error) {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // console.log(`errorCode: ${errorCode}, errorMessage: ${errorMessage}`);
      dispath(
        authSlice.actions.showError({
          error: error.message,
        })
      );
    }
  };

export const authSingInUser =
  ({ email, password }) =>
  async (dispath, getState) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user =>=>=> ", user);
        dispath(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            nickname: user.displayName,
            photoURL: user.photoURL,
            email,
          })
        );
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(`errorCode: ${errorCode}, errorMessage: ${errorMessage}`);
        dispath(
          authSlice.actions.showError({
            error: error.message,
          })
        );
      });
  };

export const authSingOutUser = () => async (dispath, getState) => {
  try {
    const response = await signOut(auth);
    dispath(authSlice.actions.authSignOut());
  } catch (error) {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // console.log(`errorCode: ${errorCode}, errorMessage: ${errorMessage}`);
    dispath(
      authSlice.actions.showError({
        error: error.message,
      })
    );
  }
};

export const authStateChangeUser = () => async (dispath, getState) => {
  onAuthStateChanged(auth, (user) => {
    console.log("user =>=>=> ", user);
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickname: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
      };
      dispath(authSlice.actions.updateUserProfile(userUpdateProfile));
      dispath(authSlice.actions.authStateChage({ stateChange: true }));
    }
  });
};

export const authUpdateAvatar =
  ({ photoURL, isRegestration }) =>
  async (dispath, getState) => {
    console.log("isRegestration", isRegestration);
    if (isRegestration) {
      const userUpdateProfile = {
        photoURL: photoURL,
      };

      dispath(authSlice.actions.updateUserAvatar(userUpdateProfile));
      return;
    }
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("photoURL,", photoURL);
        await updateProfile(auth.currentUser, { photoURL });
        console.log("auth.currentUser", auth.currentUser);
        // console.log("X1");
        const userUpdateProfile = {
          photoURL: photoURL,
        };

        await updateProfile(auth.currentUser, userUpdateProfile);

        dispath(authSlice.actions.updateUserAvatar(userUpdateProfile));
      }
    });
  };
