import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, AlertIOS } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import { logoutUser } from '../actions';

class SideMenuItem extends Component {
  onRowPress() {
    const action = this.props.item.action;
    AlertIOS.alert('action: ', this.props.item.action);
    this.props.closeDrawer();
    this.props[action]();
  }

  render() {
    const { title } = this.props.item;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection style={styles.listItemStyle}>
            <Text style={styles.titleStyle}>
              {title}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  listItemStyle: {
    // padding: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#222'
  }
});

export default connect(null, { logoutUser })(SideMenuItem);
