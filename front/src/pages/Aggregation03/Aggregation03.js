import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from '../../components/DataTable';
import { Typography } from '@mui/material';

function Aggregation03() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/invoices/average_price_per_category/');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Average Price per Category
            </Typography>
            <DataTable
                table={{
                    columns: [
                        { Header: "Category", accessor: "category", width: "50%" },
                        { Header: "Average Price", accessor: "average_price" },
                    ],
                    rows: data
                }}
            />
        </div>
    );
}

export default Aggregation03;
