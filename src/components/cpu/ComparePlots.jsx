import React from 'react'
import { useEffect, useState } from "react";
import moment from 'moment';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ScatterChart, 
  Scatter,
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
          const response = await axiosPrivate.get(`/cpu/byDate`);
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
        <ScatterChart
          
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Scatter name="Intel" dataKey={dataKey} data={intel} fill="#8884d8" />
          <Scatter name="AMD" dataKey={dataKey} data={amd} fill="#ff1111" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis 
            dataKey="launchDate"
            name = 'Launch date'
            domain = {['auto', 'auto']}
            tickFormatter = {(unixTime) => moment(unixTime).format('DD.MM.YYYY')} 
            type="number"
          />
          <YAxis dataKey = {dataKey} name = {dataKey}/>
          <Tooltip
            content={(props) => (
              <div
                style={{
                  border: "#bbb 1.5px solid",
                }}
              >
                <p
                  style={{
                    margin: "0 0",
                    padding: "3px 7.5px",
                    backgroundColor: "white",
                  }}
                >
                  Name: {" "}
                  {props.payload &&
                    props.payload[0] != null &&
                    props.payload[0].payload["name"]}
                </p>
                <p
                  style={{
                    margin: "0 0",
                    padding: "3px 7.5px",
                    backgroundColor: "white",
                  }}
                >
                  Launch date:{" "}
                  {props.payload &&
                    props.payload[0] != null &&
                    moment(props.payload[0].payload["launchDate"]).format('DD.MM.YYYY')
                    }
                </p>
                <p
                  style={{
                    margin: "0 0",
                    padding: "3px 7.5px",
                    backgroundColor: "white",
                  }}
                >
                  {dataKey} {": "}
                  {props.payload &&
                    props.payload[0] != null &&
                    props.payload[0].payload[dataKey]}
                </p>
                </div>
            )}
          />
          <Legend />
        </ScatterChart>
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