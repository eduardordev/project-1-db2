import axios from 'axios';
import React from "react";

import { PdfCosting } from "../components/CostingPDF/costing";
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { downloadFileFromS3 } from './awsS3';

//const valid_time = localStorage.getItem('valid_time') || '';


export async function generatePdfDocument(documentData, detailCalcs, pathToSketch, headerData) {
  const userToken = localStorage.getItem('userToken') || '';
  const url = process.env.REACT_APP_IP + '/costingHeader/download/?key=' + pathToSketch;
  const config = {
    params: { "key": pathToSketch },
    headers: {
      "Authorization": "Token " + userToken
    }
  }
  let filename = headerData.costSheet+'-'+headerData.style.replace(/[^a-z0-9]/gi, '_').toLowerCase()+'.pdf';
  let pathToSketchRequest = await downloadFileFromS3(url,config);
  const blob = await pdf((
    <PdfCosting 
      data={documentData}
      title={'Hoja de Costeo'}
      subTitle={'hoja de prueba.'}
      pathToSketch={pathToSketchRequest}
      headerData={headerData}
      Calc={detailCalcs}
    />
  )).toBlob();
  saveAs(blob, filename);
};

/**
 * Add fabric detail to a costing detail
 * @param   {Object} data       data of the detail to be posted.
 * @returns {Object} response   data of the posted detail.
 */
export async function addFabricDetail(data) {
  let response={};
  const userToken = localStorage.getItem('userToken') || '';
  try {
    response= await axios.post(
      process.env.REACT_APP_IP+'/costingFabrics/',
      data,
      {headers: {
        "Authorization": "Token "+userToken,
        "Content-Type": "application/json"
      }}
    );
    return response.data
  } catch(error) {
    throw error;
  }
}

/**
 * Add materials detail to a costing detail
 * @param   {Object} data       data of the detail to be posted.
 * @returns {Object} response   data of the posted detail.
 */
export async function addMaterialDetail(data){
  let response={};
  const userToken = localStorage.getItem('userToken') || '';
  try {
    response= await axios.post(
      process.env.REACT_APP_IP+'/costingMaterials/',
      data,
      {headers: {
        "Authorization": "Token "+ userToken,
        "Content-Type": "application/json"
      }}
    );
    return response.data;
  } catch(error) {
    throw error;
  }
}

/**
 * Add embellishments detail to a costing detail
 * @param   {Object} data       data of the detail to be posted.
 * @returns {Object} response   data of the posted detail.
 */
export async function addEmbellishmmentDetail(data){
  let response={};
  const userToken = localStorage.getItem('userToken') || '';
  try {
    response = await axios.post(
      process.env.REACT_APP_IP + '/costingEmbellishment/',
      data,
      {
        headers: {
          "Authorization": "Token "+userToken,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch(error) {
    throw error;
  }
}

/**
 * Add costing detail
 * @param   {String} pathToPattern  url to the pattern document.
 * @param   {String} pathToMarker   url to the marker document.
 * @returns {Object} response       data response.
 */
export async function addNewCostingDetail(
  pathToPattern="...",
  pathToMarker="...",
  TotalTime=0.00,
  tpFabricsWhite=0.00,
  tpFabricsMedium=0.00,
  tpFabricsDark=0.00,
  tpFabricsSpecial=0.00,
  tpMaterials=0.00,
  sewing=0.00,
  cutting=0.00,
  decorationMargin=0.00
){
  let data={
    "pathToPattern": pathToPattern,
    "pathToMarker": pathToMarker,
    "totalTime": TotalTime,
    "tpFabricsWhite": tpFabricsWhite,
    "tpFabricsMedium": tpFabricsMedium,
    "tpFabricsDark": tpFabricsDark,
    "tpFabricsSpecial": tpFabricsSpecial,
    "tpMaterials": tpMaterials,
    "sewing": sewing,
    "cutting": cutting,
    "decorationMargin": decorationMargin
  }
  let response={};
  const userToken = localStorage.getItem('userToken') || '';
  try {
    response = await axios.post(
      process.env.REACT_APP_IP + '/costingDetail/'
      ,data
      ,{
        headers: {
          "Authorization": "Token "+userToken,
          "Content-Type": "application/json"
        }
      }
  );
  } catch (error) {
    throw error;
  }
  return response.data;
}

/**
 * update costing detail with new fabrics,materials,embellishments IDS.
 * @param   {BigInt}  id              id of detail
 * @param   {Object}  data            new fabrics Ids array
 * @returns {Object}  response        data response.
 */
export async function updateCostingDetail(
    id,
    data={}
  ){    
  try {
    const userToken = localStorage.getItem('userToken') || '';
    let response = await axios.patch(
      process.env.REACT_APP_IP + '/costingDetail/' + id + '/',
      data,
      {
        headers: {
          "Authorization": "Token "+userToken,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * @param   {BigInt}  headerId  header to recieve the new detail
 * @param   {BigInt}  detailId  new detail id
 * @returns {Object}  response  response data
 */
export async function updateHeaderDetail(headerId,detailId){
  try {
    const userToken = localStorage.getItem('userToken') || '';
    let response = await axios.patch(
      process.env.REACT_APP_IP + '/costingHeader/' + headerId + '/',
      {
        'detail_id': detailId
      },
      {
        headers: {
          "Authorization": "Token "+userToken,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch(error) {
    throw error;
  }
}

/**
 * Create new header and detail of costing.
 * @param {BigInt} headerId
 * @param {BigInt} detailId
 * @returns {Object}
 */
export async function CreateNewCosting(headerId,detailId,proto=true) {
  try {
    const userToken = localStorage.getItem('userToken') || '';
    let formData= new FormData();
    formData.append("header_id",headerId);
    formData.append("detail_id",detailId);
    formData.append("proto",proto);
    let response = await axios.post(
      process.env.REACT_APP_IP + '/costingHeader/new_proto/',
      formData,
      {headers: {
        "Authorization": "Token "+userToken,
        "Content-Type": "multipart/form-data;"
      }}
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function CloneCosting(headerId,flag){
  try {
    const userToken = localStorage.getItem('userToken') || '';
    let formData= new FormData();
    formData.append("id",headerId);
    formData.append("flag",flag);
    let response = await axios.post(
      process.env.REACT_APP_IP + '/costingHeader/copy_costing/',
      formData,
      {headers: {
        "Authorization": "Token "+userToken,
        "Content-Type": "multipart/form-data;"
      }}
    );
    return response;
  } catch (error) {
    throw error
  }
}

/**
 * Clean detail
 * @param {BigInt} detailId
 * @returns {null}
 */
export async function CleanDetail(detailId) {
  try {
    const userToken = localStorage.getItem('userToken') || '';
    let formData= new FormData();
    formData.append("detail_id",detailId);
    let response = await axios.post(
      process.env.REACT_APP_IP + '/costingDetail/clean_detail/',
      formData,
      {headers: {
        "Authorization": "Token "+userToken,
        "Content-Type": "multipart/form-data;"
      }}
    );
    return response;
  } catch (error) {
    throw error
  }
}