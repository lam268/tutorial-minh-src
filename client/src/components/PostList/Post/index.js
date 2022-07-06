import React from 'react';
import { 
  Avatar, 
  Card, 
  CardActions, 
  CardContent, 
  CardHeader, 
  CardMedia, 
  IconButton, 
  Typography, 
} from '@material-ui/core';
//import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import useStyle from './styles';
import { useDispatch } from 'react-redux'
import { updatePost } from '../../../redux/actions';
import { deletePost } from '../../../redux/actions';


export default function Post({ post }) {
  const classes = useStyle();
  const dispatch = useDispatch();

  const onlikeBtnClick = React.useCallback(() => {
    dispatch(updatePost.updatePostRequest({...post, likeCount: post.likeCount + 1}));
  }, [dispatch, post]);

  const deleteBtnClick = React.useCallback(() => {
    dispatch(deletePost.deletePostRequest({...post, deletePost}));
  }, [dispatch, post]);

  return (
    <Card>
      <CardHeader 
        avatar={<Avatar>A</Avatar>} 
        title={post?.author?.userName || 'Anonymous'}
        subheader={moment(post.createdAt).format('HH:mm MMM DD, YYYY')}
        /*action={
          <IconButton>
            <MoreVertIcon />      
          </IconButton>  
        }*/
      />  
      <CardMedia 
        image={post.attachment || ''} 
        title='Title'
        className={classes.media}
      /> 
      
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
        <Typography variant='h5' color='textPrimary'>
          {post.title}
        </Typography>  
        <Typography variant='body2' component='p' color='textSecondary'>
          {post.content}
        </Typography>  
      </CardContent>

      <CardActions>
        <IconButton onClick={onlikeBtnClick}>
          <FavoriteIcon />
          <Typography component='span' color='textSecondary' >
          {`${post.likeCount} likes`}
          </Typography>
        </IconButton> 
        <IconButton onClick={deleteBtnClick}>
          <DeleteIcon />
          <Typography component='span' color='textSecondary' >
            Delete
          </Typography>
        </IconButton> 
      </CardActions>
    </Card>
  );  
}