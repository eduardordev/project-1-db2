import tableStyle from "variables/styles/tableStyle";
import React from 'react';

function sortTable({ ...props }) {
    const { tableColumns, tableData } = props;
    let _columns = tableColumns;
    let originalRows = tableData;
    let rows = originalRows.slice(0);
    
    handleGridSort = (sortColumn, sortDirection) => {
        const comparer = (a, b) => {
          if (sortDirection === 'ASC') {
            return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
          } else if (sortDirection === 'DESC') {
            return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
          }
        };
    
        const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);
    
        this.setState({ rows });
      };
    
    rowGetter = (i) => {
        return this.state.rows[i];
    };

    return  (
        <table></table>
    );
}

export default withStyles(tableStyle)(sortTable);

