import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core';
import React from 'react';
import PaginationAction from './pagination-action';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CreateIcon from '@material-ui/icons/Create';

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

const EntityTable = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

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
                        ).map((row) => (
                            <TableRow key={row.name} className="entity-table-row">
                                <TableCell component="th" scope="row">
                                    <b>{row.name}</b>
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.calories}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.fat}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.fat}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.fat}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.fat}
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

export default EntityTable;
