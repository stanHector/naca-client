import React from 'react';

const ItemSearch = (props) => {
    return (
        <div className="search">
            <input type="text" placeholder="search Assets" value={props.searchTerm} onChange={(e) => props.handleSearchTermChange(e.target.value)} />
        </div>
    )
}
export default ItemSearch;