import { connect } from 'react-redux';
import { addTodo, deleteTodo, onChangeTodo } from '../actions';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { Backdrop, Button, Checkbox, Container, Fab, Fade, Grid, Modal, TextField } from '@material-ui/core';
import GroupTable from '../components/group-table';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

const Group = (props) => {

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
                <div className="content-title">Group</div>
                <Fab onClick={handleOpen} variant="extended" size="medium" className="bk-color-primary float-right mt-4"><span className="ml-4 mr-4 text-white text-case-none"><b>Ajouter un groupe +</b></span></Fab>
            </div>
            <GroupTable></GroupTable>


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
                    <div className="channel-modal-content overflow-y-auto">
                        <h6 className="fg-color-primary mb-4">Ajouter un groupe</h6>
                        <form action="/" method="POST" className="modal-content-scroll">
                            <div className="form-group">
                                <label htmlFor=""><b>Nom</b></label>
                                <input value={values.weight} onChange={handleChange('weight')} type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Utilisateurs</b></label>
                                <div>
                                    <div className="d-flex justify-bt mb-2">
                                        <div>
                                            <CheckIcon className="f-18" />
                                            <span className="mh-auto">John Doe</span>
                                        </div>
                                        <CloseIcon className="float-right f-18 rounded-circle bk-color-secondary" />
                                    </div>
                                    <div className="d-flex justify-bt mb-2">
                                        <div>
                                            <CheckIcon className="f-18" />
                                            <span className="mh-auto">John Doe</span>
                                        </div>
                                        <CloseIcon className="float-right f-18 rounded-circle bk-color-secondary" />
                                    </div>
                                </div>
                                <div className="search-input mb-2 position-relative">
                                    <SearchIcon className="f-18 fg-color-primary" />
                                    <input type="text" className="form-control" />
                                </div>
                                <div>
                                    <div className="form-inline card-body-inline mb-1">
                                        <label htmlFor="">Cnditions meteo</label>
                                        <a href="#" className="float-right text-secondary">
                                            Ajouter
                                            <AddIcon className="f-18 text-white bk-color-primary rounded-circle ml-2" />
                                        </a>
                                    </div>
                                    <div className="form-inline card-body-inline mb-1">
                                        <label htmlFor="">Cnditions meteo</label>
                                        <a href="#" className="float-right text-secondary">
                                            Ajouter
                                            <AddIcon className="f-18 text-white bk-color-primary rounded-circle ml-2" />
                                        </a>
                                    </div>

                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Inviter un utilisateur externe</b></label>
                                <input type="text" className="form-control mb-2" />
                                <input type="text" className="form-control mb-2" />
                                <Fab variant="extended" size="medium" className="bk-color-primary f-11 fab-outlined"><span className="ml-4 mr-4 fg-color-primary text-case-none">Ajouter un utilisateur</span></Fab>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Channel</b></label>
                                <div>
                                    <div>
                                        <div className="d-flex justify-bt mb-2">
                                            <div>
                                                <span className="mh-auto">condition meteo</span>
                                            </div>
                                            <CloseIcon className="float-right f-18 rounded-circle bk-color-secondary" />
                                        </div>
                                        <div className="d-flex group-checkbox justify-bt">
                                            <label><Checkbox color="primary" />Consulter</label>
                                            <label><Checkbox color="primary" />Modifier</label>
                                            <label><Checkbox color="primary" />Supplier</label>
                                            <label></label>
                                        </div>
                                        <hr className="m-0"/>
                                    </div>
                                    <div>
                                        <div className="d-flex justify-bt mb-2">
                                            <div>
                                                <span className="mh-auto">condition meteo</span>
                                            </div>
                                            <CloseIcon className="float-right f-18 rounded-circle bk-color-secondary" />
                                        </div>
                                        <div className="d-flex group-checkbox justify-bt">
                                            <label><Checkbox color="primary" />Consulter</label>
                                            <label><Checkbox color="primary" />Modifier</label>
                                            <label><Checkbox color="primary" />Supplier</label>
                                            <label></label>
                                        </div>
                                        <hr className="m-0"/>
                                    </div>
                                </div>


                                <div className="search-input mb-2 mt-2 position-relative">
                                    <SearchIcon className="f-18 fg-color-primary" />
                                    <input type="text" className="form-control" />
                                </div>
                                <div>
                                    <div className="form-inline card-body-inline mb-1">
                                        <label htmlFor="">Cnditions meteo</label>
                                        <a href="#" className="float-right text-secondary">
                                            Ajouter
                                            <AddIcon className="f-18 text-white bk-color-primary rounded-circle ml-2" />
                                        </a>
                                    </div>
                                    <div className="form-inline card-body-inline mb-1">
                                        <label htmlFor="">Cnditions meteo</label>
                                        <a href="#" className="float-right text-secondary">
                                            Ajouter
                                            <AddIcon className="f-18 text-white bk-color-primary rounded-circle ml-2" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </form>
                        <Fab variant="extended" size="medium" className="bk-color-primary f-11 mt-3"><span className="ml-4 mr-4 text-white">Valider</span></Fab>
                    </div>
                </Fade>
            </Modal>
        </Container>
    );
};

export default connect()(Group);