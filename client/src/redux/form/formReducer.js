import { 
    FORM_TITLE, FORM_DESC,
    FORM_USERS, FORM_DEL_USERS, FORM_OPEN_NEW, FORM_OPEN_EDIT, FORM_CLOSE
} from './formTypes';

const initialState = {
  show: false,
  formType: 'create',
  loading: false,
  error: null,
  id: '',
  title: 'Unnamed Task',
  description: '',
  status: 'open',
  assignedTo: [],
};

export default (state = initialState, action) => {
  const { assignedTo } = state;
  switch (action.type) {
    case FORM_OPEN_NEW:
      return {
        ...state,
        show: true,
        id: '',
        title: 'Unnamed Task',
        description: '',
        status: 'open',
        assignedTo: [],
        formType: action.payload.type,
      };
    case FORM_OPEN_EDIT:
      const body = action.payload;
      return {
        ...state,
        show: true,
        id: body.id,
        title: body.title,
        description: body.description,
        status: body.status,
        assignedTo: body.assignedTo,
        formType: body.type,
      };
      case FORM_CLOSE:
      return {
        ...state,
        show: false,
      };
    case FORM_DESC:
        return {
            ...state,
            description: action.payload.description,
        };
    case FORM_TITLE:
        return {
        ...state,
        title: action.payload.title,
        };
    case FORM_USERS:
        assignedTo.push(action.payload.user)
        return {
            ...state,
            assignedTo: assignedTo,
        };
    case FORM_DEL_USERS:
        const newList = assignedTo.filter((user) => user.name !== action.payload.username);
        return {
            ...state,
            assignedTo: newList,
        };
    default:
      return state;
  }
};