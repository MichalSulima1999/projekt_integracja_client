import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ADD_CPU_URL = "/cpu";

const EditCpu = () => {
  const { cpuId } = useParams();

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  const [cores, setCores] = useState(0);
  const [validCores, setValidCores] = useState(false);

  const [threads, setThreads] = useState(0);
  const [validThreads, setValidThreads] = useState(false);

  const [launchDate, setLaunchDate] = useState(Date());
  const [validLaunchDate, setValidLaunchDate] = useState(false);

  const [lithography, setLitography] = useState(0);
  const [validLitography, setValidLitography] = useState(false);

  const [socket, setSocket] = useState("");
  const [validSocket, setValidSocket] = useState(false);

  const [baseFrequency, setBaseFrequency] = useState(0);
  const [validBaseFrequency, setValidBaseFrequency] = useState(false);

  const [turboFrequency, setTurboFrequency] = useState(0);
  const [validTurboFrequency, setValidTurboFrequency] = useState(false);

  const [tdp, setTdp] = useState(0);
  const [validTdp, setValidTdp] = useState(false);

  const [manufacturer, setManufacturer] = useState("0");
  const [validManufacturer, setValidManufacturer] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
    getCpu();
  }, []);

  useEffect(() => {
    setValidName(name.length > 0);
  }, [name]);

  useEffect(() => {
    setValidCores(cores > 0);
  }, [cores]);

  useEffect(() => {
    setValidThreads(threads > 0);
  }, [threads]);

  useEffect(() => {
    setValidBaseFrequency(baseFrequency > 0);
  }, [baseFrequency]);

  useEffect(() => {
    setValidLaunchDate(launchDate.length > 0);
  }, [launchDate]);

  useEffect(() => {
    setValidLitography(lithography > 0);
  }, [lithography]);

  useEffect(() => {
    setValidManufacturer(["Intel", "AMD"].includes(manufacturer));
  }, [manufacturer]);

  useEffect(() => {
    setValidSocket(socket.length > 0);
  }, [socket]);

  useEffect(() => {
    setValidTdp(tdp > 0);
  }, [tdp]);

  useEffect(() => {
    setValidTurboFrequency(turboFrequency > 0);
  }, [turboFrequency]);

  useEffect(() => {
    setErrMsg("");
  }, [name, cores, threads, launchDate, lithography, manufacturer, baseFrequency, turboFrequency, tdp, socket]);

  const getCpu = async () => {
      try {
          const res = await axiosPrivate.get(`/cpu/${cpuId}`);
          setBaseFrequency(res.data.baseFrequency);
          setCores(res.data.cores);
          setLaunchDate(new Date(res.data.launchDate).toISOString().slice(0, 10));
          setLitography(res.data.lithography);
          setManufacturer(res.data.manufacturer);
          setName(res.data.name);
          setSocket(res.data.socket);
          setTdp(res.data.tdp);
          setThreads(res.data.threads);
          setTurboFrequency(res.data.turboFrequency);
      } catch (err) {
          console.log(err);
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.patch(
        ADD_CPU_URL,
        JSON.stringify({id: cpuId, cores, threads, name, launchDate, lithography, baseFrequency, turboFrequency, tdp, socket, manufacturer })
      );
      navigate("/manageCpus");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg(err?.response.data);
      }
      console.log(err.response);
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Add Cpu</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
            <FontAwesomeIcon
              icon={faCheck}
              className={validName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validName || !name ? "hide" : "invalid"}
            />
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            ref={userRef}
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            aria-invalid={validName ? "false" : "true"}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cores" className="form-label">
            Cores:
            <FontAwesomeIcon
              icon={faCheck}
              className={validCores ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validCores || !cores ? "hide" : "invalid"}
            />
          </label>
          <input
            className="form-control"
            type="number"
            id="cores"
            onChange={(e) => setCores(e.target.value)}
            value={cores}
            required
            aria-invalid={validCores ? "false" : "true"}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="threads" className="form-label">
            Threads:
            <FontAwesomeIcon
              icon={faCheck}
              className={validThreads ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validThreads || !threads ? "hide" : "invalid"}
            />
          </label>
          <input
            className="form-control"
            type="number"
            id="threads"
            onChange={(e) => setThreads(e.target.value)}
            value={threads}
            required
            aria-invalid={validThreads ? "false" : "true"}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="launchDate" className="form-label">
            Launch date:
            <FontAwesomeIcon
              icon={faCheck}
              className={validLaunchDate ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validLaunchDate || !launchDate ? "hide" : "invalid"}
            />
          </label>
          <input
            className="form-control"
            type="date"
            id="launchDate"
            onChange={(e) => setLaunchDate(e.target.value)}
            value={launchDate}
            required
            aria-invalid={validLaunchDate ? "false" : "true"}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="litography" className="form-label">
            Litography:
            <FontAwesomeIcon
              icon={faCheck}
              className={validLitography ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validLitography || !lithography ? "hide" : "invalid"}
            />
          </label>
          <input
            className="form-control"
            type="number"
            id="litography"
            onChange={(e) => setLitography(e.target.value)}
            value={lithography}
            required
            aria-invalid={validLitography ? "false" : "true"}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="socket" className="form-label">
            Socket:
            <FontAwesomeIcon
              icon={faCheck}
              className={validSocket ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validSocket || !socket ? "hide" : "invalid"}
            />
          </label>
          <input
            className="form-control"
            type="text"
            id="socket"
            onChange={(e) => setSocket(e.target.value)}
            value={socket}
            required
            aria-invalid={validSocket ? "false" : "true"}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="baseFrequency" className="form-label">
            Base frequency:
            <FontAwesomeIcon
              icon={faCheck}
              className={validBaseFrequency ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validBaseFrequency || !baseFrequency ? "hide" : "invalid"}
            />
          </label>
          <input
            className="form-control"
            type="number"
            id="baseFrequency"
            onChange={(e) => setBaseFrequency(e.target.value)}
            value={baseFrequency}
            required
            aria-invalid={validBaseFrequency ? "false" : "true"}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="turboFrequency" className="form-label">
            Turbo frequency:
            <FontAwesomeIcon
              icon={faCheck}
              className={validTurboFrequency ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validTurboFrequency || !turboFrequency ? "hide" : "invalid"}
            />
          </label>
          <input
            className="form-control"
            type="number"
            id="turboFrequency"
            onChange={(e) => setTurboFrequency(e.target.value)}
            value={turboFrequency}
            required
            aria-invalid={validTurboFrequency ? "false" : "true"}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tdp" className="form-label">
            TDP:
            <FontAwesomeIcon
              icon={faCheck}
              className={validTdp ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validTdp || !tdp ? "hide" : "invalid"}
            />
          </label>
          <input
            className="form-control"
            type="number"
            id="tdp"
            onChange={(e) => setTdp(e.target.value)}
            value={tdp}
            required
            aria-invalid={validTdp ? "false" : "true"}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="manufacturer">Manufacturer:</label>
          <select
            className="form-control"
            id="manufacturer"
            onChange={(e) => setManufacturer(e.target.value)}
            value={manufacturer}
            required
            aria-invalid={validManufacturer ? "false" : "true"}
          >
            <option value="">Choose manufacturer</option>
            <option value="Intel">Intel</option>
            <option value="AMD">AMD</option>
          </select>
        </div>



        <button
          className="btn btn-primary"
          disabled={
            !validName || !validBaseFrequency || !validCores || !validLaunchDate || !validLitography || !validLitography || !validManufacturer || !validTdp || !validSocket || !validThreads || !validTurboFrequency ? true : false
          }
        >
          Add cpu
        </button>
      </form>
    </section>
  );
};

export default EditCpu;
