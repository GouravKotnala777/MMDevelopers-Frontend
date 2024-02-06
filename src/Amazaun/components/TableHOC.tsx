import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import {Column, TableOptions, useTable, useSortBy, usePagination} from "react-table"
import styled from "styled-components";


function TableHOC<T extends Object>(columns:Column<T>[], data:T[], containerClassname:string, heading:string, showPagination:boolean = false) {
    
    return function HOC(){
        const options:TableOptions<T> = {
            columns,
            data,
            initialState:{
                pageSize:20
            }
        };
        const {getTableProps, getTableBodyProps, headerGroups, page, prepareRow, nextPage, pageCount, state:{pageIndex}, previousPage, canNextPage, canPreviousPage} = useTable(options, useSortBy, usePagination);
        return(
                <div className={containerClassname} style={{padding:"10px"}}>
                    <h2 className={heading} style={{textAlign:"center"}}>{heading}</h2>
                    <table className="table" {...getTableProps} style={{width:"100%"}}>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render("Header")}
                                            {column.isSorted && <span>{column.isSortedDesc ? <RiArrowDownSLine style={{display:"inline"}} />: <RiArrowUpSLine style={{display:"inline"}} />}</span>}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()} style={{position:"relative"}}>
                            {page.map((row) => {
                                prepareRow(row);
                                return(
                                    <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()} style={{textAlign:"center", fontSize:"0.9rem"}}>
                                                {cell.render("Cell")}
                                            </td>
                                        )
                                    )}
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    {
                        showPagination && (
                            <div style={{position:"absolute", top:"90%", left:"50%", transform:"translate(-50%, -50%)", zIndex:"3"}}>
                                <button style={{background: !canPreviousPage ? "rgb(145, 200, 255)" : "rgb(34, 144, 255)", borderRadius:"0.4rem", padding:"0.2rem 0.4rem", color:"white"}} disabled={!canPreviousPage} onClick={previousPage}>Prev</button>
                                <span>{`${pageIndex + 1} of ${pageCount}`}</span>
                                <button style={{background: !canNextPage ? "rgb(145, 200, 255)" : "rgb(34, 144, 255)", borderRadius:"0.4rem", padding:"0.2rem 0.4rem", color:"white"}} disabled={!canNextPage} onClick={nextPage}>Next</button>
                            </div>
                        )
                    }
                </div>
            )
    };
};

export default TableHOC;

// const TableHOCBackground = styled.section`
//     border:2px solid green;
//     .containerClassname
// `;