import { connect } from 'react-redux';
import { addTodo, deleteTodo, onChangeTodo } from '../actions';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { Backdrop, Button, Container, Fab, Fade, Grid, Modal, TextField } from '@material-ui/core';
import ChannelCard from '../components/channel-card';
import EntityTable from '../components/entity-table';
import { addEntity } from '../actions/entity_action';
import { useMutation } from '@apollo/client';
import { M_ADD_ENTITY } from '../constants/gqlQueries';

const Entity = (props) => {

    const { item, data } = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch();
    const [add_entity] = useMutation(M_ADD_ENTITY); // For GQL

    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({
        name: '', identification: '', project: '', legal: 'authority', phone: '', address1: '', address2: '', city: '', zip: '', country: '', members: ['001']
    });

    // Modal
    const handleOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const onAddEntity = async (e) => {
        e.preventDefault();
        try {
            console.log(values);
            let result = await add_entity({
                variables: {
                    obj: values
                }

            });
            console.log(result);
            alert("Successfully Added");
        } catch (error) {
            console.log(error);
            alert("There is something wrong in your data");
        }

    }

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
                    <div className="channel-modal-content overflow-y-auto">
                        <h6 className="fg-color-primary mb-4">Ajouter un channel</h6>
                        <form action="/" method="POST" onSubmit={onAddEntity}>
                            <div className="form-group">
                                <label htmlFor=""><b>Nom</b></label>
                                <input value={values.name} onChange={handleChange('name')} type="text" className="form-control" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Identification</b></label>
                                <input value={values.identification} onChange={handleChange('identification')} type="number" className="form-control" required />
                            </div>
                            <div className="d-flex">
                                <div className="form-group w-50">
                                    <label htmlFor=""><b>Legal</b></label>
                                    <select value={values.legal} onChange={handleChange('legal')}  className="form-control">
                                        <option value="authority">Authority</option>
                                        <option value="company">Company</option>
                                        <option value="association">Association</option>
                                    </select>
                                </div>
                                <div className="form-group w-50 ml-2">
                                    <label htmlFor=""><b>Telephone</b></label>
                                    <input value={values.phone} onChange={handleChange('phone')} type="number" className="form-control" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Address (ligne 1)</b></label>
                                <input value={values.address1} onChange={handleChange('address1')} type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Address (ligne 2)</b></label>
                                <input value={values.address2} onChange={handleChange('address2')} type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Ville</b></label>
                                <input value={values.country} onChange={handleChange('country')} type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Code postal</b></label>
                                <input value={values.zip} onChange={handleChange('zip')} type="number" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Pays</b></label>
                                <input value={values.city} onChange={handleChange('city')} type="text" className="form-control" />
                            </div>

                            <Fab variant="extended" size="medium" className="bk-color-primary f-11" type="submit"><span className="ml-4 mr-4 text-white">Valider</span></Fab>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </Container>
    );
};

export default connect()(Entity);