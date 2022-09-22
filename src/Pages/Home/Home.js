import { useEffect, useState } from "react";
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PreviewIcon from '@mui/icons-material/Preview';
import useFetch from "../../Lib/Hooks/useFetch";
import Search from "./components/Search";
import FetchError from "../../Lib/Hooks/FetchError";


const Home = () => {

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


    // Requests
    const {data, handleSearchInput, isLoading, error, paginator} = useFetch(`api/v0/articles?&limit=10`);
    
    const [page, setPage] = useState(1);

    const handleChangePage = (e, value) => {
      setPage(value)
    }

    useEffect(() => {
      paginator(page)
    // eslint-disable-next-line
    }, [page])

    return ( 
        <Layout>
          <Search handleSearchInput={handleSearchInput} buttonText={"My Posts"} link={"/myarticles"} />
          {isLoading && <Skeleton variant="rounded" sx={{maxWidth: "500px", margin: "auto"}} height={300} />}
          {error && <FetchError error={error} />}
          {data?.data?.map((story, index) => {
            return (
              <Card 
                sx={{margin: "auto", marginTop: "1rem", borderRadius: "10px", maxWidth: "500px"}} 
                key={index}>
                <CardHeader
                    avatar={
                    <Avatar {...stringAvatar(story?.fields?.by)} />
                    }
                    title={story?.fields?.by}
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
          <div className={styles.pagination}>
              <Pagination count={data?.totalPages} page={page} shape="rounded" onChange={handleChangePage} />
          </div>
        </Layout>
     );
}
 
export default Home;