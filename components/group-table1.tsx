import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core';
import React, { useEffect } from 'react';
import PaginationAction from './pagination-action';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CreateIcon from '@material-ui/icons/Create';
import { M_ADD_GROUP, M_DELETE_GROUP, M_UPDATE_GROUP, Q_GET_ENTITIES, Q_GET_GROUPS_BY_ENTITY } from '../constants/gqlQueries';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useDispatch, useSelector } from 'react-redux';
import { addEntity } from '../actions/entity_action';
import { RootState } from '../reducers';

let rows = [];

const GroupTable = (props) => {

    // State
    const [reload, setReload] = React.useState(false);
    const [counter, setCounter] = React.useState(0);
    const [lazyStart, setLazyStart] = React.useState(false);
    useEffect(() => { setReload(false); });

    // Server Data 
    const { loading, error, data: entities } = useQuery(Q_GET_ENTITIES, { fetchPolicy: reload ? "no-cache" : "cache-and-network" });
    let [start_sec, { loading: loading1, error: error1, data: group_data }] = useLazyQuery(Q_GET_GROUPS_BY_ENTITY, {fetchPolicy: "network-only"});
    if (!loading && !error && !lazyStart) {
        setLazyStart(true);
        if(entities.entities.length > 0)
            start_sec({ variables: { obj: entities.entities[0].identifier }, });
        setCounter(counter + 1);
    }

    if (group_data != undefined && group_data && group_data.hasOwnProperty('groupsForEntity')) {
        rows = [...rows, ...group_data.groupsForEntity];
        rows =  Array.from(new Set(rows.map(item => JSON.stringify(item)))).map(ite => JSON.parse(ite));
        if (counter < entities.entities.length) {
            start_sec({ variables: { obj: entities.entities[counter].identifier }, });
            setCounter(counter + 1);
        }
    }


    const [update_group] = useMutation(M_UPDATE_GROUP);
    const [delete_group] = useMutation(M_DELETE_GROUP);
    const [add_group] = useMutation(M_ADD_GROUP);

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
        <>
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
        </>
    );
};

export default GroupTable;
