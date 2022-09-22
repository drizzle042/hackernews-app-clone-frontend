import { useState, forwardRef, useEffect, useRef } from "react";
import styles from "./styles/styles.module.css";
import Layout from "../Layout/Layout";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import usePost from "../../Lib/Hooks/usePost";

const Signin = () => {
    
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

    const [showPassword, setShowPassword] = useState(false);
    function handleClickShowPassword(){
        setShowPassword(!showPassword)
    }
    function handleMouseDownPassword(e){
        e?.preventDefault()
    }

    const [signUp, setSignUp] = useState(true);
    function handleSetSignMode(){
        setSignUp(!signUp)
    }

    const {handleAuth: handleSignUp, error: signUpError, data: signUpMessage} = usePost("api/v0/account/");
    const {handleAuth: handleSignIn, error: signInError, data: signInMessage} = usePost("api/v0/signin/");

    const signInIsMounted = useRef(false);
    const signUpIsMounted = useRef(false);

    useEffect(() => {
        if (signInIsMounted.current){
            handleOpenSnackBar()
        }
        signInIsMounted.current = true;
    // eslint-disable-next-line
    }, [signInError, signInMessage])
    
    useEffect(() => {
        if (signUpIsMounted.current){
            handleOpenSnackBar()
        }
        signUpIsMounted.current = true;
    // eslint-disable-next-line
    }, [signUpError, signUpMessage])

    const [formData, setFormData] = useState({});

    function handleSubmitSignUp(e, data){
        e.preventDefault()
        handleSignUp(data)
    }
    
    function handleSubmitSignIn(e, data){
        e.preventDefault()
        handleSignIn(data)
    }

    return ( 
        <Layout>
        {signUp ? 
            <div>
                <Typography sx={{
                    textAlign: "center",
                    fontWeight: "bold"
                }}>
                    Already have an account? 
                    <Button 
                    variant="text"
                    onClick={handleSetSignMode}
                    sx={{
                        fontWeight: "bold", 
                        textTransform: "none"
                    }}>
                        Signin 
                    </Button>
                </Typography>
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
                        handleSubmitSignUp(e, formData)
                    }}>
                        <div className={styles.form}>
                            <div className={styles.row}>
                                <TextField
                                required
                                label="First Name"
                                variant="outlined"
                                placeholder="Your First Name"
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        "firstName": e.target.value
                                    })
                                }}
                                sx={{
                                    width: "100%",
                                }}
                                />
                                <TextField
                                required
                                label="Last Name"
                                variant="outlined"
                                multiline
                                placeholder="Last Name Here"
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        "lastName": e.target.value
                                    })
                                }}
                                sx={{
                                    width: "100%",
                                }}
                                />
                            </div>
                            <div className={styles.row}>
                                <TextField
                                required
                                label="Email"
                                type={"email"}
                                variant="outlined"
                                placeholder="A unique email not used here before"
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        "email": e.target.value
                                    })
                                }}
                                sx={{
                                    width: "100%",
                                }}
                                />
                            </div>
                            <div className={styles.row}>
                                <TextField
                                required
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                placeholder="Password"
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        "password": e.target.value
                                    })
                                }}
                                sx={{
                                    width: "100%",
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                        )
                                }}
                                />
                                <Button 
                                variant="contained" 
                                type="submit"
                                size="large"
                                sx={{
                                    minWidth: 120,
                                    margin: "auto"
                                }}
                                endIcon={<LoginIcon />}>
                                    <Typography>Signup</Typography>
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Paper>
                <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={signUpError ? "error" : "success"} sx={{ width: '100%' }}>
                    {signUpMessage?.message}
                    </Alert>
                </Snackbar>
            </div> :
            <div>
                <Typography sx={{
                    textAlign: "center",
                    fontWeight: "bold"
                }}> Are you new? 
                    <Button 
                    variant="text"
                    onClick={handleSetSignMode}
                    sx={{
                        fontWeight: "bold", 
                        textTransform: "none"
                    }}>
                        Sign Up
                    </Button>
                </Typography>
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
                        handleSubmitSignIn(e, formData)
                    }}>
                        <div className={styles.form}>
                            <div className={styles.row}>
                                <TextField
                                required
                                label="Email"
                                type={"email"}
                                variant="outlined"
                                placeholder="The email you signed up with"
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        "email": e.target.value
                                    })
                                }}
                                sx={{
                                    width: "100%",
                                }}
                                />
                            </div>
                            <div className={styles.row}>
                                <TextField
                                required
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                placeholder="Password"
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        "password": e.target.value
                                    })
                                }}
                                sx={{
                                    width: "100%",
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                        )
                                }}
                                />
                                <Button 
                                variant="contained" 
                                type="submit"
                                size="large"
                                sx={{
                                    minWidth: 120,
                                    margin: "auto"
                                }}
                                endIcon={<LoginIcon />}>
                                    <Typography>Signin</Typography>
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Paper>
                <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={signInError ? "error" : "success"} sx={{ width: '100%' }}>
                    {signInMessage?.message}
                    </Alert>
                </Snackbar>
            </div>
        }
        </Layout>
     );
}
 
export default Signin;