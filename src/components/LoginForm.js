import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

const { height, width } = Dimensions.get('window');

class LoginForm extends Component {
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
        <KeyboardAvoidingView behavior="height" style={styles.loginWrapperStyle}>
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

            <CardSection>
              {this.renderButton()}
            </CardSection>
            {this.renderErrors()}
          </Card>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginContainerStyle: {
    flex: 1
  },
  loginWrapperStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
