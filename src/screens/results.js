import React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import '../styles/results.css';
import 'material-icons/iconfont/material-icons.css';
import { Grid, IconButton, Typography } from '@mui/material';
import PrevIcon from '@mui/icons-material/ChevronLeft';
import NextIcon from '@mui/icons-material/ChevronRight';

const Results = () => {
  // Columns for table
    const {state} = useLocation();

    const columns = [
        {   title: "Locations", 
            field: "locations", 
            emptyValue: () => <em>null</em> 
        },
        {   title: "Date", 
            field: "date", 
            emptyValue: () => <em>null</em>, 
            searchable: false,
            sorting: false,
        },
        {   title: "Title", 
            field: "title", 
            emptyValue: () => <em>null</em> 
        },
        {   title: "Company", 
            field: "company", 
            emptyValue: () => <em>null</em> 
        },
        {   title: "Application Link", 
            field: "url", 
            emptyValue: () => <em>null</em>, 
            sorting: false, 
            searchable: false,
            render:rowData=><div>
                                <Link to={rowData.url} 
                                      target="_blank"
                                      style={{ color: 'blue', textDecoration: 'none' }}>
                                    Application
                                </Link>
                            </div>
        },
    ];
    
    const CustomPaginationComponent = (props) => { 
        const { page, rowsPerPage, count, onPageChange } = props; 
        let from = rowsPerPage * page + 1; 
        let to = rowsPerPage * (page + 1); 
        if (to > count) { 
            to = count; 
        } 
        
        return ( 
            <td> 
                <Grid container alignItems="center" justify="flex-end" style={{ paddingTop: 8 }} > 
                    <Grid item> 
                        <IconButton disabled={page === 0} onClick={(e) => onPageChange(e, page - 1)} > 
                        <PrevIcon fontSize="small" color={page === 0 ? "disabled" : "primary"} /> 
                        </IconButton> 
                    </Grid> 
                    <Grid item> 
                        <Typography variant="caption" style={{ color: "black" }}> {from}-{to} of {count} 
                        </Typography> 
                    </Grid> 
                    <Grid item> 
                        <IconButton disabled={to >= count} onClick={(e) => onPageChange(e, page + 1)} > <NextIcon fontSize="small" color={to < count ? "primary" : "disabled"} />
                        </IconButton>
                    </Grid> 
                </Grid>
            </td>
            ); 
        };
    
    const defaultMaterialTheme = createTheme();
    if (state && state.data) {
        return (
            <div class="containerStyles">
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        title = "Found Positions"
                        data = {state.data}
                        columns={columns}
                        components={{ Pagination: (props) => { return <CustomPaginationComponent {...props} />; }, }}
                        options={{  searchFieldVariant: "outlined", 
                                    exportButton: true, 
                                    exportAllData: true, 
                                    exportFileName: "results", 
                                    pageSize: 10, 
                                    emptyRowsWhenPaging: false,
                                    showFirstLastPageButtons: false,
                                    tableLayout: "fixed",
                                    headerStyle: {  backgroundColor: "#3f51b5", 
                                                    color: "#FFF",
                                                    fontSize: "medium",
                                                    fontWeight: "bold"},
                                minRows: 10,
                                minBodyHeight: "80vh",
                                maxBodyHeight: "80vh",
                                    
                        }}
                    />
                </ThemeProvider>
            </div>
        );
    } else {
        return (
            <div>
                <p>Something went wrong!</p>
                <Link to="/">Return to home page</Link>
            </div>
        );
    }
}

export default Results;