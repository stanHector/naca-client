import React from 'react';

const UserSearch = (props) => {
    return (
        <div className="search">
            <input type="text" placeholder="search Users" value={props.searchTerm} onChange={(e) => props.handleSearchTermChange(e.target.value)} />
        </div>
    )
}
export default UserSearch;