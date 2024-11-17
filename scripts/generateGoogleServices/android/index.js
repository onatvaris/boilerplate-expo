const fs = require('fs');
const dotenv = require('dotenv');

const appConfig = require('../../../app.json');
const templateFilePath = require.resolve('./template.json');

dotenv.config();

const androidGoogleService = fs.readFileSync(templateFilePath, 'utf8');

const filledTemplate = androidGoogleService
  .replaceAll('${PROJECT_NUMBER}', process.env.PROJECT_NUMBER)
  .replaceAll('${PROJECT_ID}', process.env.PROJECT_ID)
  .replaceAll('${CURRENT_KEY}', process.env.CURRENT_KEY)
  .replaceAll('${PACKAGE_NAME}', appConfig.expo.android.package);

fs.writeFileSync('src/assets/google-services.json', filledTemplate);
