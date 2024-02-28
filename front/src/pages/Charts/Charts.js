import React from "react";
import MDBox from "../../components/MDBox";
import Iframe from 'react-iframe';
import { Typography, Container, Paper } from "@mui/material";

const Charts = () => {
  return (
    <Container maxWidth="lg" style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px", width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Estadisticas de Ventas
        </Typography>
      </Paper>

      <MDBox />
      
      <div style={{ background: "#F1F5F4", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)", width: "110%", height: "100vh", overflow: "hidden"}}>
        <Iframe
          url="https://charts.mongodb.com/charts-bd2-cykpu/embed/dashboards?id=7416cd84-f1d7-4626-9cac-ce56aa5e873d&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"
          width="80%"
          height="100%"
          frameBorder="0"
          position="relative"
          allowFullScreen
          styles={{ border: "none", width: "100%", height: "100%" }}
        />
      </div>
    </Container>
  );
};

export default Charts;
