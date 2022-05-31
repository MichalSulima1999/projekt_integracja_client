import React from "react";
import { useEffect, useState } from "react";
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

const CpuDatePlot = ({ data }) => {
  const [cpus, setCpus] = useState(data);
  const [dataKey, setDataKey] = useState("ns2:cores");
  const [dataKeyFilterMore, setDataKeyFilterMore] = useState(0);
  const [dataKeyFilterLess, setDataKeyFilterLess] = useState(64);
  const [dataKeyFilterMoreEnabled, setDataKeyFilterMoreEnabled] =
    useState(false);
  const [dataKeyFilterLessEnabled, setDataKeyFilterLessEnabled] =
    useState(false);

  useEffect(() => {
    let filtered = data;
    if (dataKeyFilterLessEnabled) {
      filtered = filtered.filter((e) => e[dataKey] <= dataKeyFilterLess);
    }
    if (dataKeyFilterMoreEnabled) {
      filtered = filtered.filter((e) => e[dataKey] >= dataKeyFilterMore);
    }
    setCpus(filtered);
  }, [
    dataKey,
    dataKeyFilterMore,
    dataKeyFilterLess,
    data,
    dataKeyFilterLessEnabled,
    dataKeyFilterMoreEnabled,
  ]);

  return (
    <div className="mb-3">
      <h1>Cpu chart</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={cpus}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="ns2:launch_date" />
          <YAxis />
          <Legend />
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
                  Name:{" "}
                  {props.payload &&
                    props.payload[0] != null &&
                    props.payload[0].payload["ns2:name"]}
                </p>
                <p
                  style={{
                    margin: "0 0",
                    padding: "3px 7.5px",
                    backgroundColor: "white",
                  }}
                >
                  Core count:{" "}
                  {props.payload &&
                    props.payload[0] != null &&
                    props.payload[0].payload["ns2:cores"]}
                </p>
                <p
                  style={{
                    margin: "0 0",
                    padding: "3px 7.5px",
                    backgroundColor: "white",
                  }}
                >
                  Thread count:{" "}
                  {props.payload &&
                    props.payload[0] != null &&
                    props.payload[0].payload["ns2:threads"]}
                </p>
                <p
                  style={{
                    margin: "0 0",
                    padding: "3px 7.5px",
                    backgroundColor: "white",
                  }}
                >
                  Base frequency:{" "}
                  {props.payload &&
                    props.payload[0] != null &&
                    props.payload[0].payload["ns2:base_frequency"]}
                </p>
                <p
                  style={{
                    margin: "0 0",
                    padding: "3px 7.5px",
                    backgroundColor: "white",
                  }}
                >
                  Turbo frequency:{" "}
                  {props.payload &&
                    props.payload[0] != null &&
                    props.payload[0].payload["ns2:turbo_frequency"]}
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
                    props.payload[0].payload["ns2:launch_date"]}
                </p>
                <p
                  style={{
                    margin: "0 0",
                    padding: "3px 7.5px",
                    backgroundColor: "white",
                    color:
                      props.payload &&
                      props.payload[0] != null &&
                      props.payload[0].payload["ns2:manufacturer"] === "Intel"
                        ? "blue"
                        : "red",
                  }}
                >
                  Manufacturer:{" "}
                  {props.payload &&
                    props.payload[0] != null &&
                    props.payload[0].payload["ns2:manufacturer"]}
                </p>
              </div>
            )}
          />
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
          <option value="ns2:cores">Core count</option>
          <option value="ns2:threads">Thread count</option>
          <option value="ns2:lithography">Litography</option>
          <option value="ns2:base_frequency">Base frequency</option>
          <option value="ns2:turbo_frequency">Turbo frequency</option>
          <option value="ns2:tdp">TDP</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="dataKeyFilterMore" className="form-label">
          Keys higher than or equal
        </label>
        <div className="input-group">
          <input
            type="checkbox"
            className="form-check-input me-3"
            checked={dataKeyFilterMoreEnabled}
            onChange={(e) => setDataKeyFilterMoreEnabled(e.target.checked)}
          />
          <input
            id="dataKeyFilterMore"
            className="form-control"
            min={0}
            type="number"
            value={dataKeyFilterMore}
            disabled={!dataKeyFilterMoreEnabled}
            onChange={(e) => setDataKeyFilterMore(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="dataKeyFilter" className="form-label">
          Keys less than or equal
        </label>
        <div className="input-group mb-3">
          <input
            type="checkbox"
            className="form-check-input me-3"
            checked={dataKeyFilterLessEnabled}
            onChange={(e) => setDataKeyFilterLessEnabled(e.target.checked)}
          />
          <input
            id="dataKeyFilterLess"
            className="form-control"
            min={0}
            type="number"
            value={dataKeyFilterLess}
            disabled={!dataKeyFilterLessEnabled}
            onChange={(e) => setDataKeyFilterLess(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CpuDatePlot;
