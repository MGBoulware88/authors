import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateAuthor = () => {
    //keep track of what is being typed via useState hook
    const [authorName, setAuthorName] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();

    //get the author to load state
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/author/${id}`)
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
        axios.put(`http://localhost:8000/api/author/${id}`, {
            //key and val not same
            name: authorName
        })
            .then(res => {
                console.log(res.data);
                navigate('/');
            })
            .catch(error => {
                //get the errors from the response
                const errorResponse = error.response.data.errors;
                console.log(errorResponse);
                //create an empty arr to push the errors
                const errorArr = [];
                //loop through the errors to get the error msgs
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message);
                }
                //finally, update state with setErrors
                setErrors(errorArr);
            })
    }
    //onChange to update state from form inputs
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Favorite Authors</h1>
            <Link to={'/'}>Home</Link>
            <br />
            Edit author:
            <form onSubmit={onSubmitHandler}>
                {/* display validation errors inside the form */}
                {errors.map((err, idx) => <p key={idx}>{err}</p>)}
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

export default UpdateAuthor;