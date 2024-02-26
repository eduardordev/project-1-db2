import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { addClient } from "../../../Services/ClientService";
import './CreateClient.css';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Add, KeyboardReturn } from '@mui/icons-material';

const CreateClients2 = () => {

    const params = useParams();
    const [inputs, setInputs] = useState({});

    useEffect(()=>{
        if(params.id != null){
            console.log(params.id)
        }
        
    },[])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        addClient(inputs).then((resp) => {
            console.log(resp)
            window.location.replace("/clients/list");

        }).catch((err) => {
            console.error(err)
            window.location.replace("/clients/list");
        })
      }

    return(
        <div className="create-client-container">
            <Typography variant="h4" component="div">
                { inputs.name || "Create Customer" }
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container direction="row" columnSpacing={4} >
                    <Grid container item xs={6} rowSpacing={4} >
                        <Grid item container><TextField value={inputs.name || ""} onChange={handleChange} sx={{ width: "100%" }} id="name" InputProps={{name: "name"}} label="Name" variant="outlined" /></Grid>
                        <Grid item container><TextField value={inputs.address || ""} onChange={handleChange} sx={{ width: "100%" }} id="address" InputProps={{name: "address"}} label="Address" variant="outlined" /></Grid>
                        <Grid item container><TextField value={inputs.city || ""} onChange={handleChange} sx={{ width: "100%" }} id="city" InputProps={{name: "city"}} label="City" variant="outlined" /></Grid>
                        <Grid item container><TextField value={inputs.state || ""} onChange={handleChange} sx={{ width: "100%" }} id="state" InputProps={{name: "state"}} label="State" variant="outlined" /></Grid>
                        <Grid item container><TextField value={inputs.zip_code || ""} onChange={handleChange} sx={{ width: "100%" }} id="zip_code" InputProps={{name: "zip_code"}} label="Zip Code" variant="outlined" /></Grid>
                        <Grid item container><TextField value={inputs.country || ""} onChange={handleChange} sx={{ width: "100%" }} id="country" InputProps={{name: "country"}} label="Country" variant="outlined" /></Grid>
                        <Grid item container><TextField value={inputs.note || ""} onChange={handleChange} sx={{ width: "100%" }} id="note" InputProps={{name: "note"}} label="Note" variant="outlined" /></Grid>
                        <Grid item container><TextField value={inputs.tax_id || ""} onChange={handleChange} sx={{ width: "100%" }} id="tax_id" InputProps={{name: "tax_id"}} label="Tax ID" variant="outlined" /></Grid>
                    </Grid>
                    <Grid container item xs={6} rowSpacing={2}>
                        <Grid item container><TextField value={inputs.phone || ""} onChange={handleChange} sx={{ width: "100%" }} id="phone" InputProps={{name: "phone"}} label="Phone" variant="outlined" /></Grid>
                        <Grid item container><TextField value={inputs.phone_2 || ""} onChange={handleChange} sx={{ width: "100%" }} id="phone_2" InputProps={{name: "phone_2"}} label="Phone 2" variant="outlined" /></Grid>
                        <Grid item container><TextField value={inputs.fax || ""} onChange={handleChange} sx={{ width: "100%" }} id="fax" InputProps={{name: "fax"}} label="Fax" variant="outlined" /></Grid>
                        <Grid item container><TextField value={inputs.email || ""} onChange={handleChange} sx={{ width: "100%" }} id="email" InputProps={{name: "email"}} label="Email" variant="outlined" /></Grid>
                        <Box container sx={{ p: 2, border: '1px solid grey', width: "100%" }} rowSpacing={2} >
                            <Typography variant="p" component="div" sx={{ marginBottom: 4 }} >
                                Contact
                            </Typography>
                            <Grid container rowSpacing={4} columnSpacing={4} direction="row" wrap="wrap">
                                <Grid item container xs={6} ><TextField value={inputs.contact_name_1 || ""} onChange={handleChange} sx={{ width: "100%" }} id="contact_name_1" InputProps={{name: "contact_name_1"}} label="Name" variant="outlined" /></Grid>
                                <Grid item container xs={6} ><TextField value={inputs.contact_phone_1 || ""} onChange={handleChange} sx={{ width: "100%" }} id="contact_phone_1" InputProps={{name: "contact_phone_1"}} label="Phone" variant="outlined" /></Grid>
                                <Grid item container xs={6} ><TextField value={inputs.contact_name_2 || ""} onChange={handleChange} sx={{ width: "100%" }} id="contact_name_2" InputProps={{name: "contact_name_2"}} label="Name" variant="outlined" /></Grid>
                                <Grid item container xs={6} ><TextField value={inputs.contact_phone_2 || ""} onChange={handleChange} sx={{ width: "100%" }} id="contact_phone_2" InputProps={{name: "contact_phone_2"}} label="Phone" variant="outlined" /></Grid>
                                <Grid item container xs={6} ><TextField value={inputs.contact_name_3 || ""} onChange={handleChange} sx={{ width: "100%" }} id="contact_name_3" InputProps={{name: "contact_name_3"}} label="Name" variant="outlined" /></Grid>
                                <Grid item container xs={6} ><TextField value={inputs.contact_phone_3 || ""} onChange={handleChange} sx={{ width: "100%" }} id="contact_phone_3" InputProps={{name: "contact_phone_3"}} label="Phone" variant="outlined" /></Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid container item></Grid>    
                </Grid>
                <Grid container direction="row" justifyContent={"space-between"} sx={{ marginTop: 4 }} >
                    <Grid item><Link to="/clients/list"><Button type="button" startIcon={<KeyboardReturn />} variant="outlined" color="error">Cancel</Button></Link></Grid>
                    <Grid item><Button type="submit" startIcon={<Add />} variant="outlined" color="success" >Add</Button></Grid>    
                </Grid>
            </form>
        </div>
    );
}

export default CreateClients2;