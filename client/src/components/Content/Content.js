import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tasksActions from '../../redux/tasks/tasksActions';
import * as usersActions from '../../redux/users/usersActions';
import TaskCard from './taskCard';
import styles from '../../styles/ContentStyle';

class Content extends Component {

  componentDidMount() {
    const { getDataTasks, getDataUsers } = this.props;

    getDataTasks('/task');
    getDataUsers('/user');
  }
  
  renderCards(value) {
    const { tasks: { tasks, filter} } = this.props;
    console.log(tasks);
    let listCards = []
    if (tasks) {
      listCards = tasks
      .filter((task) => (task.status === value.toLowerCase() && task.title.toLowerCase().includes(filter)))
      .map((task) => {
        return(
          <Fragment key={task.id}>
            <TaskCard 
            title={task.title}
            description={task.description}
            status={task.status}
            id={task.id}
            assignedTo={task.assignedTo}
          />
          </Fragment>
        );
      });
    }
    return listCards;
  }

  renderPapers() {
    const options = ['Open', 'In-Progress', 'Completed', 'Archived']
    const { classes } = this.props;

    const table = options.map((value) => {
      return(
        <Paper className={classes.paper} elevation={1} key={value}>
          <Typography variant="h5" component="h3">
            {value}
          </Typography>
          {this.renderCards(value)}
        </Paper>
      );
    });

    return table;
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        {this.renderPapers()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...tasksActions, ...usersActions }, dispatch);
}

// Get the specific data from the store
const mapStateToProps = state => ({
  tasks: state.tasks,
  users: state.users,
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Content));