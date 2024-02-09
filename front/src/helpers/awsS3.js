import axios from 'axios';

/*
 * Upload a file to a S3 server with a post to an API URL 
 * @param  {String}    url       Url to the api to post
 * @param  {Object}    headers   Object with headers to send the API
 * @param  {formData}  data      formData object with the file to upload
 * @return {String}    response  URL where file is store on the S3
 */
export async function uploadFileToS3(
    url,
    headers,
    data,
    fileType="certificate",
    extensions = []
) {
    let filename = data.get(fileType).name;
    let fileExtension = filename.split(".").pop();
    if (extensions.indexOf(fileExtension) > -1) {
        const postfile = await axios.post(
            url,
            data,
            headers
        ).catch(function(error) {
            throw error;
        });
        return postfile.data.url?postfile.data.url:postfile.data.path;
    }    
    throw new Error("Error file type can only be: " + extensions);
}

/*
 * Download a file from a S3 server with a get to an API URL 
 * @param  {String}    url       Url to the api to post
 * @param  {Object}    headers   Object with headers to send the API
 * @return {String}    response  URL to download the file from S3
 */
export async function downloadFileFromS3(
    url,
    headers
) {
    const responseUrl = await axios.get(
        url,
        headers
    );
    return responseUrl.data.url;
}