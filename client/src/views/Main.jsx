/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import CreateAuthor from '../components/CreateAuthor';
import UpdateAuthor from '../components/UpdateAuthor';
// import AuthorDetails from '../components/AuthorDetails';
// import UpdateAuthor from '../components/UpdateAuthor';
export default () => {
    return (
        <div>
            <Routes>
                <Route path="/new" element={<CreateAuthor />} />
                <Route path="/edit/:id" element={<UpdateAuthor />} />
                <Route path="*" element={
                    <div>
                        <Home />
                    </div>
                    
                } />
            </Routes>
        </div>
    )
}