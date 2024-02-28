
import Grid from "@mui/material/Grid";
import MDBox from "../../../../components/MDBox";
import FormField from "../../../../components/FormField";


// About.js
const About = ({ isView, formData }) => {
    const { formField, values, errors, touched } = formData;
    const { nit, name, date, infile_detail, total, status } = formField;
    const {
      nit: nitV,
      name: nameV,
      date: dateV,
      infile_detail: infile_detailV,
      total: totalV,
      status: statusV,
    } = values;
  
    return (
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormField
              type={nit.type}
              label={nit.label}
              name={nit.name}
              value={nitV}
              error={errors.nit && touched.nit}
              success={nitV.length > 0 && !errors.nit}
              InputProps={{ readOnly: isView }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField
              type={name.type}
              label={name.label}
              name={name.name}
              value={nameV}
              error={errors.name && touched.name}
              success={nameV.length > 0 && !errors.name}
              InputProps={{ readOnly: isView }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField
              type={date.type}
              label={date.label}
              name={date.name}
              value={dateV}
              error={errors.date && touched.date}
              success={dateV.length > 0 && !errors.date}
              InputProps={{ readOnly: isView }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Utiliza un componente de selección (dropdown) para infile_detail */}
            <FormField
              type={infile_detail.type}
              label={infile_detail.label}
              name={infile_detail.name}
              value={infile_detailV}
              error={errors.infile_detail && touched.infile_detail}
              success={infile_detailV.length > 0 && !errors.infile_detail}
              options={infile_detail.options}
              InputProps={{ readOnly: isView }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField
              type={total.type}
              label={total.label}
              name={total.name}
              value={totalV}
              error={errors.total && touched.total}
              success={totalV.length > 0 && !errors.total}
              InputProps={{ readOnly: isView }}
            />
          </Grid>
    
        </Grid>
      </MDBox>
    );
  }
  
  export default About;
  