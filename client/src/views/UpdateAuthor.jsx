import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateAuthor = () => {
    //keep track of what is being typed via useState hook
    const [authorName, setAuthorName] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const baseUrl = 'http://localhost:8000/api';

    //get the author to load state
    useEffect(() => {
        axios
            .get(`${baseUrl}/author/${id}`)
            .then((res) => {
                console.log(res.data);
                setAuthorName(res.data.name);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    //handler when the form is submitted
    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to create a new person
        axios.put(`${baseUrl}/author/${id}`, {
            //key and val not same
            name: authorName
        })
            .then(res => {
                console.log(res.data);
                navigate('/');
            })
            .catch(err => {
                //get the errors from the response
                const errResponse = err.response.data.error.errors;
                console.log(errResponse);
                //create an empty arr to push the errors
                const errorArr = [];
                //loop through the errors to get the error msgs
                for (const key of Object.keys(errResponse)) {
                    errorArr.push(errResponse[key].message);
                }
                //finally, update state with setErrors
                // console.log(errorArr);
                setErrors(errorArr);
            });
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Favorite Authors</h1>
            <Link to={'/'}>Home</Link>
            <br />
            Edit author:
            <form onSubmit={onSubmitHandler}>
                {/* display validation errors inside the form */}
                {errors.map((err, idx) => <p style={{ color: 'red' }} key={idx}>{err}</p>)}
                <p>
                    <label>Author Name</label><br />
                    <input type="text" onChange={e => setAuthorName(e.target.value)} value={authorName} />
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <Link to={'/'}><button>Cancel</button></Link>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateAuthor;