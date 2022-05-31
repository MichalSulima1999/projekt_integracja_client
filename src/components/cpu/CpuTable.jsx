import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'ns2:name', headerName: 'Name', width: 200 },
  { field: 'ns2:cores', headerName: 'Cores', width: 70 },
  { field: 'ns2:threads', headerName: 'Threads', width: 70 },
  { field: 'ns2:launch_date', headerName: 'Launch date', width: 150 },
  { field: 'ns2:lithography', headerName: 'Lithography', width: 100 },
  { field: 'ns2:base_frequency', headerName: 'Base frequency', width: 100 },
  { field: 'ns2:turbo_frequency', headerName: 'Turbo frequency', width: 100 },
  { field: 'ns2:tdp', headerName: 'TDP', width: 70 },
  { field: 'ns2:socket', headerName: 'Socket', width: 130 },
  { field: 'ns2:manufacturer', headerName: 'Manufacturer', width: 130 },
];

const CpuTable = ({data}) => {
  
  return <div style={{ height: 650, width: '100%' }} className="mb-5 pb-1">
    <h1>Cpu table</h1>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row["ns2:id"]}
      />
  </div>
};

export default CpuTable;
