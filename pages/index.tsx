import { connect } from 'react-redux';
import { addTodo, deleteTodo, onChangeTodo } from '../actions';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { Backdrop, Button, Container, Fab, Fade, Grid, Modal, TextField } from '@material-ui/core';
import ChannelCard from '../components/channel-card';
import PaginationAction from '../components/pagination-action';

const Channel = (props) => {

  const { item, data } = useSelector((state: RootState) => state.todo);

  ////////////////////// Rows Start ////////////////////////////
  function createData(name, calories, fat) {
    return { name, calories, fat };
  }

  const rows = [
    createData('Cupcake', 305, 3.7),
    createData('Donut', 452, 25.0),
    createData('Eclair', 262, 16.0),
    createData('Frozen yoghurt', 159, 6.0),
    createData('Gingerbread', 356, 16.0),
    createData('Honeycomb', 408, 3.2),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Jelly Bean', 375, 0.0),
    createData('KitKat', 518, 26.0),
    createData('Lollipop', 392, 0.2),
    createData('Marshmallow', 318, 0),
    createData('Nougat', 360, 19.0),
    createData('Oreo', 437, 18.0),
  ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  ////////////////////// Rows End ////////////////////////////

  ////////////////////// Modal Start ////////////////////////////
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleOpen = () => {
    console.log('ENTER');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  ////////////////////// Modal End ////////////////////////////

  return (
    <Container>
      <div className="d-flex  justify-bt">
        <div className="content-title">Channels</div>
        <Fab onClick={handleOpen} variant="extended" size="medium" className="bk-color-primary float-right mt-4"><span className="ml-4 mr-4 text-white text-case-none"><b>Ajouter une channels +</b></span></Fab>
      </div>

      <Grid container spacing={1}>
        {(rowsPerPage > 0
          ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : rows
        ).map((row) => (
          <Grid item xs={12} sm={6} md={3}><ChannelCard ctitle={row.name}/></Grid>
        ))}
        {emptyRows > 0 && (
          true
        )}

      </Grid>

      <div className="mt-4 mb-4">
        <span>{page * rowsPerPage + 1}-{Math.min((page+1) * rowsPerPage, rows.length)} sur {rows.length} channels</span>
        <div className="float-right">
          <PaginationAction
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
          />
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="channel-modal-layout"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="channel-modal-content">
            <h6 className="fg-color-primary mt-2 mb-2">Ajouter un channel</h6>
            <form action="/" method="POST">
              <div className="form-group">
                <label htmlFor=""><b>Nom</b></label>
                <input value={values.weight} onChange={handleChange('weight')} type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor=""><b>Description</b></label>
                <textarea name="" id="" cols={30} rows={2} className="form-control"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor=""><b>Cover</b></label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor=""><b>Source</b></label>
                <select name="" id="" className="form-control">
                  <option value="1">AAA</option>
                  <option value="2">BBB</option>
                  <option value="3">CCC</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor=""><b>Identification</b></label>
                <input type="text" className="form-control" />
              </div>
              <Fab variant="extended" size="medium" className="bk-color-primary"><span className="ml-4 mr-4 text-white">Valider</span></Fab>
            </form>
          </div>
        </Fade>
      </Modal>
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

export default connect()(Channel);