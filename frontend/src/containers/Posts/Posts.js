import React, {Component} from 'react';
import {fetchPosts} from "../../store/actions/postsActions";
import {closeSubscribeModal} from '../../store/actions/mainActions';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Post from "../../components/Post/Post";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import Modal from '../../components/UI/Modal/Modal';


class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.subscription.length !== prevProps.user.subscription.length) {
      this.props.fetchPosts();
    }
  }

  render() {
    return (
      <>
      <Modal open={this.props.modalOpen} close={this.props.closeSubscribeModal}/>
      <Box mt={3}>
        <Grid container direction="column" spacing={2}>
          <Grid item container direction="row" justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h4">
                Posts
              </Typography>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                component={Link}
                to={"/posts/new"}
              >
                Add new post
              </Button>
            </Grid>
          </Grid>

          <Grid item container direction="row" spacing={1}>
            {this.props.posts.map(post => (
              <Post
                key={post._id}
                title={post.title}
                id={post._id}
                datetime={post.datetime}
                image={post.image}
                author={post.user}
              />
            ))}
          </Grid>
        </Grid>
      </Box>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  posts: state.posts.posts,
  modalOpen: state.main.modalOpen
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
  closeSubscribeModal: () => dispatch(closeSubscribeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
