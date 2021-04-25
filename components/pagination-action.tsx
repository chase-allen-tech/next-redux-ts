import React from 'react';
import PropTypes from 'prop-types';
import { usePagination } from '@material-ui/lab/Pagination';

function PaginationAction(props) {
    const { count, page, rowsPerPage, onChangePage } = props;

    const { items } = usePagination({
        count: Math.ceil(count / rowsPerPage),
    });

    const handleNextPrevButtonClick = (event, type) => {
        if(type == 'previous') {
            onChangePage(event, page - 1);    
        } else {
            onChangePage(event, page + 1);
        }
    };

    const handleChange = (event, val) => {
        console.log(val);
        onChangePage(event, val - 1);
    }

    return (
        <nav>
            <ul className="pagination-items">
                {items.map(({ page, type, selected, ...item }, index) => {
                    let children = null;

                    if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                        children = '…';
                    } else if (type === 'page') {
                        children = (
                            <button type="button" className={ selected ? 'pagination-active border-right-none' : "border-right-none" } {...item} onMouseUp={(e) => handleChange(e, page)}>
                                {page}
                            </button>
                        );
                    } else {
                        children = (
                            <button type="button" className={ type=='previous' ? 'pagination-prev' : 'pagination-next' } {...item} onMouseUp={(e) => handleNextPrevButtonClick(e, type)}>
                                {type}
                            </button>
                        );
                    }
                    return <>{children}</>;
                })}
            </ul>
        </nav>
    );
}

PaginationAction.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


export default PaginationAction;
