import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class SideMenu extends Component {
    componentWillMount() {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });

      this.dataSource = ds.cloneWithRows(this.props.sideMenuItems);
    }

    renderRow(item) {
      return (
        <Text>{item.title}</Text>
      );
    }

    render() {
      return (
        <View style={styles.containerStyle}>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingTop: 60,
  }
});

const mapStateToProps = ({ sideMenuItems }) => {
  return { sideMenuItems };
};

export default connect(mapStateToProps)(SideMenu);
