import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { loginUserSuccess } from '../actions';

class LoginForm extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.props.loginUserSuccess(user);
        console.log(user);
      } else if (user == null) {
        Actions.auth({ type: 'reset' });
      }
    });
  }

  render() {
    return (
      <Text>Hello!</Text>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { appLoading } = auth;
  return { appLoading };
};

export default connect(mapStateToProps, { loginUserSuccess })(LoginForm);
