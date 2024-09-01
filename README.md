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
