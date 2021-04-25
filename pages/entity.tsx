import { connect } from 'react-redux';
import { addTodo, deleteTodo, onChangeTodo } from '../actions';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { Backdrop, Button, Container, Fab, Fade, Grid, Modal, TextField } from '@material-ui/core';
import ChannelCard from '../components/channel-card';
import EntityTable from '../components/entity-table';

const Entity = (props) => {

    const { item, data } = useSelector((state: RootState) => state.todo);

    const [expanded, setExpanded] = React.useState(false);
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

    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <Container>
            <div className="d-flex  justify-bt">
                <div className="content-title">Entity</div>
                <Fab onClick={handleOpen} variant="extended" size="medium" className="bk-color-primary float-right mt-4"><span className="ml-4 mr-4 text-white text-case-none"><b>Ajouter une entite +</b></span></Fab>
            </div>
            <EntityTable></EntityTable>
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
                        <h6 className="fg-color-primary mb-4">Ajouter un channel</h6>
                        <form action="/" method="POST">
                            <div className="form-group">
                                <label htmlFor=""><b>Nom</b></label>
                                <input value={values.weight} onChange={handleChange('weight')} type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Identification</b></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="d-flex">
                                <div className="form-group w-50">
                                    <label htmlFor=""><b>Legal</b></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group w-50 ml-2">
                                    <label htmlFor=""><b>Telephone</b></label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Address (ligne 1)</b></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Address (ligne 2)</b></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Ville</b></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Code postal</b></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Pays</b></label>
                                <input type="text" className="form-control" />
                            </div>

                            <Fab variant="extended" size="medium" className="bk-color-primary f-11"><span className="ml-4 mr-4 text-white">Valider</span></Fab>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </Container>
    );
};

export default connect()(Entity);