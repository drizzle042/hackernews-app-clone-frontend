import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from "../styles/styles.module.css";
import Tooltip from '@mui/material/Tooltip';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Search = ({handleSearchInput, buttonText, link}) => {

    const [searchValue, setSearchValue] = useState({});

    function handleInput(e){
      setSearchValue(
        {
        ...searchValue,
        keyword: e?.target?.value
        })
      handleSearchInput(searchValue)
    }

    const [storyType, setStoryType] = useState('all');
    function handleSelect(e){
        setStoryType(e?.target?.value);
        setSearchValue(
          {
          ...searchValue,
          type: e?.target?.value
          })
    };

    // eslint-disable-next-line
    useEffect(() => handleSearchInput(searchValue), [storyType]);

    return ( 
        <div className={styles.searchbar}>
            <FormControl sx={{ m: 1, width: '100vw', maxWidth: "600px" }} variant="outlined" size="small">
                <InputLabel htmlFor="search">Search</InputLabel>
                <OutlinedInput
                    id="search"
                    onInput={handleInput}
                    endAdornment={
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                    }
                    label="Search"
                />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">
                    <Typography sx={{ minWidth: 100 }}>Story Type</Typography>
                </InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={storyType}
                    label="Story Type"
                    onChange={handleSelect}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="story">Posts</MenuItem>
                    <MenuItem value="ask">Questions</MenuItem>
                    <MenuItem value="job">Jobs</MenuItem>
                </Select>
            </FormControl>
            <Tooltip title="Get only your own posts">
                <Link to={link} style={{color: "#fff"}}><Button 
                variant="contained" 
                type="button"
                size="large"
                sx={{
                    minWidth: 120,
                    marginTop: "auto",
                    marginBottom: "auto"
                }}
                endIcon={<AccountBoxIcon />}>
                    <Typography>{buttonText}</Typography>
                </Button></Link>
            </Tooltip>
        </div>
     );
}
 
export default Search;