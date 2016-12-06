import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ListItem extends Component {
  onRowPress() {
    Actions.employeeEdit({ employee: this.props.employee });
  }

  render() {
    const { name, shift } = this.props.employee;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection style={styles.itemStyle}>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
            <Text style={styles.textStyle}>{shift}</Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  itemStyle: {
    flexDirection: 'column',
    padding: 15
  },
  titleStyle: {
    fontSize: 18
  },
  textStyle: {
    color: '#e77c6e',
    fontSize: 14
  }
});

export default ListItem;
