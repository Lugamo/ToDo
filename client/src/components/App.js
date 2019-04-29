import React, { Component } from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header/Header';
import Content from './Content/Content';
import styles from '../styles/AppStyle';

class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.myWrapper}>
        <CssBaseline />
        <Header />
        <Content />
      </div>
    );
  }
}

// connect the container with data and actions
export default withTheme()(withStyles(styles)(App));