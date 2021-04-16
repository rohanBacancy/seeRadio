import React,{useEffect, useMemo, useState} from 'react';
import { useTable,usePagination } from 'react-table';
import { Button, Col, Container, Row, Table } from 'reactstrap';
import { getAllCampaignsPost } from '../../api/Api';
import {COLUMNS} from './Columns'
//AiTwotoneFilter
import { AiTwotoneFilter } from 'react-icons/ai'
import { Link, Redirect } from 'react-router-dom';

const VideosInProduction = ({history}) => {

    const [gotData,setGotData] = useState([]);
    const [resultsNum,setResultsNum] = useState();

    useEffect(() => {
        getAllCampaignsPost()
        .then(res => {
            console.log(res)
            setResultsNum(res.count);
            let newArr = [];
            for(let dt of res.rows)
            {
                let newObj = {
                    id:dt.id,
                    title:dt.title,
                    companyName:dt.clientCompany.companyName,
                    firstName:dt.statusWithPerson.firstName,
                    statusByPersonID:dt.statusByPersonID,
                }
                newArr.push(newObj)
            }
            setGotData(newArr);
        })
        .catch(err => console.log(err))
    }, [])

    const columns = useMemo(() => COLUMNS,[])
    const data = gotData;

    const tableInstace = useTable({
        columns:columns,
        data:data,
    },usePagination)

    const {
        getTableProps , 
        getTableBodyProps , 
        headerGroups , 
        page , 
        prepareRow,
        nextPage,
        pageOptions,
        setPageSize,
        state,
        previousPage,
        canNextPage,
        canPreviousPage,} = tableInstace;
        
    const { pageIndex,pageSize } = state;

    return (
        <Container fluid>
            <Row style={{maxWidth:'100vw'}} className={'ml-1 mt-3 align-items-center mb-3'}>
                <Col md={4}><Button style={{background:'black'}}><AiTwotoneFilter/>  Search Filter</Button> <span>{resultsNum && resultsNum + " results Returned"}</span></Col>
                <Col className={'ml-5'}><h3>Videos in production</h3></Col>    
            </Row>
            { gotData && <Table striped hover {...getTableProps()}>
                <thead>
                    { headerGroups.map((headerGroup) => 
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => 
                        <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                        </th>
                        )}
                    </tr>
                    )}
                </thead>
                <tbody {...getTableBodyProps()}>
                    
                        {page.map((row) => 
                            {prepareRow(row)
                            return(
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell) => 
                                        {
                                            return <td onClick={() => history.replace(`/campaigndetails/${cell.row.original.id}`)} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )}
                        )}
                        
                    
                </tbody>
            </Table>}

            <Row className={'ml-1'} >
                <Col md={10}><span>Results Per Page <Button onClick={() => setPageSize(5)} color={'link'}>5</Button> | <Button onClick={() => setPageSize(15)} color={'link'}>15</Button> | <Button onClick={() => setPageSize(20)} color={'link'}>20</Button> </span></Col>
                <Col><Button disabled={!canPreviousPage} onClick={() => previousPage()} color={'link'}>Prev</Button>{pageIndex+1}<Button disabled={!canNextPage} onClick={() => nextPage()} color={'link'}>Next</Button></Col>
            </Row>
            </Container>

    )
}

export default VideosInProduction
