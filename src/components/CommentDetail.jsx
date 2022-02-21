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
import { Button } from "@material-ui/core";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


const useStyles = makeStyles({
    root: {
      minWidth: 275,
      backgroundColor: "black",
      border: "1px solid gainsboro",
      marginTop: "6px",
      fontSize: "1.60rem"
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
    
    function handleChange (e) {
        setText(e.target.value)
    }

    function handleDelete() {
        fetch(`https://ink-gaming.herokuapp.com/comments/${id}`, {
            method: 'DELETE'
        })
        setEditComment(false)
        commentRemoved(id)
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`https://ink-gaming.herokuapp.com/comments/${id}`, {
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
                    <TextareaAutosize
                        name="comment" 
                        label="Comment"
                        value={text}
                        onChange={handleChange}
                        rowsMin={3}
                        placeholder="What are your thoughts..."
                        style={{    
                            height: "166px",
                            margin: "0px",
                            width: "432px",
                        }}
                        />
                        <br/>
                    <Button style={{borderRadius: "40px", background: "midnightblue", backgroundImage: "linear-gradient(to bottom, midnightblue, #2980b9)", color: "#ffffff"}} variant="contained" type="submit">Submit</Button>
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
