import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions, Scene, Router } from 'react-native-router-flux';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import { logoutUser } from './actions';

class RouterComponent extends Component {
  componentWillMount() {
    console.log(this.props);
  }

  render() {
    return (
      <Router>
        <Scene key="loading" initial>
          <Scene key="home" component={Home} title="Home" hideNavBar />
        </Scene>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Please Login" hideNavBar />
        </Scene>
        <Scene key="main" navigationBarStyle={styles.navBarStyle}>
          <Scene
            key="employeeList"
            component={EmployeeList}
            title="Employees"
            titleStyle={styles.titleStyle}
            rightTitle="Add"
            onRight={() => Actions.employeeCreate()}
            leftTitle="Logout"
            onLeft={() => this.props.logoutUser()}
            leftButtonTextStyle={styles.buttonStyle}
            rightButtonTextStyle={styles.buttonStyle}
            initial
            sceneStyle={{ paddingTop: 65 }}
          />
          <Scene
            key="employeeCreate"
            component={EmployeeCreate}
            title="Create Employee"
            titleStyle={styles.titleStyle}
            leftButtonTextStyle={styles.buttonStyle}
            rightButtonTextStyle={styles.buttonStyle}
            sceneStyle={{ paddingTop: 65 }}
          />
          <Scene
            key="employeeEdit"
            component={EmployeeEdit}
            title="Edit Employee"
            titleStyle={styles.titleStyle}
            leftButtonTextStyle={styles.buttonStyle}
            rightButtonTextStyle={styles.buttonStyle}
            sceneStyle={{ paddingTop: 65 }}
          />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  navBarStyle: {
    backgroundColor: '#e77c6e'
  },
  titleStyle: {
    color: '#fff'
  },
  buttonStyle: {
    color: '#fff'
  }
});

const mapStateToProps = (state) => {
  const appState = { ...state };
  return appState;
};

export default connect(mapStateToProps, { logoutUser })(RouterComponent);
