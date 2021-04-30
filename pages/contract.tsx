import { connect } from 'react-redux';
import { addTodo, deleteTodo, onChangeTodo } from '../actions';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { Backdrop, Button, CircularProgress, Container, Fab, Fade, Grid, Modal, TextField } from '@material-ui/core';
import ContractCard from '../components/contract-card';
import PaginationAction from '../components/pagination-action';
import { useMutation, useQuery } from '@apollo/client';

import { Q_GET_CONTRACTS, M_UPDATE_CONTRACT, M_DELETE_CONTRACT, M_ADD_CONTRACT, Q_GET_ENTITIES, Q_GET_CHANNELS_OF_SOURCE, Q_GET_CONTRACTS_FOR_CHANNEL } from '../constants/gqlQueries';

let channel_rows = [];
let contract_rows = [];
const Contract = (props) => {


    // State
    const [reload, setReload] = React.useState(false);
    const [d_loading, setDLoading] = React.useState(true);
    const [lazyStart, setLazyStart] = React.useState(false);
    useEffect(() => { setReload(false); });

    // ServerData
    const { loading, error, data: entities } = useQuery(Q_GET_ENTITIES, { fetchPolicy: reload ? "no-cache" : "cache-and-network" });
    const entities_row = entities != undefined && entities.hasOwnProperty('entities') ? entities.entities : [];

    const { refetch: channelRefetch } = useQuery(Q_GET_CHANNELS_OF_SOURCE, { fetchPolicy: "no-cache"  });
    const { refetch: contractRefetch } = useQuery(Q_GET_CONTRACTS_FOR_CHANNEL, { fetchPolicy: "no-cache"  });

    const getContractsFromChannel = async (channels) => {
        console.log("GETTING Contract DATA", channels);
        // if(channels.length <= 0) return;
        for (let i = 0; i < 3; i++) {
            try {
                // const res = await contractRefetch({ obj: channels[i].identifier});
                const res = await contractRefetch({ obj: "6e00fb5c-fae7-4f2e-a5bc-c05f305b35a0"});
                console.log(res);
                contract_rows = [...contract_rows, ...res.data.contractsForChannel];
                contract_rows =  Array.from(new Set(contract_rows.map(item => JSON.stringify(item)))).map(ite => JSON.parse(ite));
            } catch (error) {
                console.log(error);
            } 
        }
        setDLoading(false);
    }
    const getChannelsFromEntity = async () => {
        setDLoading(true);
        console.log("GETTING Channel DATA");
        if(entities.entities.length <= 0) return;
        for (let i = 0; i < entities.entities.length; i++) {
            try {
                const res = await channelRefetch({ obj: entities.entities[i].identifier});
                console.log(res);
                channel_rows = [...channel_rows, ...res.data.channelsForSource];
                channel_rows =  Array.from(new Set(channel_rows.map(item => JSON.stringify(item)))).map(ite => JSON.parse(ite));
            } catch (error) {
                console.log(error);
            } 
        }
        getContractsFromChannel(channel_rows);
    }
    if (!loading && !error && !lazyStart) {
        setLazyStart(true);
        getChannelsFromEntity();
    }

    // const { loading, error, data } = useQuery(Q_GET_CONTRACTS);
    // const rows = data != undefined && data.hasOwnProperty("contracts") ? data.entities : [];
    const [update_contract] = useMutation(M_UPDATE_CONTRACT);
    const [delete_contract] = useMutation(M_DELETE_CONTRACT);
    const [add_contract] = useMutation(M_ADD_CONTRACT);

    // Pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, contract_rows.length - page * rowsPerPage);
    const handleChangePage = (event, newPage) => { setPage(newPage); };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Modal
    const [open, setOpen] = React.useState(false);
    const [identifier, setIdentifier] = React.useState(null);
    const [values, setValues] = React.useState({
        identifier: '', name: '', version: '', description: '', isActive: '', owner: '',
        tags: '', accessKeys: '', channelIdentifier: ''
    });

    const handleOpen = (id) => {
        console.log(values);
        if (id >= 0) {
            setValues(contract_rows[id]);
            setIdentifier(contract_rows[id].identifier);
        } else {
            setValues({
                identifier: '', name: '', version: '', description: '', isActive: '', owner: '',
                tags: '', accessKeys: '', channelIdentifier: ''
            });
            setIdentifier(null);
        }
        setOpen(true);
    };

    const handleClose = () => { setOpen(false); };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    

    // Action
    const onDeleteContract = async (e) => {
        if (!confirm("Are you going to delete this record?")) return;
        try {
            let result = await delete_contract({ variables: { obj: identifier } });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    const onEditContract = async (e) => {
        e.preventDefault();
        try {
            console.log({ variables: { obj: identifier, obj1: values } });
            let payload = {
            }

            let result = await update_contract({ variables: { obj: identifier, obj1: payload } });
            alert("Successfully Updated");
            handleClose();
            setReload(true);
        } catch (error) {
            console.log(error);
            alert("There is something wrong in your data");
        }
    }

    const onAddContract = async (e) => {
        console.log("ENTER");
        e.preventDefault();
        try {
            console.log(values);
            let result = await add_contract({ variables: { obj: values } });
            console.log(result);
            alert("Successfully Added");
            handleClose();
            setReload(true);
        } catch (error) {
            console.log(error);
            alert("There is something wrong in your data");
        }
    }

    return (
        <Container>
            <div className="d-flex  justify-bt">
                <div className="content-title">Contacts
                {loading || d_loading ? <span className="ml-4"><CircularProgress /></span> : <></>}</div>
                <Fab onClick={e => handleOpen(-1)} variant="extended" size="medium" className="bk-color-primary float-right mt-4"><span className="ml-4 mr-4 text-white text-case-none"><b>Ajouter une channels +</b></span></Fab>
            </div>

            <Grid container spacing={1}>
                {(rowsPerPage > 0
                    ? contract_rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : contract_rows
                ).map((row, index) => (
                    <Grid key={index} item xs={12} sm={6} md={3}><ContractCard ctitle={row.name} /></Grid>
                ))}
                {emptyRows > 0 && (
                    true
                )}

            </Grid>

            <div className="mt-4 mb-4">
                <span>{page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, contract_rows.length)} sur {contract_rows.length} channels</span>
                <div className="float-right">
                    <PaginationAction
                        count={contract_rows.length}
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
                    <div className="channel-modal-content overflow-y-auto">
                        <h6 className="fg-color-primary mt-2 mb-2">Ajouter un contract</h6>
                        <form action="/" method="POST" onSubmit={identifier == null? onAddContract : onEditContract}>
                            <div className="form-group">
                                <label htmlFor=""><b>Nom</b></label>
                                <input value={values.name} onChange={handleChange('name')} type="text" className="form-control" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Version</b></label>
                                <input type="text" className="form-control" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Description</b></label>
                                <textarea name="" id="" cols={30} rows={2} className="form-control" required></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Mode</b></label>
                                <select name="" id="" className="form-control">
                                    <option value="1">AAA</option>
                                    <option value="2">BBB</option>
                                    <option value="3">CCC</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Frequnce</b></label>
                                <select name="" id="" className="form-control">
                                    <option value="1">AAA</option>
                                    <option value="2">BBB</option>
                                    <option value="3">CCC</option>
                                </select>
                            </div>
                            <Fab type="submit" variant="extended" size="medium" className="bk-color-primary"><span className="ml-4 mr-4 text-white">Valider</span></Fab>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </Container>
    );
};

export default connect()(Contract);