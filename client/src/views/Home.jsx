/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';

export default () => {
    const [allAuthors, setAllAuthors] = useState([]);
    const baseUrl = 'http://localhost:8000/api';
    const navigate = useNavigate();
    //grab all authors on render
    useEffect(() => {
        axios.get(`${baseUrl}/authors`)
            .then((res) => setAllAuthors(res.data))
            .catch((err) => console.log(err))
    }, []);
    //rerender via filter after a delete
    const filterAuthors = authorId => {
        setAllAuthors(allAuthors.filter(author => authorId !== author._id));
    }

    //handle deleting an author
    const handleDeleteOneAuthor = authorId => {
        axios.delete(`${baseUrl}/author/${authorId}`)
            .then(res => {
                filterAuthors(authorId);
                navigate('/')
            })
            .catch(err => console.log(err));
    }
    return (
        <div>
            <h1>Favorite Authors</h1>
            <Link to={'/new'}>Add an Author</Link>
            <h3>We have quotes by:</h3>
            <table style={{margin: '0 auto', border: '1px solid black'}}>
                <thead>
                    <tr>
                        <th style={{borderBottom: '1px solid black'}} >Author</th>
                        <th  style={{borderBottom: '1px solid black'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allAuthors.map((author) => {
                        return (
                            <tr style={{border: '1px solid black'}} key={author._id}>
                                <td style={{borderBottom: '1px solid black'}}>{author.name}</td>
                                <td style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', borderBottom: '1px solid black' }}>
                                    <Link to={`/edit/${author._id}`}>
                                        <button>Edit</button>
                                    </Link>
                                    <button onClick={e => handleDeleteOneAuthor(author._id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}