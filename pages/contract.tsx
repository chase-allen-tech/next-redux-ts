import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { Backdrop, Button, CircularProgress, Container, Fab, Fade, Grid, Modal, TextField } from '@material-ui/core';
import ContractCard from '../components/contract-card';
import PaginationAction from '../components/pagination-action';
import { useMutation, useQuery } from '@apollo/client';

import { M_UPDATE_CONTRACT, M_DELETE_CONTRACT, M_ADD_CONTRACT, Q_GET_ENTITIES, Q_GET_CHANNELS_OF_SOURCE, Q_GET_CONTRACTS_FOR_CHANNEL } from '../constants/gqlQueries';

let channel_rows = [];
let contract_rows = [];

const Contract = (props) => {

    // If channels_rows data has value, then reference line: 41, 168 to use real data
    const test_channel_id = "ef18d690-00d7-4d5a-b9a4-5e902749b4cf";

    // State
    const [values, setValues] = React.useState({
        identification: '', name: '', version: '', description: '', mode: 'PUSH', isActive: '', owner: '',
        tags: '', accessKeys: '', channelIdentifier: ''
    });
    const handleChange = (prop) => (event) => { setValues({ ...values, [prop]: event.target.value }); };
    const [reload, setReload] = React.useState(false);
    const [d_loading, setDLoading] = React.useState(true);
    const [lazyStart, setLazyStart] = React.useState(false);
    useEffect(() => { setReload(false); });

    // Graph QL
    const { loading, error, data: entities } = useQuery(Q_GET_ENTITIES, { fetchPolicy: reload ? "no-cache" : "cache-and-network" });
    const { refetch: channelRefetch } = useQuery(Q_GET_CHANNELS_OF_SOURCE, { fetchPolicy: "no-cache" });
    const { refetch: contractRefetch } = useQuery(Q_GET_CONTRACTS_FOR_CHANNEL, { fetchPolicy: "no-cache" });
    const [update_contract] = useMutation(M_UPDATE_CONTRACT);
    const [delete_contract] = useMutation(M_DELETE_CONTRACT);
    const [add_contract] = useMutation(M_ADD_CONTRACT);

    // Get contracts data from channel ids
    const getContractsFromChannel = async () => {
        console.log("GETTING Contract DATA", channel_rows);

        // Comment the following for loop, and uncomment the bellow, if channel_rows has values
        for (let i = 0; i < 1; i++) {
            try {
                const res = await contractRefetch({ obj: test_channel_id });
                if (res == undefined) continue;
                contract_rows = [...contract_rows, ...res.data.contractsForChannel];
                contract_rows = Array.from(new Set(contract_rows.map(item => JSON.stringify(item)))).map(ite => JSON.parse(ite));
                console.log("Contract Rows", contract_rows);
            } catch (error) {
                console.log(error);
            }
        }

        // if(channel_rows.length <= 0) return;
        // for (let i = 0; i < channel_rows.length; i++) {
        //     try {
        //         const res = await contractRefetch({ obj: channel_rows[i].identifier });
        //         if (res == undefined) continue;
        //         contract_rows = [...contract_rows, ...res.data.contractsForChannel];
        //         contract_rows = Array.from(new Set(contract_rows.map(item => JSON.stringify(item)))).map(ite => JSON.parse(ite));
        //         console.log("Contract Rows", contract_rows);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        setDLoading(false);
    }

    // Fetching channels data from entity ids
    const getChannelsFromEntity = async () => {
        setDLoading(true);
        console.log("GETTING Channel DATA");
        if (entities == undefined || !entities.hasOwnProperty('entities') || entities.entities.length <= 0) return;
        for (let i = 0; i < entities.entities.length; i++) {
            try {
                const res = await channelRefetch({ obj: entities.entities[i].identifier });
                console.log(res);
                channel_rows = [...channel_rows, ...res.data.channelsForSource];
                channel_rows = Array.from(new Set(channel_rows.map(item => JSON.stringify(item)))).map(ite => JSON.parse(ite));
            } catch (error) {
                console.log(error);
            }
        }
        getContractsFromChannel();
    }

    // If there is entity data and needs to reload, then start refetching all data
    if (!loading && !error && !lazyStart) {
        setLazyStart(true);
        getChannelsFromEntity();
    }

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

    const handleOpen = (id) => {
        if (id >= 0) {
            setValues(contract_rows[id]);
            setIdentifier(contract_rows[id].identifier);
        } else {
            setValues({
                identification: '', name: '', version: '', description: '', mode: 'PUSH', isActive: '', owner: '',
                tags: '', accessKeys: '', channelIdentifier: ''
            });
            setIdentifier(null);
        }
        setOpen(true);
    };
    const handleClose = () => { setOpen(false); };

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
        e.preventDefault();
        try {
            let payload = {
                name: values.name,
                identification: values.identification,
                version: values.version,
                mode: values.mode,
                modality: {
                    update: {
                        beat: "60"
                    }
                },
                contractFields: [],

                // If channel_rows has data, then comment the following line and uncomment the below line
                channelIdentifier: test_channel_id
                // channelIdentifier: values.channelIdentifier
            }
            let result = await add_contract({ variables: { obj: payload } });
            console.log(result);
            alert("Successfully Added");
            handleClose();
            setReload(true);
            setDLoading(true);
            getContractsFromChannel();
        } catch (error) {
            console.log(error);
            alert("There is something wrong in your data");
        }
    }

    return (
        <Container>
            <div className="d-flex  justify-bt">
                <div className="content-title">Contracts
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
                        <form action="/" method="POST" onSubmit={identifier == null ? onAddContract : onEditContract}>
                            <div className="form-group">
                                <label htmlFor=""><b>Nom</b></label>
                                <input value={values.name} onChange={handleChange('name')} type="text" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Identification</b></label>
                                <input value={values.identification} onChange={handleChange('identification')} type="text" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Version</b></label>
                                <input value={values.version} onChange={handleChange('version')} type="text" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Description</b></label>
                                <textarea value={values.description} onChange={handleChange('description')} name="" id="" cols={30} rows={2} className="form-control" required></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Mode</b></label>
                                <select value={values.mode} onChange={handleChange('mode')} className="form-control">
                                    <option value="PUSH">PUSH</option>
                                    <option value="STREAM">STREAM</option>
                                    <option value="DEMAND">DEMAND</option>
                                    <option value="COMPUTE">COMPUTE</option>
                                    <option value="TRIGGER">TRIGGER</option>
                                    <option value="ARCHIVE">ARCHIVE</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Channel ID</b></label>
                                <select value={values.channelIdentifier} onChange={handleChange('channelIdentifier')} className="form-control">
                                    {channel_rows.map((channel, index_cha) =>
                                        <option value={channel.identifier} key={index_cha}>{channel.name}</option>
                                    )}
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