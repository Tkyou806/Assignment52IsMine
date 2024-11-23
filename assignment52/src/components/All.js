import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import List from "./page/List";
import Detail from "./page/Detail";
import Update from "./page/Update";
import Create from "./page/Create";

const All = () => {
    return (
        <div>
            <h1 className="mt-3 div_title">AJAX CRUD</h1>
            <p>You can show the list, view details, update, and delete data!</p>

            <Routes>
                <Route path="/" element={<Navigate to="/list" />} />
                <Route path="/list" element={<List />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/update" element={<Update />} /> {/* id를 받는 경로가 필요해 */}
                <Route path="/create" element={<Create />} />
            </Routes>
        </div>
    );
};

export default All;
