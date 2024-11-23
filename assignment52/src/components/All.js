import React from "react";
import Router from './Router'; // 경로 확인

const All = () => {
    return (
        <div>
            <h1 className="mt-3 div_title">AJAX CRUD</h1>
            <p>You can show the list, view details, update, and delete data!</p>
            <Router />
        </div>
    );
};

export default All;
