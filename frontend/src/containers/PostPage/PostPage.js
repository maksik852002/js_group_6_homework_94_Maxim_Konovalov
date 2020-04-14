import React, {Component} from 'react';
import {EditorState, convertFromRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import {fetchPost} from "../../store/actions/postsActions";
import {connect} from "react-redux";

class ProductPage extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  getText = () => {
    try {
      const text = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.post.text)));
      return <Editor readOnly toolbarHidden editorState={text}/>;
    } catch (e) {
      return "No text available";
    }
  };

  render() {
    if (!this.props.post) return null;

    return (
      <div>
        <h1>{this.props.post.title}</h1>
        {this.getText()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.posts.post
});

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);