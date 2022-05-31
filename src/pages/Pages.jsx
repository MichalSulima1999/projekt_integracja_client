import React from "react";
import Home from "./Home";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import RequireAuth from "../components/RequireAuth";
import PersistLogin from "../components/PersistLogin";
import Login from "../components/Login";
import Register from "../components/Register";
import LogoutPage from "../components/LogoutPage";
import ShowUsers from "../components/admin/ShowUsers";
import ShowCpus from "../components/cpu/ShowCpus";
import Unauthorized from "../components/Unauthorized";
import AddCpu from "../components/cpu/AddCpu";
import ManageCpus from "../components/cpu/ManageCpus";
import EditCpu from "../components/cpu/EditCpu";
import ComparePlots from "../components/cpu/ComparePlots";

function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route element={<PersistLogin />}>
          {/* protected */}
          <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]}/>}>
            <Route path="/admin/add_user" element={<Register />} />
            <Route path="/admin/show_users" element={<ShowUsers />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["ROLE_MANAGER"]}/>}>
          <Route path="/manageCpus" element={<ManageCpus />} />
            <Route path="/addCpu" element={<AddCpu />} />
            <Route path="/editCpu/:cpuId" element={<EditCpu />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["ROLE_USER"]}/>}>
            <Route path="/showCpus" element={<ShowCpus />} />
            <Route path="/showCpuChart" element={<ComparePlots />} />
          </Route>


          <Route path="/" element={<Home />} />
        </Route>
        {/* public */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;
