import Typography from '@mui/material/Typography';
import internetError from "../assets/images/internetConnection.png";

const FetchError = ({error}) => {
    return ( 
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <img src={internetError} alt="no internet" style={{maxWidth: "300px", margin: "auto"}} />
            <Typography sx={{textAlign: "center", fontWeight: "bold", color: "crimson"}}>{error}</Typography>
        </div>
     );
}
 
export default FetchError;