import React from 'react'
import { FcDocument } from 'react-icons/fc'
import {FaMicrophone} from 'react-icons/fa'
import {RiCheckboxMultipleBlankLine} from 'react-icons/ri'
import { Table } from 'reactstrap'

const DropZoneReplaceTbl = ({type,files}) => {

    let theIcon;

    if(type=="script")
        theIcon = (<FcDocument size="90"/>)
    if(type=="audio")
        theIcon = (<FaMicrophone size="90" style={{color:'#11A1DD'}}/>)
    if(type=="assets")
        theIcon = (<RiCheckboxMultipleBlankLine size="90"/>)

    return (
        <div style={{display:'flex',alignItems:'center',background:'#F1FBFF'}}>
        {theIcon}
        <Table responsive borderless className="mt-2">
                            <thead>
                                <tr className="text-secondary">
                                    <th>File Name</th>
                                    <th>File Uploaded By</th>
                                    <th>File Uploaded Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>{files[0].assetOrignalName}</td>
                                <td>{"Parth Vaghela"}</td>
                                <td>{new Date(files[0].updatedAt).toDateString()}</td>
                                </tr>
                            </tbody>
        </Table>
        </div>
    )
}

export default DropZoneReplaceTbl
