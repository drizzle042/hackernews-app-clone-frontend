import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles/styles.module.css";
import Tooltip from '@mui/material/Tooltip';
import Layout from "../Layout/Layout";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PreviewIcon from '@mui/icons-material/Preview';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Typography from '@mui/material/Typography';
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
    
    const { id } = useParams();
    const navigate = useNavigate()

    // Requests
    const {data, isLoading, error} = useFetch(`api/v0/comments?commentid=${id}`);
    const parent = !data?.data?.parent[0]?.deleted ? data?.data?.parent[0] : null
    const allComments = data?.data?.comments;
    const comments = allComments?.filter((i) => !i?.dead && !i?.deleted);
    const filteredComments = allComments?.length - comments?.length


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
                {parent && parent?.fields ? 
                <Card 
                sx={{margin: "auto", marginTop: "1rem", borderRadius: "10px", maxWidth: "500px"}}>
                    <CardHeader
                        avatar={
                        <Avatar {...stringAvatar(parent?.fields?.by)} />
                        }
                        title={parent?.fields?.by}
                        subheader={new Date(parent?.fields?.time)?.toDateString()}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: parent?.fields?.title}} />
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton><FavoriteIcon  sx={{color: "crimson"}}/> <Typography>{parent?.fields?.score}</Typography></IconButton>
                        <IconButton><CommentIcon /> <Typography>{comments?.length}</Typography></IconButton>
                    </CardActions>
                    {parent?.fields?.text && 
                    <Accordion>
                    <AccordionSummary
                        expandIcon={parent?.fields?.text && <Tooltip title="See more"><ExpandMoreIcon /></Tooltip>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"><Tooltip title="See the full post"><Typography sx={{display: "flex"}}>Full Post <span style={{display: "flex", alignItems: "baseline", paddingLeft: "0.4rem"}}><PreviewIcon/></span></Typography></Tooltip></AccordionSummary>
                    <AccordionDetails>
                        <Typography paragraph dangerouslySetInnerHTML={{ __html: parent?.fields?.text}} />
                    </AccordionDetails>
                    </Accordion>}
                </Card> :
                parent ?
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
                        <IconButton><FavoriteIcon  sx={{color: "crimson"}}/> <Typography>{parent?.score}</Typography></IconButton>
                        <IconButton><CommentIcon /> <Typography>{comments?.length}</Typography></IconButton>
                    </CardActions>
                </Card> :
                <Typography sx={{textAlign: "center"}}>This post has been deleted.</Typography>}
                {parent &&
                <div className={styles.addComment}>
                    <Typography sx={{textAlign: "center"}}>Comments {comments?.length}</Typography>
                    <Typography>Filtered comments {filteredComments}</Typography>
                    <Typography>While the rest were deleted.</Typography>
                </div>}
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