import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { loginUserSuccess } from '../actions';
import { Spinner } from './common';

const authBackground = require('../images/auth-bg.png');

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
      <View style={styles.loginContainerStyle}>
        <Image
          source={authBackground}
          // source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
          style={styles.backgroundImageStyle}
          resizeMode="cover"
        >
          <View style={styles.loadingStyle}>
            <Spinner size="large" />
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginContainerStyle: {
    flex: 1,
  },
  backgroundImageStyle: {
    flex: 1,
    // width: 300,
    // height: 300,
    // backgroundColor: '#f0f'
    // resizeMode: 'cover'
    // position: 'absolute',
  },
  loadingStyle: {
    // flex: 0,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

const mapStateToProps = ({ auth }) => {
  const { appLoading } = auth;
  return { appLoading };
};

export default connect(mapStateToProps, { loginUserSuccess })(LoginForm);
