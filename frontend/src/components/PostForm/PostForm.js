import React, {Component} from 'react';
import FormElement from "../UI/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class PostForm extends Component {
  state = {
    title: '',
    image: '',
    text: null,
    tags: '[]'
  };

  submitFormHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      let value = this.state[key];

      if (key === 'text') {
        value = JSON.stringify(value)
      }

      formData.append(key, value);
    });

    this.props.onSubmit(formData);
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  fileChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.files[0]
    })
  };

  editorChangeHandler = text => {
    this.setState({text});
  };

  tagsChangeHandler = (e, tags) => {
    this.setState({tags: JSON.stringify(tags)})
  };

  render() {
    return (
      <form onSubmit={this.submitFormHandler}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <FormElement
              type="text"
              propertyName="title" 
              // required
              title="Title"
              placeholder="Enter post title"
              onChange={this.inputChangeHandler}
              value={this.state.title}
            />
          </Grid>
          <Grid item xs>
            <FormElement
              type="wysiwyg"
              propertyName="text"
              title="Text"
              onChange={this.editorChangeHandler}
            />
          </Grid>
          <Grid item xs>
            <FormElement
              type="file"
              propertyName="image"
              title="Image"
              onChange={this.fileChangeHandler}
            />
          </Grid>
          <Grid item xs>
            <FormElement
              propertyName="tags"
              title="Tags"
              onChange={this.tagsChangeHandler}
              type="tags"
              tags={this.props.tags}
              value={JSON.parse(this.state.tags)}
            />
          </Grid>
          <Grid item xs>
            <Button type="submit" color="primary" variant="contained">Save</Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default PostForm;