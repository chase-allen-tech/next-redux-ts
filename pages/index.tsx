import { connect } from 'react-redux';
import { addTodo, deleteTodo, onChangeTodo } from '../actions';
import { addChannel, getChannels } from '../actions/channel_action';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { Backdrop, Button, CircularProgress, Container, Fab, Fade, Grid, Modal, TextField } from '@material-ui/core';
import ChannelCard from '../components/channel-card';
import PaginationAction from '../components/pagination-action';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { M_ADD_CHANNEL, M_DELETE_CHANNEL, M_DELETE_ENTITY, M_UPDATE_CHANNEL, Q_GET_CHANNELS_OF_SOURCE, Q_GET_ENTITIES } from '../constants/gqlQueries';

let rows = [];
const Channel = (props) => {

    ////////////////////// State ////////////////////////////
    const [reload, setReload] = React.useState(false);
    const [d_loading, setDLoading] = React.useState(true);
    const [lazyStart, setLazyStart] = React.useState(false);
    useEffect(() => { setReload(false); });

    ////////////////////// Server Data ////////////////////////////
    const { loading, error, data: entities } = useQuery(Q_GET_ENTITIES, { fetchPolicy: reload ? "no-cache" : "cache-and-network" });
    const entities_row = entities != undefined && entities.hasOwnProperty('entities') ? entities.entities : [];

    const { refetch } = useQuery(Q_GET_CHANNELS_OF_SOURCE, { fetchPolicy: "no-cache"  })

    const getChannelsFromEntity = async () => {
        setDLoading(true);
        console.log("GETTING DATA");
        if(entities.entities.length <= 0) return;
        for (let i = 0; i < entities.entities.length; i++) {
            try {
                const res = await refetch({ obj: entities.entities[i].identifier});
                console.log(res);
                rows = [...rows, ...res.data.channelsForSource];
                rows =  Array.from(new Set(rows.map(item => JSON.stringify(item)))).map(ite => JSON.parse(ite));
            } catch (error) {
                console.log(error);
            } 
        }
        setDLoading(false);
    }
    if (!loading && !error && !lazyStart) {
        setLazyStart(true);
        getChannelsFromEntity();
    }

    const [update_channel] = useMutation(M_UPDATE_CHANNEL);
    const [delete_channel] = useMutation(M_DELETE_CHANNEL);
    const [add_channel] = useMutation(M_ADD_CHANNEL);

    ////////////////////// Pagination Start ////////////////////////////
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const handleChangePage = (event, newPage) => { setPage(newPage); };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    ////////////////////// Modal Start ////////////////////////////
    const [open, setOpen] = React.useState(false);
    const [identifier, setIdentifier] = React.useState(null);
    const [values, setValues] = React.useState({
        identifier: '', name: '', description: '', identification: '', owner: '', read: '', write: '',
        cover: '', contracts: '', sourceIdentifier: '', createdAt: '', modifiedAt: '', deletedAt: ''
    });
    const handleOpen = (id) => {
        if (id >= 0) {
            setValues(rows[id]);
            setIdentifier(rows[id].identifier);
        } else {
            setValues({
                identifier: '', name: '', description: '', identification: '', owner: '', read: '', write: '',
                cover: '', contracts: '', sourceIdentifier: '', createdAt: '', modifiedAt: '', deletedAt: ''
            });
            setIdentifier(null);
        }
        setOpen(true);
    };
    const handleClose = () => { setOpen(false); };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    ////////////////////// Action Start ////////////////////////////
    const onDeleteChannel = async (e) => {
        if (!confirm("Are you going to delete this record?")) return;
        try {
            let result = await delete_channel({ variables: { obj: identifier } });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    const onEditChannel = async (e) => {
        e.preventDefault();
        try {
            console.log({ variables: { obj: identifier, obj1: values } });
            let payload = {
            }

            let result = await update_channel({ variables: { obj: identifier, obj1: payload } });
            alert("Successfully Updated");
            handleClose();
            setReload(true);
        } catch (error) {
            console.log(error);
            alert("There is something wrong in your data");
        }
    }

    const onAddChannel = async (e) => {
        e.preventDefault();
        try {
            // let payload: any = values;
            let payload = {
                "name": values.name,
                "identification": values.identifier,
                "cover": [values.cover],
                "sourceIdentifier": values.sourceIdentifier
            }
            console.log(payload);

            let result = await add_channel({ variables: { obj: payload } });
            console.log(result);
            alert("Successfully Added");
            handleClose();
            setReload(true);
            getChannelsFromEntity();
        } catch (error) {
            console.log(error);
            alert("There is something wrong in your data");
        }
    }

    return (
        <Container>
            

            <div className="d-flex  justify-bt">
                <div className="content-title">Channels
                {d_loading || loading ? <span className="ml-4"><CircularProgress /></span> : <></>}</div>
                
                <Fab onClick={e => handleOpen(-1)} variant="extended" size="medium" className="bk-color-primary float-right mt-4"><span className="ml-4 mr-4 text-white text-case-none"><b>Ajouter une channels +</b></span></Fab>
            </div>

            <Grid container spacing={1}>
                {(rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
                ).map((row, index) => (
                    <Grid key={index} item xs={12} sm={6} md={3}><ChannelCard channel={row} /></Grid>
                ))}
                {emptyRows > 0 && (
                    true
                )}

            </Grid>

            <div className="mt-4 mb-4">
                <span>{page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, rows.length)} sur {rows.length} channels</span>
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
                    <div className="channel-modal-content overflow-y-auto">
                        <h6 className="fg-color-primary mt-2 mb-2">Ajouter un channel</h6>
                        <form action="/" method="POST" onSubmit={identifier == null ? onAddChannel : onEditChannel}>
                            <div className="form-group">
                                <label htmlFor=""><b>Nom</b></label>
                                <input value={values.name} onChange={handleChange('name')} type="text" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Description</b></label>
                                <textarea value={values.description} onChange={handleChange('description')} cols={30} rows={2} className="form-control"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Cover</b></label>
                                <input value={values.cover} onChange={handleChange('cover')} type="text" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Source</b></label>
                                <select value={values.sourceIdentifier} onChange={handleChange('sourceIdentifier')} className="form-control">
                                    {entities_row.map((ent, index_ent) =>
                                        <option value={ent.identifier} key={index_ent}>{ent.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor=""><b>Identifier</b></label>
                                <input value={values.identifier} onChange={handleChange('identifier')} type="text" className="form-control" />
                            </div>
                            <Fab type="submit" variant="extended" size="medium" className="bk-color-primary"><span className="ml-4 mr-4 text-white">Valider</span></Fab>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </Container>

        //     <React.Fragment>
        //     <form onSubmit={(e) => {
        //         e.preventDefault();
        //         dispatch(addTodo( item ));
        //     }}>
        //         <TextField id="standard-basic" type="text" value={item.value} label="Input Value"
        //             onChange={e => getChannels( e.target.value)} />
        //         <br />
        //         <input type="submit" value="SUBMIT" style={{ display: 'none', }} />
        //     </form>
        //     <hr />
        //     {data.map((item, index) => (
        //         <p key={index}>
        //             {item}
        //             {' '}
        //             <Button onClick={() => dispatch(deleteTodo(item))} variant="contained" color="primary" >
        //                 DELETE
        //             </Button>
        //         </p>
        //     ))}
        // </React.Fragment>

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