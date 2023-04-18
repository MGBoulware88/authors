import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../views/Home';
import CreateAuthor from '../views/CreateAuthor';
import UpdateAuthor from '../views/UpdateAuthor';

export default function App() {
    return (
        <Routes>
            <Route path="/authors/new" element={<CreateAuthor />} />
            <Route path="/authors/:id/edit" element={<UpdateAuthor />} />
            <Route path="/" element={<Home />} />
        </Routes>
    )
}