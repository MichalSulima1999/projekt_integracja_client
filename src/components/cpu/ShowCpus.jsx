import React from "react";
import easySoapRequest from "easy-soap-request";
import { URL } from "../../api/soap";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { XMLParser } from "fast-xml-parser";
import CpuTable from "./CpuTable";
import CpuDatePlot from "./CpuDatePlot";

const ShowCpus = () => {
  const { auth } = useAuth();
  const [cpus, setCpus] = useState([]);
  const xml = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
                    xmlns:std="http://integracja.pl/soap">
        <soap:Body>
            <std:getAllCpusByDateRequest />
        </soap:Body>
    </soap:Envelope>
    `;
  useEffect(() => {
    getCpus();
  }, []);

  const getCpus = async () => {
    const { response } = await easySoapRequest({
      url: URL,
      headers: {
        "Content-Type": "text/xml",
        Authorization: `Bearer ${auth?.accessToken}`,
      },
      xml: xml,
    });
    //console.log(response.body);
    const parser = new XMLParser();
    let jObj = parser.parse(response.body);
    setCpus(
      jObj["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][
        "ns2:getAllCpusByDateResponse"
      ]["ns2:cpu"]
    );
  };

  return (
    <div>
      <CpuTable data={cpus} />
      <CpuDatePlot data={cpus} />
    </div>
  );
};

export default ShowCpus;
