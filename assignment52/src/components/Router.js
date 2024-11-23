import React from "react";
import { Routes, Route } from "react-router-dom";

import List from "./page/List.js";
import Create from "./page/Create.js";
import Detail from "./page/Detail.js";
import Update from "./page/Update.js";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/list" element={<List />} />
      <Route path="/create" element={<Create />} />
      <Route path="/detail/:id" element={<Detail />} /> {/* 여기 id까지 적어야지 */}
      <Route path="/update/:id" element={<Update />} /> {/* 여기 id까지 적어야지 */}
    </Routes>
  );
}
