import React from 'react';
import { View, StyleSheet } from 'react-native';

const CardSection = (props) => {
  const { containerStyle } = styles;

  return (
    <View style={[containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    position: 'relative'
  }
});

export { CardSection };
