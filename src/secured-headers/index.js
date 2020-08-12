// Lambda code courtesy AWS-Samples https://github.com/aws-samples/amazon-cloudfront-secure-static-site/blob/13712cc91baa33e62aba5749f990b735f55efa9b/source/secured-headers/index.js
'use strict';
exports.handler = (event, context, callback) => {
    
    //Get contents of response
    const response = event.Records[0].cf.response;
    const headers = response.headers;
//Set new headers 
 headers['strict-transport-security'] = [{key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubdomains; preload'}]; 
 //  headers['content-security-policy'] = [{key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' https://images.unsplash.com https://*.ghost.org; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline'; object-src 'none'"}]; 
 headers['x-content-type-options'] = [{key: 'X-Content-Type-Options', value: 'nosniff'}]; 
 headers['x-frame-options'] = [{key: 'X-Frame-Options', value: 'DENY'}]; 
 headers['x-xss-protection'] = [{key: 'X-XSS-Protection', value: '1; mode=block'}]; 
 headers['referrer-policy'] = [{key: 'Referrer-Policy', value: 'same-origin'}]; 
    
    //Return modified response
    callback(null, response);
};