import { useState, useRef, useEffect, useCallback, useContext } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import Layout from "../components/Layout";
import moment from "moment";

//canada-usa flags
import canada from "../assets/img/canada.png";
import usa from "../assets/img/usa.png";

//bootstrap
import { Button } from "react-bootstrap";

//css
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { Link, useNavigate } from "react-router-dom";

//Toastify
import { toast } from "react-toastify";

//Context API
import { AuthContext } from "../context/AuthContext";

const ListQuotation = ({ activeLayout }) => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState();

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  //Load ALL Quotation data from api
  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_API_URL + "/api/quotation/list", {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
        .then((result) => result.json())
        .then((res) => {
          if (res.errors) {
            res.errors.map((error) => toast.error(error));
          } else {
            setRowData(res);
            //gridRef.current.api.setRowData(res);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, [user.token]);

  const onGridReady = useCallback((params) => {
    //gridRef.current.api.sizeColumnsToFit();
    //gridRef.current.columnApi.autoSizeColumns();
  }, []);

  // Each Column Definition results in one Column.
  const [columnDefs] = useState([
    { field: "customerId.name", headerName: "Customer", flex: 1 },
    { field: "userId.name", headerName: "Salesperson", flex: 0.8 },
    {
      field: "quoteGiven",
      flex: 0.8,
      cellRenderer: (data) => {
        return "$" + data.value;
      },
    },
    {
      field: "date",
      headerName: "Date Sent",
      flex: 0.8,
      cellRenderer: (data) => {
        return moment.utc(data.value).format("YYYY-MM-DD");
      },
    },
    {
      field: "followUp",
      flex: 0.8,
      cellRenderer: (data) => {
        return moment.utc(data.value).format("YYYY-MM-DD");
      },
    },
    { field: "quoteDetails", flex: 1, headerName: "Quote Note" },
    {
      field: "createdAt",
      flex: 0.8,
      headerName: "Date Created",
      sort: "desc",
      cellRenderer: (data) => {
        return moment.utc(data.value).format("YYYY-MM-DD");
      },
    },

    {
      field: "location",
      headerName: "Location",
      flex: 0.5,
      cellRenderer: (data) => {
        if (data.value === "CANADA") return <img className="flag" src={canada} alt="canada" />;
        if (data.value === "USA") return <img className="flag" src={usa} alt="usa" />;
      },
    },

    {
      field: "status",
      flex: 0.5,
      cellStyle: (params) => {
        if (params.value === "Pending") {
          return { color: "white", backgroundColor: "#d4b400", textAlign: "center" };
        }
        if (params.value === "Approved") {
          return { color: "white", backgroundColor: "#0047AB", textAlign: "center" };
        }
        if (params.value === "Finished") {
          return { color: "white", backgroundColor: "#018024", textAlign: "center" };
        }
        if (params.value === "Canceled") {
          return { color: "white", backgroundColor: "#9f1916", textAlign: "center" };
        }
        return null;
      },
    },
    {
      field: "Actions",
      flex: 0.8,
      cellClass: "ag-right-aligned-cell",
      cellRenderer: (row) => {
        return (
          <>
            {/* {row.data.location === "CANADA" && <img className="flag" src={canada} alt="" />}
            {row.data.location === "USA" && <img className="flag" src={usa} alt="" />}{" "} */}
            <Button variant="primary " size="sm" href={row.data.file} target="_blank ">
              <i className="bi bi-filetype-pdf"></i>
            </Button>{" "}
            <Button variant="secondary" size="sm" onClick={() => handleEdit(row.data._id)}>
              <i className="bx bxs-pencil"></i>
            </Button>{" "}
            <Button variant="danger" size="sm" onClick={() => handleDelete(row)}>
              <i className="bx bx-x"></i>
            </Button>
          </>
        );
      },
    },
  ]);

  // Click in the cell
  const cellClickedListener = useCallback((event) => {
    if (event.colDef.field === "quoteDetails") {
      alert(event.value);
    }
  }, []);

  // Example using Grid's API
  // const buttonListener = useCallback((e) => {
  //   gridRef.current.api.deselectAll();
  // }, []);

  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById("page-size").value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  //EDIT Function
  const handleEdit = (id) => {
    navigate("/update_quotation/" + id);
  };

  //DELETE Function
  const handleDelete = async (row) => {
    try {
      await fetch(process.env.REACT_APP_API_URL + "/api/quotation/" + row.data._id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
        .then((result) => result.json())
        .then((res) => {
          if (res.errors) {
            res.errors.map((error) => toast.error(error));
          } else {
            toast.success("Quotation $" + res.quoteGiven + " Deleted Successufly");
            //REMOVE THE LINE
            row.api?.applyTransaction({ remove: [row.data] });

            // const newTable = rowData.filter(function (row) {
            //   return row._id !== id;
            // });
            //const newTable = rowData.filter((row) => row._id !== id);

            //setRowData(newTable);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Layout activeLayout={activeLayout}>
      {/* Example using Grid's API */}
      {/* <button onClick={buttonListener}>Push Me</button> */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Link to={"/add_quotation"}>
            <Button>Add Quotation</Button>
          </Link>
        </div>
        <div>
          Page Size:{" "}
          <select onChange={onPageSizeChanged} id="page-size">
            <option value="15">15</option>
            <option value="50">100</option>
            <option value="100">500</option>
            <option value="500">1000</option>
          </select>
        </div>
      </div>
      <br />
      <div className="ag-theme-alpine" style={{ width: "100%", height: activeLayout === false ? "50vh" : "75vh" }}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={{ sortable: true, filter: true, resizable: true }} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          onGridReady={onGridReady}
          suppressMenuHide={true}
          pagination={true}
          paginationPageSize={14}
        />
      </div>
    </Layout>
  );
};

export default ListQuotation;
