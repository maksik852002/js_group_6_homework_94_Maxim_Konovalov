import axiosApi from "../../axiosApi";

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';

export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';

export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';

export const fetchPostsSuccess = posts => ({type: FETCH_POSTS_SUCCESS, posts});
export const createPostSuccess = () => ({type: CREATE_POST_SUCCESS});
export const fetchPostSuccess = post => ({type: FETCH_POST_SUCCESS, post});
export const fetchTagsSuccess = tags => ({type: FETCH_TAGS_SUCCESS, tags});

export const fetchPosts = () => {
  return async (dispatch) => {
    // let url = '/products';

    // if (categoryId) {
    //   url += '?category=' + categoryId;
    // }

    const response = await axiosApi.get('/posts');
    dispatch(fetchPostsSuccess(response.data));
  };
};

export const fetchTags = () => {
  return async dispatch => {
    const response = await axiosApi.get('/posts/tags');

    dispatch(fetchTagsSuccess(response.data));
  }
};

export const createPost = PostData => {
  return async (dispatch) => {
    await axiosApi.post('/posts', PostData);
    dispatch(createPostSuccess());
  };
};

export const fetchPost = id => {
  return async dispatch => {
    const response = await axiosApi.get('/posts/' + id);
    dispatch(fetchPostSuccess(response.data));
  }
};