import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tasksActions from '../../redux/tasks/tasksActions';
import styles from '../../styles/ContentStyle';

class taskCard extends Component {
  constructor(props) {
    super(props);
    this.handleStatus = this.handleStatus.bind(this);
  }

  handleStatus(e) {
    const { title, description, status, id, assignedTo } = this.props;
    const { putDataTasks } = this.props;
    const endpoint = `/task/${id}`;
    
    console.log(e.target.value);
    putDataTasks(endpoint, {
      title,
      description,
      status: e.target.value,
      assignedTo
    });
  }

  render() {
    const { title, description, status, id } = this.props;
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Edit
          </Button>
          <Select
            value={status}
            onChange={this.handleStatus}
            displayEmpty
          >
            <MenuItem value='open' disabled={status === 'open'}>Open</MenuItem>
            <MenuItem value='in-progress' disabled={status === 'in-progress'}>In-Progress</MenuItem>
            <MenuItem value='completed' disabled={status === 'completed'}>Completed</MenuItem>
            <MenuItem value='archived' disabled={status === 'archived'}>Archived</MenuItem>
          </Select>
        </CardActions>
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...tasksActions }, dispatch);
}

// Get the specific data from the store
const mapStateToProps = state => ({
  tasks: state.tasks,
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(taskCard));
