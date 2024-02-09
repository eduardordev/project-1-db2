import React from "react";
// reactstrap components
import {
  Table,
  Card,
  CardBody,
} from "reactstrap";

export const SizeCPO = ({
  selectedScale,
  selectedStyle,
  SelectedColor,
  exportDate,
  //styles_in_cpo,
}) => {
  return <>
    <Card>
      <CardBody>
        <Table>
          <tr>
            <th>Style</th>
            <th>Color</th>
            <th>Export Date</th>
            <th>Delivery Place</th>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
        </Table>
      </CardBody>

    </Card>
  </>
}