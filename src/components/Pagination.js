import React from 'react';

export default function Pagination({gotoPrevPage, gotoNextPage}) {
    const style = {
        "marginTop": "10px"
    }; 

    return (
        <div style={style}>
           {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
           {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
        </div>
    )
}
