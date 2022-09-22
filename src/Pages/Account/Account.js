import { useState, useEffect, useRef, forwardRef } from "react";
import Layout from "../Layout/Layout";
import styles from "./styles/styles.module.css"
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from "@mui/material/Typography";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import usePost from "../../Lib/Hooks/usePost";

const Account = () => {
    
    const [showPassword, setShowPassword] = useState(false);
    function handleClickShowPassword(){
        setShowPassword(!showPassword)
    }
    
    function handleMouseDownPassword(e){
        e?.preventDefault()
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

    const {handlePut: handleUpdateAccount, error: updateAccountError, data: updateAccountMessage} = usePost("api/v0/account/");

    const IsMounted = useRef(false);

    useEffect(() => {
        if (IsMounted.current){
            handleOpenSnackBar()
        }
        IsMounted.current = true;
    // eslint-disable-next-line
    }, [updateAccountError, updateAccountMessage])
    
    
    const [formData, setFormData] = useState({});

    function handleSubmitAccountUpdate(e, data){
        e.preventDefault()
        handleUpdateAccount(data)
    }

    return ( 
        <Layout>
            <Typography sx={{fontWeight: "bold", textAlign: "center"}}>Update Your Account Profile</Typography>
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
                    handleSubmitAccountUpdate(e, formData)
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
                        </div>
                        <div className={styles.oneRow}>
                            <Button 
                            variant="contained" 
                            type="submit"
                            size="large"
                            sx={{
                                minWidth: 120,
                                margin: "auto"
                            }}
                            endIcon={<ManageAccountsIcon />}>
                                <Typography>Submit</Typography>
                            </Button>
                        </div>
                    </div>
                </Box>
            </Paper>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={updateAccountError ? "error" : "success"} sx={{ width: '100%' }}>
                {updateAccountMessage?.message}
                </Alert>
            </Snackbar>
        </Layout>
     );
}
 
export default Account;