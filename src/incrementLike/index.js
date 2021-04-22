const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  // Log the event argument for debugging and for use in local development.
  console.log(JSON.stringify(event, undefined, 2));

  const result = await ddb.update({
    TableName: process.env.TABLE_NAME,
    Key: {
      id: event.pathParameters.id
    },
    UpdateExpression: 'ADD likes :one',
    ExpressionAttributeValues: {
      ':one': 1
    },
    ReturnValues: 'UPDATED_NEW'
  }).promise();

  return result.Attributes
};