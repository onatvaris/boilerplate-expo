const fs = require('fs');
const plist = require('plist');

require('dotenv').config();

const appConfig = require('../../../app.json');

const plistPath = require.resolve('./template.plist'); /
const plistContent = fs.readFileSync(plistPath, 'utf8');

const parsedPlist = plist.parse(plistContent);

parsedPlist.API_KEY = process.env.IOS_API_KEY;
parsedPlist.GCM_SENDER_ID = process.env.IOS_GCM_SENDER_ID;
parsedPlist.GOOGLE_APP_ID = process.env.GOOGLE_APP_ID;
parsedPlist.BUNDLE_ID = appConfig.expo.ios.bundleIdentifier;

const updatedPlistContent = plist.build(parsedPlist);
fs.writeFileSync('src/assets/GoogleService-Info.plist', updatedPlistContent);
