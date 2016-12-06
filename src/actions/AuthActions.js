import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  APP_LOADED
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        AsyncStorage.setItem('@JackCuttingEmployees:user', JSON.stringify(user));
        loginUserSuccess(user);
      })
      .catch((error) => {
        console.log(error);

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(user))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

export const loginUserSuccess = (user) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user
    });
    Actions.main({ type: 'reset' });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    firebase.auth().signOut()
      .then(() => {
        Actions.auth({ type: 'leftToRight' });
      })
      .catch();
  };
};

export const appInitialised = () => {
  return {
    type: APP_LOADED
  };
};
