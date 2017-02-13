# facebook-api-to-csv
Pulls facebook api information and outputs to csv

## Requirements
- Node 7.x.x

## Usage
- Run
`node server.js <FACEBOOK_APP_ID> <FACEBOOK_APP_SECRET> <INPUT_PATH> <OUTPUT_FIELDS> <OUTPUT_PATH>`
- Go to localhost:3000/auth

## Definitions
- FACEBOOK_APP_ID: your facebook app ID, found [here](https://developers.facebook.com)
- FACEBOOK_APP_SECRET: found alongside id
- INPUT_PATH: graphql endpoint. Facebook GraphQL Explorer is [here](https://developers.facebook.com/tools/explorer/)
- OUTPUT_FIELDS: GraphQL object keys you'd like to save to CSV
- OUTPUT_PATH: CSV output path
