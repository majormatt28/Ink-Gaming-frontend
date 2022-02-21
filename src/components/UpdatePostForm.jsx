import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { Form } from 'semantic-ui-react'
import { Card, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    paper: {
        border: "3px solid #000;",
        padding: "16px 32px 24px;",
        boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);",
        backgroundColor: "midnightblue;",
        width: "32rem;",
        position: "relative;",
        right: "-64rem;",
        top: "16rem;"
    },
}))

function UpdatePostForm ({user, allPosts, setAllPosts}) {
    const classes = useStyles()
    const history = useHistory()
    const { id } = useParams()
    
    const [formData, setFormData] = useState({
        title: "",
        link: "",
        media_type: "null",
        content: "",
        user_id: user.id
    })

    useEffect(() => {
        fetch(`https://obscure-caverns-42124.herokuapp.com/posts/${id}`)
        .then(resp => resp.json())
        .then(data => {
            setFormData(data)
        })
    }, [id])

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function updateAllPosts(id, updatedPost) {
        const index = allPosts.find(post => post.id === id)
        const updatedPosts = [...allPosts]
        updatedPosts.splice(index, 1, updatedPost)
        setAllPosts(updatedPosts)
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`https://obscure-caverns-42124.herokuapp.com/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(postUpdate => {
            updateAllPosts(id,postUpdate)
            history.push("/posts")
        })
    }

    const mediaTypeOptions = [
        { value: 'text', label: 'Text' },
        { value: 'video', label: 'Video' },
        { value: 'image', label: 'Image' }
    ]

    return (
        <div> 
            <Paper className={classes.paper}>
        <Form 
        className={classes.root} 
        noValidate autoComplete="off" 
        onSubmit={handleSubmit} 
        >
            <Card>
                <div>
                    <TextField id="outlined-basic"
                        label="title"
                        placeholder='title'
                        type="text"
                        name='title'
                        value={formData.title}
                        onChange={handleChange} >
                    </TextField>
                    <TextField id="outlined-basic"
                        label="link"
                        placeholder='link'
                        type="text"
                        name='link'
                        value={formData.link}
                        onChange={handleChange}>
                    </TextField>
                </div>
            <TextField
                    id="outlined-basic"
                    label= "Media Type"
                    select
                    value={formData.media_type}
                    onChange={handleChange}
                    SelectProps={{ native: true, }}
                    helperText="Please select media type."
                    variant="outlined"
                    name="media_type"
                    >
                    {mediaTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                     ))}
            </TextField>
            <TextField 
                id="outlined-basic"
                label="Description"
                placeholder="Add description here"
                type="text"
                name='content'
                value={formData.content}
                onChange={handleChange} >
            </TextField>
            <br/>
            <Button
             size="small"
             variant="contained"
             type='submit'
            >
            Update Post</Button>
            </Card>
        </Form>
            </Paper>
        </div>
    );
}

export default UpdatePostForm;
