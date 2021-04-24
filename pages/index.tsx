import { connect } from 'react-redux';
import { addTodo, deleteTodo, onChangeTodo } from '../actions';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { Button, Container, Grid, TextField } from '@material-ui/core';
import ChannelCard from '../components/channel-card';

const Todo = (props) => {

  const { item, data } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  console.log(item);

  return (
    <Container>
      <p className="content-title">Channels</p>


      
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3}><ChannelCard></ChannelCard></Grid>
        <Grid item xs={12} sm={6} md={3}><ChannelCard></ChannelCard></Grid>
        <Grid item xs={12} sm={6} md={3}><ChannelCard></ChannelCard></Grid>
        <Grid item xs={12} sm={6} md={3}><ChannelCard></ChannelCard></Grid>
        <Grid item xs={12} sm={6} md={3}><ChannelCard></ChannelCard></Grid>
        <Grid item xs={12} sm={6} md={3}><ChannelCard></ChannelCard></Grid>
        <Grid item xs={12} sm={6} md={3}><ChannelCard></ChannelCard></Grid>
        <Grid item xs={12} sm={6} md={3}><ChannelCard></ChannelCard></Grid>
      </Grid>
    </Container>
    // <React.Fragment>
    //   <form onSubmit={(e) => {
    //     e.preventDefault();
    //     dispatch(addTodo({
    //       value: item.value,
    //     }));
    //   }}>
    //     <TextField id="standard-basic" type="text" value={item.value} label="Input Value"
    //       onChange={e => dispatch(onChangeTodo({ value: e.target.value, }))} />
    //     <br />
    //     <input type="submit" value="SUBMIT" style={{ display: 'none', }}/>
    //   </form>
    //   <hr />
    //   {data.map((item, index) => (
    //     <p key={index}>
    //       {item.value}
    //       {' '}
    //       <Button onClick={() => dispatch(deleteTodo(item))} variant="contained" color="primary" >
    //         DELETE
    //       </Button>
    //     </p>
    //   ))}
    // </React.Fragment>
  );
};

export default connect()(Todo);