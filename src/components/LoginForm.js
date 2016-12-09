import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

// import authBackground from '../images/auth-bg.png';

const authBackground = require('../images/bg.jpg');
const managrLogo = require('../images/managr-logo.png');

class LoginForm extends Component {
//   componentWillMount() {
//     Alert.alert(
//       'Dimension',
//       `Height: ${height}
// Width: ${width}`,
//       [
//         { text: 'OK', onPress: () => console.log('OK Pressed') },
//       ]
//     );
//   }


  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderLoader() {
    if (this.props.loading) {
      return (
        <View style={styles.loadingStyle}>
          <Spinner size="large" />
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  renderErrors() {
    if (this.props.error) {
      return (
        <View style={styles.errorContainerStyle}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.loginContainerStyle}>
        <Image
          source={authBackground}
          // source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
          style={styles.backgroundImageStyle}
          // resizeMode="cover"
        >
          <KeyboardAvoidingView behavior="padding" style={styles.loginWrapperStyle}>
            <View style={{ position: 'relative' }}>
              <Image source={managrLogo} style={styles.logoStyle} />
              <Card style={styles.loginFormStyle}>
                <CardSection>
                  <Input
                    // label="Email"
                    placeholder="Email Address"
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                    keyboardType="email-address"
                    returnKeyType="next"
                  />
                </CardSection>

                <CardSection>
                  <Input
                    secureTextEntry
                    placeholder="Password"
                    // placeholder="password"
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                  />
                </CardSection>


              </Card>
              {this.renderErrors()}
              <View style={{ flex: 0, height: 46, marginTop: 20 }}>
                <Button onPress={this.onButtonPress.bind(this)}>
                  Login
                </Button>
              </View>
            </View>
            {this.renderLoader()}
          </KeyboardAvoidingView>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoStyle: {
    position: 'absolute',
    top: -100,
    left: 100,
    height: 100,
    width: 100,
  },
  loginContainerStyle: {
    flex: 1,
  },
  backgroundImageStyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
    // width: 300,
    // height: 300,
    // backgroundColor: '#f0f'
    // resizeMode: 'cover'
    // position: 'absolute',
  },
  loginWrapperStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 100,
    position: 'relative',
  },
  loginFormStyle: {
    width: 300,
  },
  errorContainerStyle: {
    padding: 10,
    backgroundColor: '#f33',
    flex: 0,
    width: 300,
    alignSelf: 'center',
  },
  errorTextStyle: {
    flex: 0,
    fontSize: 15,
    alignSelf: 'center',
    color: '#fff',
    textAlign: 'center',
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
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
