const fs = require('fs');
const appConfig = require('../../../app.json');
const path = require('path');

const rootPath = path.resolve(__dirname, '../../../');

require('dotenv').config();

const templateFilePath = path.join(
  rootPath,
  'scripts/generateGoogleServices/android/template.json'
);

const androidGoogleService = fs.readFileSync(templateFilePath, 'utf8');

const filledTemplate = androidGoogleService
  .replaceAll('${PROJECT_NUMBER}', process.env.PROJECT_NUMBER)
  .replaceAll('${PROJECT_ID}', process.env.PROJECT_ID)
  .replaceAll('${CURRENT_KEY}', process.env.CURRENT_KEY)
  .replaceAll('${PACKAGE_NAME}', appConfig.expo.android.package);

fs.writeFileSync(
  path.join(rootPath, 'src/assets/google-services.json'),
  filledTemplate
);
