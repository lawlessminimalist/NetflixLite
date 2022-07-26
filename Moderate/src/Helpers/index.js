import * as AWS from "aws-sdk";
import SmartStream from './Streams.js'

const s3 = new AWS.S3({
    accessKeyId: 'AKIASXW3YOA32OGFH36T',
    secretAccessKey: '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'
});

export default async function createAWSStream(bucket,key) {
    return new Promise((resolve, reject) => {
        const bucketParams = {
            Bucket: bucket,
            Key: key
        };

        try {
            
            s3.headObject(bucketParams, (error, data) => {
                if (error) {
                    throw error
                };

                const stream = new SmartStream(bucketParams, s3, data.ContentLength);

                resolve(stream);
            })
        } catch (error) {
            reject(error);
        }
    })
}

console.log(createAWSStream('video-bucket-aws','720p/videoplayback.mp4'))

