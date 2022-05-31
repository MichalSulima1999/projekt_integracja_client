import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ReactPaginate from "react-paginate";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ManageCpus = () => {
  const axiosPrivate = useAxiosPrivate();

  const [cpus, setCpus] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  useEffect(()=>{
    getCpus();
  }, [currentPage]);

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

  const handleDelete = async (id) => {
    try {
      axiosPrivate.delete(`/cpu/${id}`);
    } catch (err) {
      console.log(err);
    }
    setTimeout(getCpus, 100);
  }

  return (
    <div>
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
          {cpus.map(cpu => {
            return (
              <tr>
            <th scope="row">{cpu.id}</th>
            <td>{cpu.name}</td>
            <td>{cpu.cores}</td>
            <td>{cpu.threads}</td>
            <td>{new Date(Number(cpu.launchDate)).toLocaleDateString("pl-PL")}</td>
            <td>{cpu.lithography}</td>
            <td>{cpu.baseFrequency}</td>
            <td>{cpu.turboFrequency}</td>
            <td>{cpu.tdp}</td>
            <td>{cpu.socket}</td>
            <td>{cpu.manufacturer}</td>
            <td><Link to={`/editCpu/${cpu.id}`} className="btn btn-primary">Edit</Link></td>
            <td><button className="btn btn-danger" onClick={() => handleDelete(cpu.id)}>Delete</button></td>
          </tr>
            )
          })}
        </tbody>
      </Table>
      </div>
      <div class="d-flex justify-content-center">
      <ReactPaginate
					pageCount={pageCount}
					marginPagesDisplayed={4}
					onPageChange={handlePageChange}
					containerClassName={'d-flex list-unstyled'}
					previousLinkClassName={'btn btn-secondary'}
					breakClassName={'btn btn-secondary'}
					nextLinkClassName={'btn btn-secondary'}
					pageClassName={'btn btn-primary'}
					disabledClassNae={'disabled'}
					activeClassName={'active'}
				/>
      </div>
      

      <Link to="/addCpu" className="btn btn-primary">Add cpu</Link>
    </div>
  );
};

export default ManageCpus;
