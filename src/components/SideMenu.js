import React, { Component } from 'react';
import { View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import SideMenuItem from './SideMenuItem';

class SideMenu extends Component {
    componentWillMount() {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });

      this.dataSource = ds.cloneWithRows(this.props.sideMenuItems);
    }

    onRowPress(method) {
      this[method]();
    }

    renderRow(item) {
      return <SideMenuItem item={item} closeDrawer={this.props.closeDrawer} />;
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
  },
  listItemStyle: {
    // padding: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#222'
  }
});

const mapStateToProps = ({ sideMenuItems }) => {
  return { sideMenuItems };
};

export default connect(mapStateToProps)(SideMenu);
