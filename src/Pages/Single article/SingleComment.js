import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles/styles.module.css";
import Tooltip from '@mui/material/Tooltip';
import Layout from "../Layout/Layout";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Typography from '@mui/material/Typography';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CommentIcon from '@mui/icons-material/Comment';
import useFetch from "../../Lib/Hooks/useFetch";
import FetchError from "../../Lib/Hooks/FetchError";

const SingleComment = () => {
    
    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
    }
      
    function stringAvatar(name) {
    if (name){
        if (name.split(" ").length >= 2){
            let shortname = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
            return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${shortname}`,
            };
        } else{
            let shortname = `${name[0]}${name[1]}`  
            return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${shortname}`,
            };      
        }
        }else{
            let shortname = "UN"
            return {
                sx: {
                    bgcolor: stringToColor("UNKNOWN"),
                },
                children: `${shortname}`,
                };
            }
    }

    const [displayCommentField, setDisplayCommentField] = useState(false);
    function handleDisplay(){
        setDisplayCommentField(!displayCommentField)
    };
    
    const { id } = useParams();
    const navigate = useNavigate()

    // Requests
    const {data, isLoading, error} = useFetch(`api/v0/comments?commentid=${id}`)
    const parent = data?.data?.parent
    const comments = data?.data?.comments?.filter((i) => !i?.dead && !i?.deleted);


    return ( 
        <Layout>
        {isLoading && <Skeleton variant="rounded" sx={{maxWidth: "500px", margin: "auto"}} height={300} />}
        {error && <FetchError error={error} />}
        {data &&
            <div style={{marginBottom: "1rem"}}>
                <div style={{margin: "auto", maxWidth: "500px"}}>
                    <IconButton 
                    onClick={()=>{
                        navigate(-1, { replace: false })
                    }}
                    sx={{backgroundColor: "#E0E0E0"}}>
                        <KeyboardBackspaceIcon />
                    </IconButton>
                </div>
                <Card 
                sx={{margin: "auto", marginTop: "1rem", borderRadius: "10px", maxWidth: "500px"}} 
                >
                <CardHeader
                    avatar={
                    <Avatar {...stringAvatar(parent?.by)} />
                    }
                    title={parent?.by}
                    subheader={new Date(parent?.time * 1000)?.toDateString()}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: parent?.text}} />
                </CardContent>
                <CardActions disableSpacing>
                    <Tooltip title="Add comment">
                    <IconButton aria-label="comment"
                    onClick={handleDisplay}>
                        <CommentIcon />
                    </IconButton></Tooltip> <Typography>{comments?.length}</Typography>
                </CardActions>
                </Card>
                <div className={styles.addComment}>
                    <Typography sx={{textAlign: "center"}}>Comments {comments?.length}</Typography>
                    <Tooltip title="Add comment">
                        <IconButton
                        onClick={handleDisplay}>
                            <AddCommentIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                    maxWidth: "500px",
                    display: displayCommentField ? "flex" : "none",
                    margin: "auto",
                }}
                autoComplete="off"
                >
                    <TextField
                    required
                    id="outlined-multiline-static"
                    label="Comment"
                    variant="filled"
                    multiline
                    placeholder="Post a comment"
                    sx={{
                        width: "100%",
                    }}
                    />
                </Box>
            {comments.map((i, index) => (
                <Card 
                sx={{margin: "auto", marginTop: "1rem", borderRadius: "10px", maxWidth: "500px"}} 
                key={index}>
                <CardHeader
                    avatar={
                    <Avatar {...stringAvatar(i?.by)} />
                    }
                    title={i?.by}
                    subheader={new Date(i?.time * 1000)?.toDateString()}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: i?.text}} />
                </CardContent>
                <CardActions disableSpacing>
                    <Tooltip title="View comments">
                    <IconButton aria-label="comment">
                        <Link to={`/comment/${i?.id}`} style={{display: "flex", alignItems: "baseline"}}>
                            <CommentIcon />
                        </Link>
                    </IconButton></Tooltip> <Typography>{i?.kids?.length}</Typography>
                </CardActions>
                </Card>
            ))}
            </div>}
        </Layout>
     );
}
 
export default SingleComment;