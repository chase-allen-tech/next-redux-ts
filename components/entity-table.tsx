import { Backdrop, Fab, Fade, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core';
import React, { useEffect } from 'react';
import PaginationAction from './pagination-action';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CreateIcon from '@material-ui/icons/Create';

import { useQuery } from '@apollo/client';
import { Q_GET_ENTITIES, M_UPDATE_ENTITY, M_DELETE_ENTITY } from '../constants/gqlQueries';
import { useMutation } from '@apollo/client';
import { addEntity } from '../actions/entity_action';
import { useDispatch } from 'react-redux';

const EntityTable = (props) => { 
    // State 
    const [reload, setReload] = React.useState(false); 
    useEffect(() => { setReload(false); })

    // Server data
    const { loading, error, data } = useQuery(Q_GET_ENTITIES, { fetchPolicy: props.reload || reload ? "no-cache" : "cache-and-network" });
    const rows = data != undefined && data.hasOwnProperty("entities") ? data.entities : [];
    const [update_entity] = useMutation(M_UPDATE_ENTITY);
    const [delete_entity] = useMutation(M_DELETE_ENTITY);

    // Store in Redux
    const dispatch = useDispatch();
    dispatch(addEntity(rows));

    // Pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const handleChangePage = (event, newPage) => { setPage(newPage); };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Modal
    const [open, setOpen] = React.useState(false);
    const [identifier, setIdentifier] = React.useState(null);
    const [values, setValues] = React.useState({
        name: '', identification: '', project: '', legal: 'authority', phone: '', address1: '', address2: '', city: '', zip: '', country: '', members: ['001']
    });
    const handleOpen = (id) => {
        setValues(rows[id]);
        setIdentifier(rows[id].identifier);
        setOpen(true);
    };
    const handleClose = () => { setOpen(false); };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // Actions
    const onDeleteEntity = async (id) => {
        if (!confirm("Are you going to delete this record?")) return;
        try {
            console.log(rows[id].identifier);
            let result = await delete_entity({ variables: { obj: rows[id].identifier } });
            console.log(result);
        } catch (error) {
            console.log(error);
        }


    }
    const onEditEntity = async (e) => {
        e.preventDefault();
        try {
            console.log({ variables: { obj: identifier, obj1: values } });
            let payload = {
                name: values.name,
                project: values.project,
                identification: values.identification,
                legal: values.legal,
                phone: values.phone,
                address1: values.address1,
                address2: values.address2,
                city: values.city,
                country: values.country
            }

            let result = await update_entity({ variables: { obj: identifier, obj1: payload } });
            alert("Successfully Updated");
            
        } catch (error) {
            console.log(error);
            alert("There is something wrong in your data");
        }
        handleClose();
            setReload(true);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow className="entity-table-header">
                            <TableCell>Nom</TableCell>
                            <TableCell align="right">Identification</TableCell>
                            <TableCell align="right">Legal</TableCell>
                            <TableCell align="right">Telephone</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Membre(s)</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row, index) => (
                            <TableRow key={row.name} className="entity-table-row">
                                <TableCell component="th" scope="row"><b>{row.name}</b></TableCell>
                                <TableCell style={{ width: 160 }} align="right">{row.identification}</TableCell>
                                <TableCell style={{ width: 160 }} align="right">{row.legal}</TableCell>
                                <TableCell style={{ width: 160 }} align="right">{row.phone}</TableCell>
                                <TableCell style={{ width: 160 }} align="right">{row.address1}</TableCell>
                                <TableCell style={{ width: 160 }} align="right">{row.identifier}</TableCell>
                                <TableCell style={{ width: 100 }} align="right">
                                    <CreateIcon onClick={(e) => handleOpen(index)} />
                                    <MoreHorizIcon className="fg-color-primary" onClick={(e) => onDeleteEntity(index)} />
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}><TableCell colSpan={6}></TableCell></TableRow>
                        )}
                    </TableBody>
                    <TableFooter className="entity-table-footer">
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[]}
                                colSpan={7}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={PaginationAction}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>


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
                        <form action="/" method="POST" onSubmit={onEditEntity}>
                            <div className="form-group">
                                <label htmlFor=""><b>Nom</b></label>
                                <input value={values.name} onChange={handleChange('name')} type="text" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Identification</b></label>
                                <input value={values.identification} onChange={handleChange('identification')} type="number" className="form-control" required />
                            </div>
                            <div className="d-flex">
                                <div className="form-group w-50">
                                    <label htmlFor=""><b>Legal</b></label>
                                    <select value={values.legal} onChange={handleChange('legal')} className="form-control">
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

        </>
    );
};

export default EntityTable;
