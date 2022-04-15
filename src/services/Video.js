import axios from "axios";

const host = "https://yt-vd-downloader-nodejs.herokuapp.com";
async function getVideoDetails(videoURL) {
    const END_POINT = `${host}/getVideoDetails?url=${videoURL}`;

    const { data: response } = await axios.get(END_POINT) //use data destructuring to get data from the promise object
    return response


}
async function downloadVideo(videoURL, videoID, quality, container) {
    const END_POINT = `${host}/download?videoURL=${videoURL}&&videoID=${videoID}&&quality=${quality}&&container=${container}`;

    // const { data: response } = await axios.get(END_POINT) //use data destructuring to get data from the promise object
    const { data: response } = axios({
    url: END_POINT,
    method: 'GET',
    responseType: 'blob', // important
    onDownloadProgress: (progressEvent) => {
        //let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); // you can use this to show user percentage of file downloaded
        console.log(progressEvent)
        document.getElementById('loaded').innerHTML = bytesToSize(progressEvent.loaded);
    }
    }).then((response) => {
        document.getElementById('downloaddiv').style.display = 'flex';
        document.getElementById('progress').style.display = 'none';
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', videoID+'.mp4'); //or any other extension
        document.body.appendChild(link);
        link.click();
    });

    return response


}
function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

export { getVideoDetails, downloadVideo }