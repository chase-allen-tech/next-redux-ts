import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { Backdrop, Button, Checkbox, CircularProgress, Container, Fab, Fade, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { M_ADD_GROUP, Q_GET_ENTITIES, Q_GET_GROUPS_BY_ENTITY } from '../constants/gqlQueries';
import PaginationAction from '../components/pagination-action';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CreateIcon from '@material-ui/icons/Create';

let rows = [];
const Group = (props) => {

    const [d_loading, setDLoading] = React.useState(true);
    const [lazyStart, setLazyStart] = React.useState(false);
    const [reload, setReload] = React.useState(false);
    useEffect(() => { setReload(false); });

    // Server Data
    const [add_group] = useMutation(M_ADD_GROUP);
    const { loading, error, data: entities } = useQuery(Q_GET_ENTITIES, { fetchPolicy: reload ? "no-cache" : "cache-and-network" });
    const entities_row = entities != undefined && entities.hasOwnProperty('entities') ? entities.entities : [];
    
    let { refetch } = useQuery(Q_GET_GROUPS_BY_ENTITY, { fetchPolicy: "no-cache"});


    const getGroupsFromEntity = async () => {
        setDLoading(true);
        console.log("GETTING DATA");
        if(entities.entities.length <= 0) return;
        for (let i = 0; i < entities.entities.length; i++) {
            try {
                const res = await refetch({ obj: entities.entities[i].identifier});
                rows = [...rows, ...res.data.groupsForEntity];
                rows =  Array.from(new Set(rows.map(item => JSON.stringify(item)))).map(ite => JSON.parse(ite));
            } catch (error) {
                console.log(error);
            } 
        }
        setDLoading(false);
    }

    if (!loading && !error && !lazyStart) {
        setLazyStart(true);
        getGroupsFromEntity();
    }

    // Modal
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({ name: '', entityIdentifier: '' });

    const handleOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // Action
    const onAddGroup = async (e) => {
        e.preventDefault();
        try {
            let result = await add_group({ variables: { obj: values } });
            alert("Successfully Added");
            handleClose();
            getGroupsFromEntity();
            setReload(true);
        } catch (error) {
            console.log(error);
            alert("There is something wrong in your data");
        }
    }

    // Pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const handleChangePage = (event, newPage) => { setPage(newPage); };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container>
            <div className="d-flex  justify-bt">
                <div className="content-title">Group
                {d_loading || loading ? <span className="ml-4"><CircularProgress /></span> : <></>}
                </div>
                <Fab onClick={handleOpen} variant="extended" size="medium" className="bk-color-primary float-right mt-4"><span className="ml-4 mr-4 text-white text-case-none"><b>Ajouter un groupe +</b></span></Fab>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow className="entity-table-header">
                            <TableCell>Nom</TableCell>
                            <TableCell align="right">Identification</TableCell>
                            <TableCell align="right">Membre(s)</TableCell>
                            <TableCell align="right">Entity</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <TableRow key={row.identifier} className="entity-table-row">
                                <TableCell component="th" scope="row">
                                    <b>{row.name}</b>
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.identifier}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.fat}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.entityIdentifier}
                                </TableCell>
                                <TableCell style={{ width: 100 }} align="right">
                                    <CreateIcon />
                                    <MoreHorizIcon className="fg-color-primary" />
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
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
                        <h6 className="fg-color-primary mb-4">Ajouter un groupe</h6>
                        <form method="POST" onSubmit={onAddGroup}>
                            <div className="modal-content-scroll">
                                <div className="form-group">
                                    <label htmlFor=""><b>Nom</b></label>
                                    <input value={values.name} onChange={handleChange('name')} type="text" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor=""><b>Entity</b></label>
                                    <select value={values.entityIdentifier} onChange={handleChange('entityIdentifier')} className="form-control" required >
                                        {entities_row.map((ent, index_ent) =>
                                            <option value={ent.identifier} key={index_ent}>{ent.name}</option>
                                        )}
                                    </select>
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
                                            <hr className="m-0" />
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
                                            <hr className="m-0" />
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
                            </div>
                            <Fab type="submit" variant="extended" size="medium" className="bk-color-primary f-11 mt-3"><span className="ml-4 mr-4 text-white">Valider</span></Fab>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </Container>
    );
};

export default connect()(Group);