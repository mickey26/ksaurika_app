const UPLOAD_POST_STATE = {
  post_title: '',
  post_heading: '',
  post_category: '',
  post_content: '',
};

export default function UplaodPostReducers(state = UPLOAD_POST_STATE, action) {
  
  switch (action.type) {
    case 'TITLE_DATA':
      return {
        ...state,
        post_title: action.payload,
      };
    case 'HEADING_DATA':
      return {
        ...state,
        post_heading: action.payload,
      };
    case 'CATEGORY_DATA':
      return {
        ...state,
        post_category: action.payload,
      };
    case 'CONTENT_DATA':
      return {
        ...state,
        post_content: action.payload,
      };
    case 'CLEAR_DATA':
      return {
        post_title: '',
        post_heading: '',
        post_category: '',
        post_content: '',
      };
    default:
      return {
        ...state,
      };
  }
}
