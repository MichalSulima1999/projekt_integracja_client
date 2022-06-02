import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ReactPaginate from "react-paginate";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ManageCpus = () => {
  const axiosPrivate = useAxiosPrivate();

  const [cpus, setCpus] = useState([]);
  const [cpuIds, setCpuIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const [json, setJson] = useState(null);
    const [validJson, setValidJson] = useState(false);
  
    const [xmlFile, setXmlFile] = useState(null);
    const [validXmlFile, setValidXmlFile] = useState(false);

  useEffect(() => {
    getCpus();
  }, [currentPage]);

  useEffect(() => {
    setValidJson(json?.type === "application/json");
  }, [json]);

  useEffect(() => {
    setValidXmlFile(xmlFile?.type === "text/xml");
  }, [xmlFile]);

  useEffect(() => {
    getCpus();
  }, [xmlFile]);

  const handleUploadJson = async () => {
    const formData = new FormData();
    formData.append("file", json);
    try {
      const response = await axiosPrivate.post("/cpu/upload/json", formData, {
        headers: { "Content-type": `multipart/form-data; boundary=${formData._boundary}` }
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUploadXml = async () => {
    const formData = new FormData();
    formData.append("file", xmlFile);
    try {
      const response = await axiosPrivate.post("/cpu/upload/xml", formData, {
        headers: { "Content-type": `multipart/form-data; boundary=${formData._boundary}` }
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const getCpus = async () => {
    try {
      const response = await axiosPrivate.get(`/cpu/page/${currentPage}/10`);
      setCpus(response.data.content);
      setPageCount(response.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (selectedObject) => {
    setCurrentPage(selectedObject.selected);
    console.log(selectedObject.selected);
  };

  const handleCheckboxChange = (e) => {
    let newArray = [...cpuIds, Number(e.target.id)];
    if (cpuIds.includes(Number(e.target.id))) {
      newArray = newArray.filter((cpu) => Number(cpu) !== Number(e.target.id));
    }
    setCpuIds(newArray);
    console.log(JSON.stringify({ ids: cpuIds }));
  };

  const handleDeleteMultiple = async () => {
    try {
      axiosPrivate.delete("/cpu/deleteMultiple", {
        data: JSON.stringify({ ids: cpuIds })
      });
      setCpuIds([]);
    } catch (err) {
      console.log(err);
    }
    setTimeout(getCpus, 100);
  };

  const handleDelete = async (id) => {
    try {
      axiosPrivate.delete(`/cpu/${id}`);
    } catch (err) {
      console.log(err);
    }
    setTimeout(getCpus, 100);
  };

  return (
    <div>
      <div>
        
      <div className="mb-3">
      <h1>Add cpus:</h1>
          <label htmlFor="json" className="form-label">JSON:</label>
          <input
            className="form-control mb-1"
            type="file"
            id="json"
            onChange={(e) => setJson(e.target.files[0])}
            required
            aria-invalid={validJson ? "false" : "true"}
          />
          <button onClick={handleUploadJson} className="btn btn-secondary" disabled={!validJson}>Upload json</button>
        </div>
        <div className="mb-3">
          <label htmlFor="xml" className="form-label">XML:</label>
          <input
            className="form-control mb-1"
            type="file"
            id="xml"
            onChange={(e) => setXmlFile(e.target.files[0])}
            required
            aria-invalid={validXmlFile ? "false" : "true"}
          />
          <button onClick={handleUploadXml} className="btn btn-secondary" disabled={!validXmlFile}>Upload Xml</button>
        </div>
        
        <div className="mb-3">
        <h1>Add cpu:</h1>
        <Link to="/addCpu" className="btn btn-primary">
        Open cpu form
      </Link>
        </div>
      </div>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Cores</th>
              <th scope="col">Threads</th>
              <th scope="col">Launch date</th>
              <th scope="col">Lithography</th>
              <th scope="col">Base frequency</th>
              <th scope="col">Turbo frequency</th>
              <th scope="col">TDP</th>
              <th scope="col">Socket</th>
              <th scope="col">Manufacturer</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {cpus.map((cpu) => {
              return (
                <tr key={cpu.id}>
                  <th scope="row">
                    <input
                      type="checkbox"
                      id={cpu.id}
                      value={cpu.id}
                      className="form-check-input"
                      onChange={handleCheckboxChange}
                    ></input>
                    {cpu.id}
                  </th>
                  <td>{cpu.name}</td>
                  <td>{cpu.cores}</td>
                  <td>{cpu.threads}</td>
                  <td>
                    {new Date(Number(cpu.launchDate)).toLocaleDateString(
                      "pl-PL"
                    )}
                  </td>
                  <td>{cpu.lithography}</td>
                  <td>{cpu.baseFrequency}</td>
                  <td>{cpu.turboFrequency}</td>
                  <td>{cpu.tdp}</td>
                  <td>{cpu.socket}</td>
                  <td>{cpu.manufacturer}</td>
                  <td>
                    <Link to={`/editCpu/${cpu.id}`} className="btn btn-primary">
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(cpu.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <button className="btn btn-danger" onClick={handleDeleteMultiple}>Delete cpus</button>
      </div>
      <div class="d-flex justify-content-center">
        <ReactPaginate
          pageCount={pageCount}
          marginPagesDisplayed={4}
          onPageChange={handlePageChange}
          containerClassName={"d-flex list-unstyled"}
          previousLinkClassName={"btn btn-secondary"}
          breakClassName={"btn btn-secondary"}
          nextLinkClassName={"btn btn-secondary"}
          pageClassName={"btn btn-primary"}
          disabledClassNae={"disabled"}
          activeClassName={"active"}
        />
      </div>

      
      
    </div>
  );
};

export default ManageCpus;
