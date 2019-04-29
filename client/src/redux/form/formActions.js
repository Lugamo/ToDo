import { 
    FORM_TITLE, FORM_DESC,
    FORM_USERS, FORM_DEL_USERS, FORM_OPEN_EDIT, FORM_OPEN_NEW, FORM_CLOSE
} from './formTypes';

function handleTitle(name) {
    return (dispatch) => {
      dispatch({
        type: FORM_TITLE,
        payload: {
          title: name,
        },
      });
    }
}

function handleDescription(name) {
    return (dispatch) => {
      dispatch({
        type: FORM_DESC,
        payload: {
          description: name,
        },
      });
    }
}

function handleUsers(user) {
    return (dispatch) => {
      dispatch({
        type: FORM_USERS,
        payload: {
          user,
        },
      });
    }
}

function handleDelUsers(username) {
    return (dispatch) => {
      dispatch({
        type: FORM_DEL_USERS,
        payload: {
          username,
        },
      });
    }
}

function openForm(body) {
    if (body.id === '') {
        return (dispatch) => {
            dispatch({
                type: FORM_OPEN_NEW,
                payload:{
                    type: body.type,
                }
            });
        }
    } else {
        return (dispatch) => {
            dispatch({
                type: FORM_OPEN_EDIT,
                payload: {
                    title: body.title,
                    id: body.id,
                    description: body.description,
                    assignedTo: body.assignedTo,
                    status: body.status,
                    type: body.type,
                }
            });
        }
    }
}

function closeForm(){
    return (dispatch) => {
        dispatch({
            type: FORM_CLOSE,
        });
    }
}

export {
  handleTitle,
  handleDescription,
  handleUsers,
  handleDelUsers,
  openForm,
  closeForm,
}