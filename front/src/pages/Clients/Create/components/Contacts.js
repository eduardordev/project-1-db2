
import Grid from "@mui/material/Grid";
import MDBox from "../../../../components/MDBox";
import FormField from "../../../../components/FormField";

const Contacts = ({isView, formData}) =>{
    const { formField, values, errors, touched } = formData;
    const { contact_name_1, contact_phone_1, contact_name_2, contact_phone_2, contact_name_3, contact_phone_3 } = formField;
    const {
        contact_name_1: contact_name_1V,
        contact_phone_1: contact_phone_1V,
        contact_name_2: contact_name_2V,
        contact_phone_2: contact_phone_2V,
        contact_name_3: contact_name_3V,
        contact_phone_3: contact_phone_3V
      } = values;
    return(
        <MDBox mt={2}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormField 
                    type={contact_name_1.type} label={contact_name_1.label} name={contact_name_1.name} 
                    value={contact_name_1V} error={errors.contact_name_1 && touched.contact_name_1} 
                    success={contact_name_1V.length > 0 && !errors.contact_name_1}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormField 
                    type={contact_phone_1.type} label={contact_phone_1.label} name={contact_phone_1.name} 
                    value={contact_phone_1V} error={errors.contact_phone_1 && touched.contact_phone_1} 
                    success={contact_phone_1V.length > 0 && !errors.contact_phone_1}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormField 
                    type={contact_name_2.type} label={contact_name_2.label} name={contact_name_2.name} 
                    value={contact_name_2V} 
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormField 
                    type={contact_phone_2.type} label={contact_phone_2.label} name={contact_phone_2.name} 
                    value={contact_phone_2V} 
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormField 
                    type={contact_name_3.type} label={contact_name_3.label} name={contact_name_3.name} 
                    value={contact_name_3V} 
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                <FormField 
                    type={contact_phone_3.type} label={contact_phone_3.label} name={contact_phone_3.name} 
                    value={contact_phone_3V} 
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
            </Grid>
        </MDBox>
    );
}

export default Contacts;