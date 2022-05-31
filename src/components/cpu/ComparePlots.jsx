import React from 'react'
import { useEffect, useState } from "react";
import moment from 'moment';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ComparePlots = () => {
    const axiosPrivate = useAxiosPrivate();
    const [intel, setIntel] = useState([]);
    const [amd, setAmd] = useState([]);
    const [dataKey, setDataKey] = useState("cores");

    useEffect(() => {
        getCpus();
    }, []);

    const getCpus = async () => {
        try {
          const response = await axiosPrivate.get(`/cpu`);
          setIntel(response.data.filter(e => e.manufacturer === "Intel"));
          setAmd(response.data.filter(e => e.manufacturer === "AMD"));
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div>
        <h1>Cpu chart</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey={dataKey} data={intel} stroke="#8884d8" />
          <Line type="monotone" dataKey={dataKey} data={amd} stroke="#ff1111" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis 
            dataKey="launchDate"
            name = 'Launch date'
            domain = {['auto', 'auto']}
            tickFormatter = {(unixTime) => moment(unixTime).format('DD.MM.YYYY')} 
            type="number"
          />
          <YAxis dataKey = {dataKey} name = {dataKey}/>
          <Legend />
        </LineChart>
      </ResponsiveContainer>
      <div className="mb-3">
        <label htmlFor="dataKey" className="form-label">
          Chart key
        </label>
        <select
          className="form-control"
          id="dataKey"
          onChange={(e) => setDataKey(e.target.value)}
          value={dataKey}
        >
          <option value="cores">Core count</option>
          <option value="threads">Thread count</option>
          <option value="lithography">Litography</option>
          <option value="baseFrequency">Base frequency</option>
          <option value="turboFrequency">Turbo frequency</option>
          <option value="tdp">TDP</option>
        </select>
      </div>
    </div>
  )
}

export default ComparePlots