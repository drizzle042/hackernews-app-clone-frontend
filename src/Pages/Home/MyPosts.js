import { useEffect, useState, forwardRef, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import styles from "./styles/styles.module.css";
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Pagination from "@mui/material/Pagination"
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PreviewIcon from '@mui/icons-material/Preview';
import useFetch from "../../Lib/Hooks/useFetch";
import Search from "./components/Search";
import FetchError from "../../Lib/Hooks/FetchError";
import usePost from "../../Lib/Hooks/usePost";


const MyPosts = () => {

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
  
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleOpenSnackBar = () => {
        if (openSnackBar){
            return;
        }
        setOpenSnackBar(true);
    };

    const handleClose = () => {
        setOpenSnackBar(false);
    };

    // Requests
    const {data, handleSearchInput, isLoading, error, paginator, normalFetch} = useFetch(`api/v0/myarticles?limit=10`);

    const [page, setPage] = useState(1);
    const handleChangePage = (e, value) => {
      setPage(value);
    }

    // eslint-disable-next-line
    useEffect(() => paginator(page), [page])

    const {handleDelete, error: deleteMessageError, data: deleteMessage} = usePost(`api/v0/myarticles/`);
    
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current){
            handleOpenSnackBar()
            normalFetch(`api/v0/myarticles/`);
        }
        isMounted.current = true;
    // eslint-disable-next-line
    }, [deleteMessageError, deleteMessage])


    return ( 
        <Layout>
          <Search handleSearchInput={handleSearchInput} buttonText={"All Posts"} link={"/"} />
          {isLoading && <Skeleton variant="rounded" sx={{maxWidth: "500px", margin: "auto"}} height={300} />}
          {error && <FetchError error={error} />}
          {data?.data?.map((story, index) => {
            return (
              <Card 
                sx={{margin: "auto", marginTop: "1rem", borderRadius: "10px", maxWidth: "500px"}} 
                key={index}>
                <CardHeader
                    avatar={
                    <Avatar {...stringAvatar("me")} />
                    }
                    title={`By me (${story?.fields?.by})`}
                    subheader={new Date(story?.fields?.time)?.toDateString()}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">{story?.fields?.title}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Tooltip title="Love">
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon sx={{color: "crimson"}}/>
                    </IconButton></Tooltip> <Typography>{story?.fields?.score}</Typography>
                    <Tooltip title="View comments">
                    <IconButton aria-label="comment">
                      <Link to={`/article/${story?.pk}`} style={{display: "flex", alignItems: "baseline"}}>
                            <CommentIcon />
                      </Link>
                    </IconButton></Tooltip> <Typography>{story?.fields?.kids?.length}</Typography>
                    <IconButton 
                    aria-label="delete forever"
                    onClick={() => {
                      handleDelete(story?.pk)
                    }}>
                        <DeleteForeverIcon />
                    </IconButton>
                </CardActions>
              { story?.fields?.text && 
                <Accordion>
                  <AccordionSummary
                    expandIcon={story?.fields?.text && <Tooltip title="See more"><ExpandMoreIcon /></Tooltip>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"><Tooltip title="See the full post"><Typography sx={{display: "flex"}}>Full Post <span style={{display: "flex", alignItems: "baseline", paddingLeft: "0.4rem"}}><PreviewIcon/></span></Typography></Tooltip></AccordionSummary>
                  <AccordionDetails>
                    <Typography paragraph dangerouslySetInnerHTML={{ __html: story?.fields?.text}} />
                  </AccordionDetails>
                </Accordion>}
              </Card>
          )})}
          <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={deleteMessageError ? "error" : "success"} sx={{ width: '100%' }}>
              {deleteMessage?.message}
              </Alert>
          </Snackbar>
          <div className={styles.pagination}>
              <Pagination count={data?.totalPages} shape="rounded" page={page} onChange={handleChangePage} />
          </div>
        </Layout>
     );
}
 
export default MyPosts;