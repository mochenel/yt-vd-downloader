import { Button, CardMedia, NativeSelect,LinearProgress } from '@mui/material'
import React, { useState } from 'react'
import { Box } from '@mui/system';
import { downloadVideo } from '../services/Video';
export default function RenderVideo(props) {

    let defaultFormat = null;
    const [quality, setQuality] = useState(null);
    const [videoID, setVideoID] = useState("");
    const [downloadProgress, setDownloadProgress] = useState(0);
    const downloadOnClick = (videoURL, videoID, quality)=>{
        setVideoID(props.videoDetails.videoID);
        downloadVideo(props.url, 
            props.videoDetails.videoID,
            quality != null ? quality.split(',')[0] : defaultFormat.split(',')[0], 
            quality != null ? quality.split(',')[1] : defaultFormat.split(',')[1]
            ).then(function(response){
                        document.getElementById('progress').style.display = 'block';
                        document.getElementById('downloaddiv').style.display = 'none';
            alert('video is getting downloaded')
        }).catch(function(error){
            alert('an error has occurred')
        })
       
    }

    const formatOnChange = (e)=>{
        setQuality(e.target.value)
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="iframe"
                image={props.videoDetails.iframeUrl}
            />

            <div id="downloaddiv" style={{ display: 'flex', flexDirection: 'row', marginTop: '50px', justifyItems: 'center', alignItems: 'center' }}>
                <NativeSelect
                    defaultValue={""}
                    onChange={formatOnChange}
                    inputProps={{
                        name: 'fmt',
                        id: 'uncontrolled-native',
                    }}
                >
                    {props.videoDetails.formats.map((fmt,index) => {
                        console.log(fmt)
                        if(index == 0) defaultFormat = `${fmt.height},${fmt.container}`;
                        return <option key={index}  value={`${fmt.height},${fmt.container}`}> {fmt.container}   {fmt.height} </option>
                    }).reverse()}
                    
                </NativeSelect>
                <Button  variant="contained" onClick={downloadOnClick}>Download Video</Button>


                
            </div>
              <br/>
               <Box sx={{ width: '100%' }}>
                <div  id="progress" style={{display:"none"}}>
                      <LinearProgress />  
                      <label id="loaded"> 0 B </label>
                </div>
                </Box>
        </div>
    )
}


