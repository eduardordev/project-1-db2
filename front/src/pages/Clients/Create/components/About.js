
import Grid from "@mui/material/Grid";
import MDBox from "../../../../components/MDBox";
import FormField from "../../../../components/FormField";


const About = ({ isView, formData }) => {
    const { formField, values, errors, touched } = formData;
    const { name, email, phone, address, responsable} = formField;
    const {
        name: nameV,
        email: emailV,
        phone: phoneV,
        address: addressV,
        responsable: responsableV,
    } = values;
    return (
        <MDBox mt={2}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormField
                        type={name.type} label={name.label} name={name.name}
                        value={nameV} error={errors.name && touched.name}
                        success={nameV.length > 0 && !errors.name}
                        InputProps={{ readOnly: isView, }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormField
                        type={email.type} label={email.label} name={email.name}
                        value={emailV} error={errors.email && touched.email}
                        success={emailV.length > 0 && !errors.email}
                        InputProps={{ readOnly: isView, }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormField
                        type={phone.type} label={phone.label} name={phone.name}
                        value={phoneV} error={errors.phone && touched.phone}
                        success={phoneV.length > 0 && !errors.phone}
                        InputProps={{ readOnly: isView, }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormField 
                    type={address.type} label={address.label} name={address.name} 
                    value={addressV} error={errors.address && touched.address} 
                    success={addressV.length > 0 && !errors.address}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormField 
                    type={responsable.type} label={responsable.label} name={responsable.name} 
                    value={responsableV} error={errors.responsable && touched.responsable} 
                    success={responsableV.length > 0 && !errors.responsable}
                    InputProps={{readOnly: isView,}} 
                    />
                </Grid>



            </Grid>
        </MDBox>
    );
}

export default About;