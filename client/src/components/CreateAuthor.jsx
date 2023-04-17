import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CreateAuthor = () => {
    //keep track of what is being typed via useState hook
    const [authorName, setAuthorName] = useState("");
    const navigate = useNavigate();

    //handler when the form is submitted
    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new person
        axios.post('http://localhost:8000/api/author', {
            //key and val not same
            name: authorName
        })
            .then(res => {
                console.log(res.data);
                navigate('/');
            })
            .catch(err => console.log(err))
    }
    //onChange to update state from form inputs
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Favorite Authors</h1>
            <Link to={'/'}>Home</Link>
            <br />
            Add a new author:
            <form onSubmit={onSubmitHandler}>
                <p>
                    <label>Author Name</label><br />
                    <input type="text" onChange={e => setAuthorName(e.target.value)} value={authorName} />
                </p>
                <div style={{display: 'flex', justifyContent: 'center', gap: '0.5rem'}}>
                    <Link to={'/'}><button>Cancel</button></Link>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAuthor;