import { useState, useEffect, useRef, forwardRef } from "react";
import styles from "./styles/styles.module.css";
import Layout from "../Layout/Layout";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PostAddIcon from '@mui/icons-material/PostAdd';
import usePost from "../../Lib/Hooks/usePost";

const Publish = () => {
    
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
    

    const {handlePost: handlePostArticle, error: postArticleError, data: postArticleMessage} = usePost("api/v0/myarticles/");

    const IsMounted = useRef(false);

    useEffect(() => {
        if (IsMounted.current){
            handleOpenSnackBar()
        }
        IsMounted.current = true;
    // eslint-disable-next-line
    }, [postArticleError, postArticleMessage])
    
    const [story, setStory] = useState('ask');

    const [formData, setFormData] = useState({
        "type": story
    });

    function handleSelect(e){
        setStory(e?.target?.value);
        setFormData({
            ...formData,
            "type": e?.target?.value
        })
    };

    function handleSubmitArticle(e, data){
        e.preventDefault()
        handlePostArticle(data)
    }

    return ( 
        <Layout>
            <Typography sx={{fontWeight: "bold", textAlign: "center"}}>Publish your article below</Typography>
            <Paper 
                elevation={3}
                sx={{ 
                    width: "100%", 
                    margin: "auto",
                    maxWidth: "700px",
                }}>
                <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 }
                }}
                autoComplete="off"
                onSubmit={(e) => {
                    handleSubmitArticle(e, formData)
                }}>
                    <div className={styles.form}>
                        <div className={styles.row}>
                            <TextField
                            required
                            label="Title"
                            variant="filled"
                            placeholder="Add a title to your article"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    "title": e.target.value
                                })
                            }}
                            sx={{
                                width: "100%",
                            }}
                            />
                        </div>
                        <div className={styles.row}>
                            <TextField
                            label="Article"
                            variant="filled"
                            multiline
                            placeholder="Write your article"
                            rows={4}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    "text": e.target.value
                                })
                            }}
                            sx={{
                                width: "100%",
                            }}
                            />
                        </div>
                        <div className={styles.row}>
                            <TextField
                            label="url"
                            placeholder="Add a reference to your story."
                            sx={{
                                width: "100%",
                            }}
                            size="small"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    "url": e.target.value
                                })
                            }}
                            />
                            <div className={styles.flex}>
                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small">
                                    <Typography sx={{ minWidth: 100 }}>Story Type</Typography>
                                </InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={story}
                                    label="Set your story type"
                                    onChange={handleSelect}
                                >
                                    <MenuItem value="ask">Question</MenuItem>
                                    <MenuItem value="story">Article</MenuItem>
                                    <MenuItem value="job">Job Posting</MenuItem>
                                    <MenuItem value="show">Show a Rare Topic</MenuItem>
                                </Select>
                                </FormControl>
                                <Button 
                                variant="contained" 
                                type="submit"
                                size="large"
                                sx={{
                                    minWidth: 120,
                                    marginLeft: "auto"
                                }}
                                endIcon={<PostAddIcon />}>
                                    <Typography>Submit</Typography>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Paper>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={postArticleError ? "error" : "success"} sx={{ width: '100%' }}>
                {postArticleMessage?.message}
                </Alert>
            </Snackbar>
        </Layout>
     );
}
 
export default Publish;