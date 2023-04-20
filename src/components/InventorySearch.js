import React from 'react';

const InventorySearch = (props) => {
    return (
        <div className="search">
            <input type="text" placeholder="search Inventory" value={props.searchTerm} onChange={(e) => props.handleSearchTermChange(e.target.value)} />
        </div>
    )
}
export default InventorySearch;