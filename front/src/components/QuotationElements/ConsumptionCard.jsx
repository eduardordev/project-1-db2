import React from 'react';

import {
  Input,
  Table
} from "reactstrap";

function ConsumptionCard({ ...props }) {

  const quickCosting = props.quickCosting;

  function updateFabricValues(fabric, fabricKey, waste) {
    let plies = fabric.dm_pt ? 1 : 2;
    let ydsXunit = (fabric.Bwidth / 36) * (1 / (fabric.dm_width * plies)) * fabric.Blong;
    let lbsXunit = (ydsXunit / fabric.yieldydslbs);

    // weightBWashOriginal original

    // weightBWashCalculated update
    fabric.weightBWashCalculated = fabric.weightBWashOriginal / 33.9057475;
    if (document.getElementById(`consumption-${fabricKey}-weightBWashCalculated`))
      document.getElementById(`consumption-${fabricKey}-weightBWashCalculated`).value = fabric.weightBWashCalculated.toFixed(4);

    // yieldydslbs update
    fabric.yieldydslbs = (576 / (fabric.weightBWashCalculated * plies * fabric.dm_width));
    if (document.getElementById(`consumption-${fabricKey}-yieldydslbs`))
      document.getElementById(`consumption-${fabricKey}-yieldydslbs`).value = fabric.yieldydslbs.toFixed(4);

    // lbsunit update
    fabric.lbsunit = ((fabric.markerLong / fabric.pieceByMarker) / (fabric.yieldydslbs)) + lbsXunit;
    if (document.getElementById(`consumption-${fabricKey}-lbsunit`))
      document.getElementById(`consumption-${fabricKey}-lbsunit`).value = fabric.lbsunit.toFixed(4);

    // lbsunitwaste update
    fabric.lbsunitwaste = fabric.lbsunit * (1.05);
    if (document.getElementById(`consumption-${fabricKey}-lbsunitwaste`))
      document.getElementById(`consumption-${fabricKey}-lbsunitwaste`).value = fabric.lbsunitwaste.toFixed(4);

    // sqinchunit update
    fabric.sqinchunit = (fabric.markerWidth * fabric.markerLong * 36 * (fabric.markerEfficiency / 100)) / fabric.pieceByMarker;
    if (document.getElementById(`consumption-${fabricKey}-sqinchunit`))
      document.getElementById(`consumption-${fabricKey}-sqinchunit`).value = fabric.sqinchunit.toFixed(4);

    // ydsunit update
    if (waste) {
      fabric.ydsunit = fabric.yieldydslbs * fabric.lbsunit;
    }
    else {
      fabric.ydsunit = fabric.yieldydslbs * fabric.lbsunit / 1.05;
    }
    // fabric.ydsunit = fabric.yieldydslbs * fabric.lbsunitwaste;
    if (document.getElementById(`consumption-${fabricKey}-ydsunit`))
      document.getElementById(`consumption-${fabricKey}-ydsunit`).value = fabric.ydsunit.toFixed(4);

    // ydsXunit add
    fabric.ydsXunit = ydsXunit
    if (document.getElementById(`consumption-${fabricKey}-ydsXunit`))
      document.getElementById(`consumption-${fabricKey}-ydsXunit`).value = fabric.ydsXunit.toFixed(4);

    // lbsXunit add
    fabric.lbsXunit = lbsXunit
    if (document.getElementById(`consumption-${fabricKey}-lbsXunit`))
      document.getElementById(`consumption-${fabricKey}-lbsXunit`).value = fabric.lbsXunit.toFixed(4);
    return fabric;
  }

  function getTotals(){
    let lbsunitT = 0
    let lbsunitwasteT = 0
    let sqinchunitT = 0
    let ydsunitT = 0
    props.fabrics.forEach(element => {
      lbsunitT += element.lbsunit
      lbsunitwasteT += element.lbsunitwaste
      sqinchunitT += element.sqinchunit
      ydsunitT += element.ydsunit
    });
    return [ lbsunitT, lbsunitwasteT, sqinchunitT, ydsunitT,]
  }

  const sums = {
    lbsunit: 0,
    lbsunitwaste: 0,
    sqinchunit: 0,
    ydsunit: 0
  }
  return (
    <div>
      <Table className="tablesorter" style={{ width: "2000px" }} responsive>
        <thead className="text-primary">
          <tr>
            <th style={{ width: "250px" }}>DM</th>{/** select.label */}
            <th style={{ width: "50px" }}>Weight b. wash O.</th>{/** weightBWashOriginal */}
            <th style={{ width: "50px" }}>Weight b. wash C.</th>{/** weightBWashCalculated */}
            <th style={{ width: "50px" }}>F. Width</th>{/** dm_width */}
            <th style={{ width: "50px" }}>Marker Width</th>{/** markerWidth */}
            <th style={{ width: "50px" }}>Piles Tubular</th>{/** dm_pt */}
            <th style={{ width: "50px" }}>Yield (yd/lb)</th>{/** yieldydslbs */}
            <th style={{ width: "50px" }}>% Utilization</th>{/** markerEfficiency */}
            <th style={{ width: "50px" }}>Marker length</th>{/** markerLong */}
            <th style={{ width: "50px" }}>Units in marker</th>{/** pieceByMarker */}
            <th style={{ width: "50px" }}>lb * unit</th>{/** lbsunit */}
            <th style={{ width: "50px" }}>lb * unit + waste</th>{/** lbsunitwaste */}
            <th style={{ width: "50px" }}>inch^2 / unit</th>{/** sqinchunit */}
            <th style={{ width: "50px" }}>yd / unit</th>{/** ydsunit */}
          </tr>
        </thead>
        <tbody>
          {
            (props.fabrics !== undefined) && (props.fabrics.length > 0) &&
            (
              props.fabrics.map((val, key) => {
                let selectedFabric = props.fabricsCatalog.find(o => o.id === val.id);
                let tempWeightBWashOriginal = 0;
                let tempMarkerWidth = 0;
                let dm_width = parseFloat(val.dm_width ? val.dm_width : 0);
                let weightBWashOriginal = parseFloat(val.weightBWashOriginal ? val.weightBWashOriginal : 0);
                let markerWidth = parseFloat(val.markerWidth ? val.markerWidth : 0)
                sums.lbsunit += parseFloat(val.lbsunit ? val.lbsunit : 0.0);
                sums.lbsunitwaste += parseFloat(val.lbsunitwaste ? val.lbsunitwaste : 0.0);
                sums.sqinchunit += parseFloat(val.sqinchunit ? val.sqinchunit : 0.00);
                sums.ydsunit += parseFloat(val.ydsunit ? val.ydsunit : 0.00);
                if (selectedFabric && selectedFabric !== undefined) {
                  tempWeightBWashOriginal = weightBWashOriginal > 0 ? weightBWashOriginal : selectedFabric.weight;
                  tempMarkerWidth = markerWidth > 0 ? markerWidth : selectedFabric.widthMark;
                  val.dm_width = dm_width > 0.00 ? dm_width : selectedFabric.width;
                } else {
                  tempWeightBWashOriginal = weightBWashOriginal;
                  tempMarkerWidth = markerWidth;
                  val.dm_width = dm_width;
                }
                val.weightBWashOriginal = tempWeightBWashOriginal;
                val.markerWidth = tempMarkerWidth;
                updateFabricValues(val, key, val.wasted_flag);
                return (
                  <>
                    <tr key={key}>

                      <td>

                        {/** DM: select.label */}
                        <p className="text-primary">
                          {val.show_name ? val.show_name : ""}
                        </p>
                      </td>
                      <td>
                        {/** weightBWashOriginal */}
                        <Input
                          id={`consumption-${key}-weightBWashOriginal`}
                          type="number"
                          value={val.weightBWashOriginal}
                          onChange={(event) => props.masterHandle(
                            "weightBWashOriginal",
                            key,
                            event.target.value
                          )}
                          min="0.00"
                          max="999"
                          step="any"
                          disabled={!quickCosting}
                        >
                        </Input>
                      </td>
                      <td>
                        {/** weightBWashCalculated */}
                        <Input
                          id={`consumption-${key}-weightBWashCalculated`}
                          type="number"
                          value={isNaN(val.weightBWashCalculated) ? 0.0 : val.weightBWashCalculated.toFixed(4)}
                          min="0.00"
                          max="999"
                          step="any"
                          disabled={quickCosting}
                        >
                        </Input>
                      </td>
                      <td>
                        {/** dm_width */}
                        <Input
                          id={`consumption-${key}-dm_width`}
                          type="number"
                          value={isNaN(val.dm_width) ? 0.0 : val.dm_width}
                          onChange={(event) => props.masterHandle(
                            "dm_width",
                            key,
                            event.target.value
                          )}
                          min="0.00"
                          max="999"
                          step="any"
                          disabled={!quickCosting}
                        >
                        </Input>
                      </td>
                      <td>
                        {/** markerWidth */}
                        <Input
                          id={`consumption-${key}-markerWidth`}
                          type="number"
                          value={val.markerWidth ? val.markerWidth : 0.0}
                          onChange={(event) => props.masterHandle(
                            "markerWidth",
                            key,
                            event.target.value
                          )}
                          min="0.00"
                          max="999"
                          step="any"
                          disabled={!quickCosting}
                        >
                        </Input>
                      </td>
                      <td>
                        {/** dm_pt */}
                        <Input
                          id={`consumption-${key}-dm_pt`}
                          type="number"
                          value={val.dm_pt ? 1 : 2}
                          onChange={(event) => props.masterHandle(
                            "dm_pt",
                            key,
                            event.target.value
                          )}
                          min="0.00"
                          max="2"
                          step="any"
                          disabled={quickCosting}
                        >
                        </Input>
                      </td>
                      <td>
                        {/** yieldydslbs */}
                        <Input
                          id={`consumption-${key}-yieldydslbs`}
                          type="number"
                          value={isNaN(val.yieldydslbs) ? 0.0 : val.yieldydslbs.toFixed(4)}
                          min="0.00"
                          max="999"
                          step="any"
                          disabled={quickCosting}
                        >
                        </Input>
                      </td>
                      <td>
                        {/** markerEfficiency */}
                        <Input
                          id={`consumption-${key}-markerEfficiency`}
                          type="number"
                          value={val.markerEfficiency ? val.markerEfficiency : 0.00}
                          onChange={(event) => props.masterHandle(
                            "markerEfficiency",
                            key,
                            event.target.value
                          )}
                          min="0"
                          max="100"
                          step="any"
                          disabled={!quickCosting}
                        >
                        </Input>
                      </td>
                      <td>
                        {/** markerLong */}
                        <Input
                          id={`consumption-${key}-markerLong`}
                          type="number"
                          value={val.markerLong ? val.markerLong : 0.00}
                          onChange={(event) => props.masterHandle(
                            "markerLong",
                            key,
                            event.target.value
                          )}
                          min="0.00"
                          max="999"
                          step="any"
                          disabled={!quickCosting}
                        >
                        </Input>
                      </td>
                      <td>
                        {/** pieceByMarker */}
                        <Input
                          id={`consumption-${key}-pieceByMarker`}
                          type="number"
                          value={val.pieceByMarker ? val.pieceByMarker : 0.0}
                          onChange={(event) => props.masterHandle(
                            "pieceByMarker",
                            key,
                            event.target.value
                          )}
                          min="0.00"
                          max="999"
                          step="any"
                          disabled={!quickCosting}
                        >
                        </Input>
                      </td>
                      <td>
                        {/** lbsunit */}
                        <Input
                          id={`consumption-${key}-lbsunit`}
                          type="number"
                          value={val.lbsunit ? val.lbsunit : 0.0}
                          onChange={(event) => props.masterHandle(
                            "lbsunit",
                            key,
                            event.target.value
                          )}
                          min="0.00"
                          max="999"
                          step="any"
                          disabled={quickCosting}
                        >
                        </Input>
                      </td>
                      <td>
                        {/** lbsunitwaste */}
                        <Input
                          id={`consumption-${key}-lbsunitwaste`}
                          type="number"
                          value={val.lbsunitwaste ? val.lbsunitwaste.toFixed(4) : 0.0}
                          min="0.00"
                          max="999"
                          step="any"
                          disabled={quickCosting}
                        >
                        </Input>
                      </td>
                      <td>
                        {/** sqinchunit */}
                        <Input
                          id={`consumption-${key}-sqinchunit`}
                          type="number"
                          value={val.sqinchunit ? val.sqinchunit.toFixed(4) : 0.0}
                          min="0.00"
                          max="9999"
                          step="any"
                          disabled={quickCosting}
                        >
                        </Input>
                      </td>
                      <td>
                        {/** ydsunit */}
                        <Input
                          id={`consumption-${key}-ydsunit`}
                          type="number"
                          value={val.ydsunit ? val.ydsunit.toFixed(4) : 0.0}
                          min="0.00"
                          max="999"
                          step="any"
                          disabled={quickCosting}
                        >
                        </Input>
                      </td>
                    </tr>
                  </>
                )
              })
            )
          }
          <tr className="text-primary">
            <td colSpan="10"></td>
            <th className="text-primary">{getTotals()[0].toFixed(2) } lbs</th>
            <th className="text-primary">{getTotals()[1].toFixed(2) } lbs</th>
            <th className="text-primary">{getTotals()[2].toFixed(2) } inch</th>
            <th className="text-primary">{getTotals()[3].toFixed(2) } yds</th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default React.memo(ConsumptionCard);