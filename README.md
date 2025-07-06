This repository contains a GitHub Actions workflow (`build.yml`) configured to automatically generate signed APK and AAB files for an Android application. To ensure the smooth operation of this workflow, the following requirements must be met:

## Requirements

### 1. Creating a Keystore File and Adding it to GitHub Secrets

#### Creating the Keystore File:

To sign your Android application, you need to create a keystore file. You can do this using the following command:

```bash
keytool -genkey -v -keystore your-keystore-file.jks -keyalg RSA -keysize 2048 -validity 10000 -alias your-key-alias
```

When you run this command, you will be prompted to enter the following information:

- **Keystore Password:** You will need to set a password to protect the keystore file. This password will be used for both the keystore file and the key alias.
- **Personal Information:** Optionally, you can enter your name, organization, city, etc. This information will be included in the key certificate.

Example input:

```
Enter keystore password:
Re-enter new password:
What is your first and last name?
  [Unknown]:
What is the name of your organizational unit?
  [Unknown]:
What is the name of your organization?
  [Unknown]:
What is the name of your City or Locality?
  [Unknown]:
What is the name of your State or Province?
  [Unknown]:
What is the two-letter country code for this unit?
  [Unknown]:
Is CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown correct?
  [no]:  yes
```

At the end of this process, a keystore file named `your-keystore-file.jks` will be created.

#### Converting the Keystore File to Base64:

To add the keystore file to GitHub Secrets, you need to convert it to Base64 format. You can do this using the following command:

```bash
base64 -i your-keystore-file.jks -o your-keystore-file.jks.base64
```

This command will convert the keystore file to Base64 format and save it as `your-keystore-file.jks.base64`.

#### Adding the Base64 Keystore File to GitHub Secrets:

Copy the contents of the `your-keystore-file.jks.base64` file and add it to GitHub Secrets as follows:

- **ANDROID_KEYSTORE:** The contents of the `your-keystore-file.jks.base64` file.
- **ANDROID_KEYSTORE_PASSWORD:** The password you set when creating the keystore file.
- **ANDROID_KEY_ALIAS:** The alias (key name) you used when creating the keystore file.
- **ANDROID_KEY_PASSWORD:** If you did not set a separate key password, use the same password as `ANDROID_KEYSTORE_PASSWORD`.

**Security Note:** This information is highly sensitive. While using GitHub Secrets is secure, never share this information openly or include it in your source code. Remember to regularly change your passwords and limit access.

## Running the `build.yml` File

Once the above requirements are met, the `build.yml` file can be run as a GitHub Actions workflow. This workflow will automatically generate signed APK and AAB files for your Android application after each push or manual trigger and upload them to the repository. This process ensures that each version of your Android application is signed securely and consistently, allowing you to distribute it to your users with confidence.

---

## Commit Message Guidelines

The `commitlint` configuration uses the `config-conventional` setup, which follows Angular commit message guidelines. Example rules include:

- **build:** Changes related to the build system or external dependencies (addition/removal)
- **chore:** Changes to the build process or auxiliary tools and libraries such as documentation generation
- **ci:** Changes to CI configuration files and scripts
- **docs:** Documentation-only changes
- **feat:** A new feature
- **fix:** A bug fix
- **perf:** A code change that improves performance
- **refactor:** A code change that neither fixes a bug nor adds a feature
- **revert:** Reverts a previous commit
- **style:** Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- **test:** Adding missing tests or correcting existing tests

### Example Commit Messages

- `build: added a new dependency`
- `chore: updated package.json`
- `ci: updated GitHub Actions configuration`
- `docs: updated README file`
- `feat: added user profile page`
- `fix: resolved error in login form`
- `perf: optimized database query`
- `refactor: reorganized user validation function`
- `revert: reverted previous commit`
- `style: formatted code`
- `test: added new test scenarios`

---

## Firebase Integration

This project is integrated with Firebase services. To use Firebase features, you need to follow the steps below:

### Firebase Project Setup

#### 1. Creating a Project in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** button
3. Enter project name (e.g., `boilerplate-app-expo`)
4. Enable Google Analytics (optional)
5. Create the project

#### 2. Adding Android Application

1. Select your project in Firebase Console
2. Select **"Add app"** → **Android** icon
3. **Android package name**: `com.onatvaris.boilerplatemyapp`
4. **App nickname**: Optional
5. **SHA-1 certificate fingerprint**: Get from your keystore file
6. Click **"Register app"** button
7. Download `google-services.json` file (save it for now)

#### 3. Adding iOS Application

1. In Firebase Console, select **"Add app"** → **iOS** icon
2. **iOS bundle ID**: `com.onatvaris.boilerplatemyapp`
3. **App nickname**: Optional
4. Click **"Register app"** button
5. Download `GoogleService-Info.plist` file (save it for now)

### Firebase Services Activation

#### 1. Crashlytics Activation

1. Go to **"Crashlytics"** tab in Firebase Console
2. Click **"Enable Crashlytics"** button
3. Select platform (Android/iOS)
4. Follow the setup instructions

#### 2. Other Services (Optional)

You can also enable the following services according to your project needs:
- **Authentication**: User authentication
- **Firestore**: NoSQL database
- **Cloud Storage**: File storage
- **Cloud Functions**: Server-side functions
- **Analytics**: Application analytics

### GitHub Secrets Configuration

For Firebase integration to work in GitHub Actions, you need to add the following secrets to your repository:

#### Firebase Secrets

**For iOS:**
- **`IOS_API_KEY`**: Firebase Console → Project Settings → iOS App → Web API Key
- **`IOS_GCM_SENDER_ID`**: Firebase Console → Project Settings → Cloud Messaging → Sender ID
- **`GOOGLE_APP_ID`**: Firebase Console → Project Settings → iOS App → App ID

**For Android:**
- **`PROJECT_NUMBER`**: Firebase Console → Project Settings → General → Project number
- **`PROJECT_ID`**: Firebase Console → Project Settings → General → Project ID
- **`CURRENT_KEY`**: Firebase Console → Project Settings → Android App → Web API Key

#### Adding GitHub Secrets

1. GitHub Repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"** button
3. Fill in **Name** and **Value** fields for each secret

### Local Development Setup

#### 1. Generating Firebase Configuration Files

The project can automatically generate Firebase configuration files:

```bash
# Generate Android google-services.json file
npm run android:google-services

# Generate iOS GoogleService-Info.plist file
npm run ios:google-services
```

#### 2. Custom Configuration with Environment Variables

If you want to use real Firebase values for production environment:

```bash
# Create .env file (add this file to .gitignore)
FIREBASE_PROJECT_ID=your-real-project-id
FIREBASE_API_KEY=your-real-api-key
FIREBASE_APP_ID=your-real-app-id

# Generate configuration files
npm run android:google-services
npm run ios:google-services
```

### CI/CD Processes

GitHub Actions workflow (`build.yml`) automatically performs the following Firebase operations:

1. **Firebase Configuration Files Generation**: `google-services.json` and `GoogleService-Info.plist` files are automatically created using defined secrets
2. **Expo Prebuild**: Android and iOS folders are generated after Firebase files are placed
3. **Signed APK/AAB Generation**: Signed build files are created with Firebase integration

This process is completely automatic and requires no manual intervention. Only the correct definition of GitHub Secrets is sufficient.

### Troubleshooting

#### 1. Build Errors

- **Android**: Make sure `google-services.json` file is in the `android/app/` folder
- **iOS**: Make sure `GoogleService-Info.plist` file is added to the Xcode project

#### 2. Firebase Connection Issues

- Make sure package name/Bundle IDs match those in Firebase Console
- Check that API keys are correct
- Check network connection

#### 3. GitHub Actions Errors

- Make sure all secrets are defined
- Check that secret values are correct
- Examine workflow logs in detail

### Security Notes

1. **Keep API Keys Secret**: Never share Firebase API keys in public repositories
2. **Firebase Rules**: Configure security rules for Firestore and Storage
3. **App Check**: Enable App Check in production environment
4. **Regular Updates**: Update Firebase SDKs regularly

### Useful Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Firebase](https://rnfirebase.io/)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Status](https://status.firebase.google.com/)

---
