import React from 'react';
import { Container, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from "react-redux";

import Header from '../components/Header';
import PostList from '../components/PostList';
import useStyles from './styles';
import { showModal } from '../redux/actions';
import CreatePostModal from '../components/CreatePostModal';
import { authState$ } from '../redux/selectors';

export default function HomePage() {
  //const [posts, search] = React.useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLogined, userName } = useSelector(authState$);

  const openCreatePostModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);

  return (
    <Container maxWidth='lg'>
      <Header />

      <PostList />
      <CreatePostModal />
      <Fab 
        disabled={!isLogined}
        color='primary' 
        className={classes.fab} 
        onClick={openCreatePostModal}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}