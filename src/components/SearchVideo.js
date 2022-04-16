import { Button, CircularProgress, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { getVideoDetails } from '../services/Video';
import RenderVideo from './RenderVideo';
import Alert from '@mui/material/Alert';

const regexp = /^(ftp|http|https):\/\/[^ "]+$/
export default function SearchVideo() {

    const [url, setUrl] = useState("");
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState("");
    
    const clickEvent = () => {
       
        if(!regexp.test(url)){
            setOpen(true)
            setError("Invalid download link")
            return;
        }
        setLoading(true);
        setVideo(null);
        getVideoDetails(url).then(function(response) {
            console.log(response)
            setVideo(response)
            setLoading(false);
        }).catch(function(error) {
            setLoading(false);
            console.log(error.message, "FAIL")
            setOpen(true)
            setError("The download link not found.")
        });
    }

    return ( 

        <Box display = "flex"
        justifyContent = "center"
        alignItems = "center"
        flexDirection = 'column'
   
         >

        <div style = {{ width: '80%', display: 'flex', flexWrap:"wrap", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin:"50px" } } >
        {
          open ?  
        <Alert style = {{margin: '10px'}} severity="error" onClose={() => {setOpen(false)}}>{error}</Alert>
            : null
    }
        <TextField style = {{ width: '100%' } }
        label = "Video url"
        value = { url }
        onChange = {(e) => setUrl(e.target.value.trim()) }
        /> {loading ?
                <CircularProgress style = {{ marginLeft: '10px' } }/> 
                : <Button style = {{ margin: '10px' } }
                          variant = "contained"
                          onClick = { clickEvent } > Submit < /Button>
        }

        </div> <br / >


        {
            video !== null && < RenderVideo videoDetails = { video }
            url = { url }
            />}
            
            </Box>

        )
    }