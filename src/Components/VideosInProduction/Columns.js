export const COLUMNS = [
    {
        Header:'Id',
        accessor:'id'
    },
    {
        Header:'Title/Details',
        accessor:'title'
    },
    {
        Header:'Advertiser',
        accessor:'companyName',
    },
    {
        Header:'Action Required By',
        accessor:'firstName'
    },
    {
        Header:'Next Action Due By',
        Cell: (col) => {
            return(<p><strong>Not Selected</strong></p>)
        }
    },
    {
        Header:'Start',
        Cell: (col) => {
            return(<p><strong>Not Selected</strong></p>)
        }
    },
    {
        Header:'Finish',
        Cell: (col) => {
            return(<p><strong>Not Selected</strong></p>)
        }
    },
]