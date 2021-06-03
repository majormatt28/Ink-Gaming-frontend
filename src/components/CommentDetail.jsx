import { useState } from "react";
// import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import { purple } from '@material-ui/core/colors';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      backgroundColor: "black",
      border: "1px solid gainsboro",
      marginTop: "6px",
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },   
    avatar: {
        backgroundColor: purple[500],
      }, 
});

function CommentDetail ({comment, user, commentUserId, commentUser, commentRemoved, id}) {
    const [text, setText] = useState(comment)
    const [editComment, setEditComment] = useState(false)
    const classes = useStyles();
    
    // const token = localStorage.getItem("token")
    // console.log("username", commentUser)

    function handleChange (e) {
        setText(e.target.value)
    }

    function handleDelete() {
        fetch(`http://localhost:3001/comments/${id}`, {
            method: 'DELETE'
        })
        setEditComment(false)
        commentRemoved(id)
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:3001/comments/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({comment: text})
        })
        setEditComment(false)
    }

    function handleClick() {
        setEditComment(true)
    }

    console.log(handleClick)

    return (

        <Card className={classes.root} variant="outlined">
            <CardContent>
            <Typography className={classes.title} color="textPrimary" gutterBottom> 
            <Avatar aria-label="recipe" className={classes.avatar}>
            {commentUser.username.substring(0,2).toUpperCase()}
          </Avatar>
            </Typography>
            <Typography variant="body2" component="p">
            {!editComment ? (
                <p>{text}</p>

            ) : (
                <form onSubmit={handleSubmit}>
                    <textarea name="comment" value= {text} onChange={handleChange}></textarea>
                    <input type="submit"/>
                </form>
            )}
            </Typography>
            </CardContent>
            <CardActions>
                {commentUserId === user.id ? (
                    <>
                    <EditIcon onClick ={handleClick} size="small" color="primary"/>
                    <DeleteIcon onClick ={handleDelete} size="small" color="primary"/>
                    </>
                ): null}
            </CardActions>
        </Card>
    );
}

export default CommentDetail;