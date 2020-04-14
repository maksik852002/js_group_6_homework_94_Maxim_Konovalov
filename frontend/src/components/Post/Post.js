import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {makeStyles} from "@material-ui/core/styles";
import imageNotAvailable from "../../assets/images/image_not_available.jpg";
import {apiURL} from "../../constants";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  title: {
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Post = props => {
  const classes = useStyles();

  let image = imageNotAvailable;

  if (props.image) {
    image = apiURL + '/' + props.image;
  }

  const date = moment(props.datetime).calendar();
  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card className={classes.card}>
        <Grid container direction='column'>
          <CardHeader title={props.title} className={classes.title}/>
          <Box px={2} pb={2}>
            <Grid item container justify='space-between' alignItems='center'>
              <Grid item >
                <small>{date}</small>
              </Grid>
              <Grid item>
                <small> @by {props.author.displayName} ({props.author.username}) </small>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <CardMedia image={image} title={props.title} className={classes.media}/>
        <CardActions>
          <Grid container justify='flex-end'>
            <Button
              component={Link} to={'/posts/' + props.id}
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<ArrowForwardIcon />}  
            >
              More
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

Post.propTypes = {
  image: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Post;