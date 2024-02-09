import React from "react";
import ReactTable from "react-table";
import { matchSorter } from 'match-sorter';
import {
  Button
} from "reactstrap";

export const ProductionMaterials = ({
  materials,
  onDelete,
  onUpdate,
  onUpload
}) => {
  //console.log(materials)

  return <ReactTable
    filterable
    data={materials.map(material => {
      return {
        id: material.id,
        old_costing_id: material.old_costing_id,
        client: material.client,
        description: `${material.description}`,
        provider: material.provider ? material.provider: '',
        //size: material.size.name,
        //min: material.min,
        type: material.type,
        ingested: material.ingested,
        actions: (
          <>
            <Button
              color="info"
              size="sm"
              className="btn-icon btn-link"
              onClick={() => {
                onUpdate(material.id)
                //this.updateProductionMaterial(material.id);
              }}
            ><i className="fa fa-edit" /></Button>
            {!material.ingested ?
            <Button
              color="primary"
              size="sm"
              className="btn-icon btn-link"
              onClick={() => //console.log(material.id)}
                onUpload(material.id)}
            >
              <i className="fa fa-upload" />
            </Button>
            :<></>}
            <Button
              color="danger"
              size="sm"
              className="btn-icon btn-link"
              onClick={() => //console.log(material.id)}
                onDelete(material.id)}
            >
              <i className="fa fa-times" />
            </Button>
            
          </>)
      }
    })}
    columns={[
      {
        Header: "Code",
        accessor: "old_costing_id",
        filterMethod: (filter, row) =>
          matchSorter(row, filter.value, { keys: ["old_costing_id"] }),
        filterAll: true
      },
      {
        Header: "Description",
        accessor: "description",
        filterMethod: (filter, row) =>
          matchSorter(row, filter.value, { keys: ["description"] }),
        filterAll: true
      },
      {
        Header: "Client",
        accessor: "client",
        filterMethod: (filter, row) =>
          matchSorter(row, filter.value, { keys: ["client"] }),
        filterAll: true
      },
      {
        Header: "Provider",
        accessor: "provider",
        filterMethod: (filter, row) =>
          matchSorter(row, filter.value, { keys: ["provider"] }),
        filterAll: true
      },
      
      {
        Header: "Type",
        accessor: "type",
        filterMethod: (filter, row) =>
          matchSorter(row, filter.value, { keys: ["type"] }),
        filterAll: true
      },
      
      {
        Header: "Actions",
        accessor: "actions",
        sortable: false,
        filterable: false,
        width: 150

      }
    ]}
    defaultPageSize={10}
  />
}