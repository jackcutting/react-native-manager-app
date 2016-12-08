import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

// import authBackground from '../images/auth-bg.png';

const authBackground = require('../images/auth-bg.png');
const managrLogo = require('../images/managr-logo.png');

const { height, width } = Dimensions.get('window');

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
        <CardSection style={styles.errorContainerStyle}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </CardSection>
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
          resizeMode="cover"
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

                {this.renderErrors()}

              </Card>
              <View style={{ flex: 0, height: 46, marginTop: 20 }}>
                {this.renderButton()}
              </View>
            </View>
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
  },
  loginFormStyle: {
    width: 300
  },
  errorContainerStyle: {
    padding: 10,
    backgroundColor: '#f33'
  },
  errorTextStyle: {
    flex: 1,
    fontSize: 15,
    alignSelf: 'center',
    color: '#fff',
    textAlign: 'center'
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
