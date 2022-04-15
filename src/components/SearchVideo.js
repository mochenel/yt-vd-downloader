import { Button, CircularProgress, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { getVideoDetails } from '../services/Video';
import RenderVideo from './RenderVideo';
export default function SearchVideo() {

    const [url, setUrl] = useState("");
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(false)

    const clickEvent = () => {
        setLoading(true);
        setVideo(null);
        getVideoDetails(url).then(function(response) {
            console.log(response)
            setVideo(response)
            setLoading(false);
        }).catch(function(error) {
            setLoading(false);
            console.log(error.message, "FAIL")
        });
    }

    return ( 

        <Box display = "flex"
        justifyContent = "center"
        alignItems = "center"
        flexDirection = 'column'
   
         >

        <div style = {{ display: 'flex', flexWrap:"wrap", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' } } >

        <TextField style = {{ width: '800px' } }
        label = "Video url"
        value = { url }
        onChange = {(e) => setUrl(e.target.value) }
        /> {loading ?
                <CircularProgress style = {{ marginLeft: '10px' } }/> 
                : <Button style = {{ marginLeft: '10px' } }
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