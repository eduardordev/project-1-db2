import React from "react";
import ReactTable from "react-table";
import "./CostingHistory.css";
import { matchSorter } from "match-sorter";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

let data = [];
let approvalStates = {
  N: "In Progress",
  A: "Sent to Account",
  J: "Sent to Admin",
  D: "Approve by Admin",
};

function CostingHistory({ ...props }) {
  const Access = JSON.parse(localStorage.getItem("permissions") || "{}");
  const Role = localStorage.getItem("role") || "";
  //console.log(Access,Role);
  function customDateFormat(date) {
    const dateObj = new Date(date);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateObj);
  }
  data = props.dataTable.map((prop, key) => {
    let updateUser = false;
    if (
      prop.updating_user !== "" &&
      prop.updating_user !== "None" &&
      prop.updating_user !== null
    ) {
      updateUser = true;
    }
    updateUser = Role === "Consulting" || Role === "Telas" ? false : updateUser;
    return {
      id: key,
      codigo: prop.id,
      client: prop.client.name,
      season: prop.season.name,
      style: prop.style,
      approvalStatus: approvalStates[prop.approvalStatus],
      created_at: customDateFormat(prop.created_at),
      updating_user: prop.updating_user,
      type: prop.qcFlag ? "QuickCosting" : "Costing",
      actions: (
        <Row style={{ maxWidth: "80%" }}>
          {prop.approvalStatus === "D" ? (
            <>
              <Col xs={6}>
                <Button
                  color="info"
                  size="sm"
                  className="btn-icon btn-link"
                  disabled={updateUser}
                  onClick={() => props.OpenSheet(prop.id, prop.qcFlag)}
                >
                  <i className="fa fa-edit" />
                </Button>
              </Col>
              <Col xs={6}>
                {Access.costing.edit && (
                  <Button
                    color="primary"
                    size="sm"
                    className="btn-icon btn-link"
                    onClick={() => props.cloneCosting(prop.id, prop.detail_id)}
                  >
                    <i className="fa fa-clone" />
                  </Button>
                )}
              </Col>
              <Col xs={6}>
                {Access.costing.edit && (
                  <Button
                    color="primary"
                    size="sm"
                    className="btn-icon btn-link"
                    type={"button"}
                    onClick={() => props.showResume(prop)}
                  >
                    <i className="fa fa-search" />
                  </Button>
                )}
              </Col>
            </>
          ) : (
            <>
              {" "}
              <Col xs={6}>
                <Button
                  color="info"
                  size="sm"
                  className="btn-icon btn-link"
                  disabled={updateUser}
                  onClick={(e) => {
                    if (!updateUser) {
                      //console.log(prop)
                      props.OpenSheet(prop.id, prop.qcFlag);
                    } else {
                      e.preventDefault();
                    }
                  }}
                >
                  <i className="fa fa-edit" />
                </Button>
              </Col>
              <Col xs={6}>
                {Access.costing.edit && (
                  <Button
                    color="primary"
                    size="sm"
                    className="btn-icon btn-link"
                    onClick={() => props.cloneCosting(prop.id, prop.detail_id)}
                  >
                    <i className="fa fa-clone" />
                  </Button>
                )}
              </Col>
              <Col xs={6}>
                {Access.costing.edit && (
                  <Button
                    color="primary"
                    size="sm"
                    className="btn-icon btn-link"
                    type={"button"}
                    onClick={() => props.showResume(prop)}
                  >
                    <i className="fa fa-search" />
                  </Button>
                )}
              </Col>
              <Col xs={6}>
                {Access.costing.delete && (
                  <Button
                    color="danger"
                    size="sm"
                    className="btn-icon btn-link"
                    disabled={updateUser}
                    onClick={(e) => {
                      if (!updateUser) {
                        props.removeCosting(prop.id);
                      } else {
                        e.preventDefault();
                      }
                    }}
                  >
                    <i className="fa fa-times" />
                  </Button>
                )}
              </Col>
            </>
          )}
        </Row>
      ),
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">CostSheets List</CardTitle>
      </CardHeader>
      <CardBody>
        <ReactTable
          responsive
          data={data}
          filterable
          defaultFilterMethod={(filter, row) => {
            const id = filter.pivotId || filter.id;
            //console.log(filter,row[id],id);
            const filterValue =
              filter.id === "codigo"
                ? parseFloat(filter.value)
                : filter.value.toLowerCase();
            const filterRow = id === "codigo" ? row[id] : row[id].toLowerCase();
            return row[id] !== undefined
              ? String(filterRow).startsWith(filterValue)
              : true;
          }}
          columns={[
            {
              Header: "CODE",
              accessor: "codigo",
              width: 90,
            },
            {
              Header: "CLIENT",
              accessor: "client",
            },
            {
              Header: "SEASON",
              accessor: "season",
              filterMethod: (filter, row) =>
                matchSorter(row, filter.value, { keys: ["season"] }),
              filterAll: true,
            },
            {
              Header: "STYLE",
              accessor: "style",
              width: 200,
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["style"] }),
              filterAll: true,
            },
            {
              Header: "Approval State",
              accessor: "approvalStatus",
            },
            {
              Header: "Updating User",
              accessor: "updating_user",
              filterMethod: (filter, row) =>
                matchSorter(row, filter.value, { keys: ["updating_user"] }),
              filterAll: true,
            },
            {
              Header: "Type",
              accessor: "type",
              sortable: false,
              filterable: false,
            },
            {
              Header: "ACTION",
              accessor: "actions",
              sortable: false,
              filterable: false,
              width: 100,
            },
          ]}
          defaultPageSize={10}
          showPaginationTop
          showPaginationBottom={false}
          defaultSorted={[
            {
              id: "codigo",
              desc: true,
            },
          ]}
          className="-striped -highlight primary-pagination"
        />
      </CardBody>
    </Card>
  );
}

export default CostingHistory;
