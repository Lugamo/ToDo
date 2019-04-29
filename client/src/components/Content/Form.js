import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

import * as formActions from '../../redux/form/formActions';
import * as taskActions from '../../redux/tasks/tasksActions';
import styles from '../../styles/FormStyle';

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDesc = this.handleDesc.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.handleDelUser = this.handleDelUser.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  handleTitle(e) {
    const { handleTitle } = this.props;
    handleTitle(e.target.value);
  }

  handleDesc(e) {
    const { handleDescription  } = this.props;
    handleDescription(e.target.value);
  }

  handleUser(e) {
    const { handleUsers, users: { users } } = this.props;
    const id = users.filter(user => user.name === e.target.value);

    handleUsers({
        name: e.target.value,
        id: id[0].id,
    })
  }

  handleDelUser(name) {
    const { handleDelUsers } = this.props;
    handleDelUsers(name);
  }

  handleUserOptions() {
    const { users: { users } } = this.props;
    const { form: { assignedTo } } = this.props;
    const assignName = assignedTo.map((user) => user.name);
    const list = users.filter((user) => assignName.indexOf(user.name) === -1);
    return list;
  }

  handleEdit() {
    const { putDataTasks , closeForm } = this.props;
    const { form: { id, assignedTo, title, description, status } } = this.props; 
    const endpoint = `/task/${id}`;
    const body = {
        id,
        title,
        description,
        status,
        assignedTo,
    }
    putDataTasks(endpoint, body);
    closeForm();
  }

  handleNew() {
    const { postDataTasks , closeForm } = this.props;
    const { form: { assignedTo, title, description, status } } = this.props; 
    const endpoint = `/task`;
    const body = {
        title,
        description,
        status,
        assignedTo,
    }
    postDataTasks(endpoint, body);
    closeForm();
  }

  render() {
    const { classes, closeForm } = this.props;
    const { form: { formType, assignedTo, title, show, description } } = this.props;
    const userOptions = this.handleUserOptions();

    return (
      <Dialog
        open={show}
        onClose={() => closeForm()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{formType === 'edit' ? 'Edit Task' : 'New Task'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {formType === 'edit'
              ? ('To Edit the Task you have to change the following fields')
              : ('To create a new Task you have to fill the following fields.')
            }
          </DialogContentText>
          <TextField
            autoFocus
            variant="outlined"
            value={title}
            onChange={this.handleTitle}
            margin="dense"
            label="Clip Name"
            fullWidth
            className={classes.separateTop}
          />
          <TextField
            label="Description"
            multiline
            rows="4"
            value={description}
            className={classes.separateTop}
            onChange={this.handleDesc}
            placeholder="Task description info"
            margin="normal"
            variant="outlined"
            fullWidth
            />
          <Typography gutterBottom variant="body1" className={classes.separateTop}>
              Assign users to the task:
          </Typography>
          <TextField
            id="outlined-select-currency"
            disabled={userOptions.length === 0}
            select
            label="Select"
            fullWidth
            className={classes.separateTop}
            value={'None'}
            onChange={this.handleUser}
            SelectProps={{
                MenuProps: {
                className: classes.menu,
                },
            }}
            margin="normal"
            variant="outlined"
            >
            {userOptions.map(option => (
                <MenuItem key={option.id} value={option.name}>
                    {option.name}
                </MenuItem>
            ))}
            </TextField>
          {assignedTo.length > 0
              && (
                <Fragment>
                  <Typography variant="body2" className={classes.separateTop}>
                    Assigned To:
                  </Typography>
                  <div className={classes.rootChip}>
                    {assignedTo.map((data, index) => (
                      <Chip
                        key={`${data.name}${index}`}
                        label={`${data.name}`}
                        onDelete={() => this.handleDelUser(data.name)}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                </Fragment>
              )
            }
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeForm()}>
              Cancel
          </Button>
          {formType === 'create'
            ? (
              <Button color="primary" onClick={this.handleNew}>
                  Create Task
              </Button>
            ) : (
              <Button  color="primary" onClick={this.handleEdit}>
                  Edit Task
              </Button>
            )}
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  form: state.form,
  users: state.users,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...formActions, ...taskActions }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Form));