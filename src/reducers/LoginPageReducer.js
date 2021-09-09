const INITIAL_STATE = {
  userDetail: {},
  userEmail: '',
  userToken: '',
  allPosts: [],
  isLogin: false,
  categoryList: {},
};

export default function LoginPageReducer(state = INITIAL_STATE, action) {
  console.log(action, 'action');
  switch (action.type) {
    case 'SET_USERNAME_AND_TOKEN':
      return {
        ...state,
        userEmail: action.payload.email,
        userToken: action.payload.token,
        userDetail: action.payload,
      };
    case 'IS_LOGIN':
      return {
        ...state,
        isLogin: true,
        userEmail: action.payload.email,
        userToken: action.payload.token,
        userDetail: action.payload,
      };
    case 'LOGGED_OUT':
      return {
        ...state,
        isLogin: false,
        userEmail: '',
        userToken: '',
      };
    case 'SET_ALL_DATA':
      return {
        ...state,
        allPosts: action.payload,
      };
    case 'CATEGORY LIST':
      return {
        ...state,
        categoryList: action.payload,
      };
    default:
      return state;
  }
}
