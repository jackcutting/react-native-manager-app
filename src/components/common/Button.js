import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, buttonTextStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={buttonTextStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#e77c6e',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e77c6e',
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 15,
    paddingBottom: 15
  },
  buttonTextStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '600'
  }
});

export { Button };
