import { useState } from "react";
import { Form } from 'semantic-ui-react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}))

function CreatePost ({allPosts, setAllPosts, user, onClose}) {
    const classes = useStyles()
    const [formData, setFormData] = useState({
        title: "",
        link: "",
        media_type: "text",
        content: "", 
        user_id: user.id
    })
    const [errors, setErrors] = useState([])

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setFormData("")
       
        fetch(`https://ink-gaming.herokuapp.com/posts`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then (r => r.json())
        .then (newPost => {
            if(newPost.id) {
                setAllPosts([newPost, ...allPosts])
                setFormData({
                    title: "",
                    link: "",
                    media_type: "text",
                    content: "",
                    user_id: user.id,
                })
                setErrors([])
            } else {
                setErrors(newPost)
            }
        })
    }
    console.log(handleSubmit)

    const mediaTypeOptions = [
        { value: 'text', label: 'Text' },
        { value: 'video', label: 'Video' },
        { value: 'image', label: 'Image' }
    ]

    return (
        <div>
            {errors.length > 0 && <div>{errors.display}</div>}
        <Form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} >
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
                    onClick={onClose}>Post</Button>
        </Form>
        </div>
    );
}

export default CreatePost;
