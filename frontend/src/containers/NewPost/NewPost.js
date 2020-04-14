import React, {Component, Fragment} from 'react';
import PostForm from "../../components/PostForm/PostForm";
import {createPost, fetchTags} from "../../store/actions/postsActions";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

class NewPost extends Component {
  componentDidMount() {
    this.props.fetchTags();
  }

  createPost = async (postData) => {
    await this.props.createPost(postData);
    this.props.history.push('/');
  };

  render() {
    return (
      <Fragment>
        <Box pb={2} pt={2}>
          <Typography variant="h4">New Post</Typography>
        </Box>

        <PostForm
          onSubmit={this.createPost}
          tags={this.props.tags}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  tags: state.posts.tags
});

const mapDispatchToProps = dispatch => ({
  createPost: postData => dispatch(createPost(postData)),
  fetchTags: () => dispatch(fetchTags()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);