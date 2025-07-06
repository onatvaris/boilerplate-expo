Bu depo, bir Android uygulaması için otomatik olarak imzalanmış APK ve AAB dosyaları oluşturmak amacıyla yapılandırılmış bir GitHub Actions iş akışı (`build.yml`) içerir. Bu iş akışının sorunsuz bir şekilde çalışabilmesi için aşağıdaki gereksinimlerin karşılanması gerekir:

### Gereksinimler

#### 1. Keystore Dosyasının Oluşturulması ve GitHub Secrets'a Eklenmesi

**Keystore Dosyasını Oluşturma:**

Android uygulamanızın imzalanması için bir keystore dosyası oluşturmanız gerekir. Bunu yapmak için aşağıdaki komutu kullanabilirsiniz:

```bash
keytool -genkey -v -keystore your-keystore-file.jks -keyalg RSA -keysize 2048 -validity 10000 -alias your-key-alias
```

Bu komutu çalıştırdığınızda, aşağıdaki bilgileri girmeniz istenecektir:

- **Keystore Şifresi**: Keystore dosyasını korumak için bir şifre belirlemeniz gerekecek. Bu şifre hem keystore dosyası hem de anahtar (key alias) için kullanılacaktır.
- **Kişisel Bilgiler**: İsteğe bağlı olarak adınız, organizasyonunuz, şehir vb. bilgileri girebilirsiniz. Bu bilgiler, anahtar sertifikasında yer alır.

Örnek bir girdi:

```bash
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

Bu işlemin sonunda, `your-keystore-file.jks` adlı bir keystore dosyası oluşturulmuş olacaktır.

**Keystore Dosyasını Base64 Formatına Dönüştürme:**

GitHub Secrets'a ekleyebilmek için keystore dosyanızı base64 formatına dönüştürmeniz gerekmektedir. Bunu yapmak için aşağıdaki komutu kullanabilirsiniz:

```bash
base64 -i your-keystore-file.jks -o your-keystore-file.jks.base64
```

Bu komut, keystore dosyanızı base64 formatına dönüştürerek `your-keystore-file.jks.base64` adlı bir dosyaya kaydedecektir.

**Base64 Keystore Dosyasını GitHub Secrets'a Ekleme:**

GitHub deposu için oluşturduğunuz `your-keystore-file.jks.base64` dosyasının içeriğini kopyalayın ve GitHub Secrets'a aşağıdaki şekilde ekleyin:

- **ANDROID_KEYSTORE**: `your-keystore-file.jks.base64` dosyasının içeriği.
- **ANDROID_KEYSTORE_PASSWORD**: Keystore dosyası oluştururken belirlediğiniz şifre.
- **ANDROID_KEY_ALIAS**: Keystore dosyası oluştururken kullandığınız alias (anahtar adı).
- **ANDROID_KEY_PASSWORD**: Eğer ayrı bir key password belirlemediyseniz, `ANDROID_KEYSTORE_PASSWORD` ile aynı şifreyi kullanabilirsiniz.

**Güvenlik Notu**: Bu bilgiler oldukça hassastır. GitHub Secrets'ı kullanmak güvenlidir, ancak bu bilgileri asla açık bir şekilde paylaşmayın veya kaynak kodunuza eklemeyin. Düzenli olarak şifreleri değiştirmeyi ve erişimi sınırlamayı unutmayın..

### `build.yml` Dosyasının Çalıştırılması

Bu `build.yml` dosyası, yukarıdaki gereksinimlerin karşılanmasının ardından GitHub Actions iş akışı olarak çalıştırılabilir. Bu iş akışı, her `push` veya manuel tetikleme sonrası Android uygulamanız için imzalanmış APK ve AAB dosyalarını otomatik olarak oluşturur ve bunları depoya yükler. Bu işlem, Android uygulamanızın her sürümünün güvenli ve tutarlı bir şekilde imzalanmasını sağlar, böylece kullanıcılarınıza güvenle sunabilirsiniz.

---

### Commit Mesajı Kuralları

**commitlint** ile birlikte gelen `config-conventional` yapılandırması, Angular commit mesajı kurallarını kullanır. Örnek kurallar şunlardır:

- **build**: Derleme sisteminde yapılan değişiklikler veya dış bağımlılıkların eklenmesi ya da kaldırılması
- **chore**: Build süreci veya yardımcı araçların değişiklikleri ve dökümantasyon oluşturma
- **ci**: Sürekli entegrasyon dosyalarında veya komutlarında yapılan değişiklikler
- **docs**: Sadece dökümantasyon değişiklikleri
- **feat**: Yeni bir özellik eklenmesi
- **fix**: Bir hatanın düzeltilmesi
- **perf**: Performans iyileştirmeleri için yapılan değişiklikler
- **refactor**: Ne bir hata düzeltmesi ne de yeni bir özellik olan kod değişiklikleri
- **revert**: Daha önceki bir commit'in geri alınması
- **style**: Kodun anlamını etkilemeyen değişiklikler (boşluk, formatlama, noktalama işaretleri vb.)
- **test**: Test eklenmesi veya mevcut testlerin değiştirilmesi

### Örnek Commit Mesajları

- `build: yeni bir bağımlılık eklendi`
- `chore: package.json dosyası güncellendi`
- `ci: GitHub Actions yapılandırması güncellendi`
- `docs: readme dosyası güncellendi`
- `feat: kullanıcı profil sayfası eklendi`
- `fix: giriş formundaki hata giderildi`
- `perf: veritabanı sorgusu optimize edildi`
- `refactor: kullanıcı doğrulama işlevi yeniden düzenlendi`
- `revert: önceki commit geri alındı`
- `style: kod formatı düzenlendi`
- `test: yeni test senaryoları eklendi`

---

## Firebase Entegrasyonu

Bu proje Firebase servisleri ile entegre edilmiştir. Firebase özelliklerini kullanabilmek için aşağıdaki adımları takip etmeniz gerekir:

### Firebase Proje Kurulumu

#### 1. Firebase Konsolu'nda Proje Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. **"Add project"** butonuna tıklayın
3. Proje adını girin (örn: `boilerplate-app-expo`)
4. Google Analytics'i etkinleştirin (isteğe bağlı)
5. Projeyi oluşturun

#### 2. Android Uygulaması Ekleme

1. Firebase Console'da projenizi seçin
2. **"Add app"** → **Android** simgesini seçin
3. **Android package name**: `com.onatvaris.boilerplatemyapp`
4. **App nickname**: İsteğe bağlı
5. **SHA-1 certificate fingerprint**: Keystore dosyanızdan alın
6. **"Register app"** butonuna tıklayın
7. `google-services.json` dosyasını indirin (şimdilik saklayın)

#### 3. iOS Uygulaması Ekleme

1. Firebase Console'da **"Add app"** → **iOS** simgesini seçin
2. **iOS bundle ID**: `com.onatvaris.boilerplatemyapp`
3. **App nickname**: İsteğe bağlı
4. **"Register app"** butonuna tıklayın
5. `GoogleService-Info.plist` dosyasını indirin (şimdilik saklayın)

### Firebase Servisleri Aktivasyonu

#### 1. Crashlytics Aktivasyonu

1. Firebase Console'da **"Crashlytics"** sekmesine gidin
2. **"Enable Crashlytics"** butonuna tıklayın
3. Platform seçimini yapın (Android/iOS)
4. Kurulum talimatlarını takip edin

#### 2. Diğer Servisler (İsteğe Bağlı)

Proje ihtiyaçlarınıza göre aşağıdaki servisleri de etkinleştirebilirsiniz:
- **Authentication**: Kullanıcı doğrulama
- **Firestore**: NoSQL veritabanı
- **Cloud Storage**: Dosya depolama
- **Cloud Functions**: Sunucu tarafı fonksiyonlar
- **Analytics**: Uygulama analitikleri

### GitHub Secrets Yapılandırması

Firebase entegrasyonunun GitHub Actions'ta çalışması için aşağıdaki secrets'ları repository'nize eklemeniz gerekir:

#### Firebase Secrets

**iOS için:**
- **`IOS_API_KEY`**: Firebase Console → Project Settings → iOS App → Web API Key
- **`IOS_GCM_SENDER_ID`**: Firebase Console → Project Settings → Cloud Messaging → Sender ID
- **`GOOGLE_APP_ID`**: Firebase Console → Project Settings → iOS App → App ID

**Android için:**
- **`PROJECT_NUMBER`**: Firebase Console → Project Settings → General → Project number
- **`PROJECT_ID`**: Firebase Console → Project Settings → General → Project ID
- **`CURRENT_KEY`**: Firebase Console → Project Settings → Android App → Web API Key

#### GitHub Secrets Ekleme

1. GitHub Repository → **Settings** → **Secrets and variables** → **Actions**
2. **"New repository secret"** butonuna tıklayın
3. Her secret için **Name** ve **Value** alanlarını doldurun

### Yerel Geliştirme Kurulumu

#### 1. Firebase Konfigürasyon Dosyalarını Üretme

Proje, Firebase konfigürasyon dosyalarını otomatik olarak üretebilir:

```bash
# Android google-services.json dosyasını üret
npm run android:google-services

# iOS GoogleService-Info.plist dosyasını üret
npm run ios:google-services
```

#### 2. Environment Variables ile Özelleştirilmiş Konfigürasyon

Üretim ortamı için gerçek Firebase değerlerini kullanmak istiyorsanız:

```bash
# .env dosyası oluşturun (bu dosyayı .gitignore'a ekleyin)
FIREBASE_PROJECT_ID=your-real-project-id
FIREBASE_API_KEY=your-real-api-key
FIREBASE_APP_ID=your-real-app-id

# Konfigürasyon dosyalarını üretin
npm run android:google-services
npm run ios:google-services
```

### CI/CD Süreçleri

GitHub Actions workflow'u (`build.yml`) otomatik olarak aşağıdaki Firebase işlemlerini gerçekleştirir:

1. **Firebase Konfigürasyon Dosyaları Üretimi**: Tanımlanan secrets'lar kullanılarak `google-services.json` ve `GoogleService-Info.plist` dosyaları otomatik oluşturulur
2. **Expo Prebuild**: Firebase dosyaları yerleştirildikten sonra Android ve iOS klasörleri generate edilir
3. **Imzalı APK/AAB Üretimi**: Firebase entegrasyonu ile birlikte imzalı build dosyaları oluşturulur

Bu süreç tamamen otomatiktir ve manuel müdahale gerektirmez. Yalnızca GitHub Secrets'ların doğru tanımlanmış olması yeterlidir.

### Sorun Giderme

#### 1. Build Hataları

- **Android**: `google-services.json` dosyasının `android/app/` klasöründe olduğundan emin olun
- **iOS**: `GoogleService-Info.plist` dosyasının Xcode projesine eklendiğinden emin olun

#### 2. Firebase Bağlantı Sorunları

- Package name/Bundle ID'lerin Firebase Console'daki ile eşleştiğinden emin olun
- API key'lerin doğru olduğunu kontrol edin
- Network bağlantısını kontrol edin

#### 3. GitHub Actions Hataları

- Tüm secrets'ların tanımlandığından emin olun
- Secret değerlerinin doğru olduğunu kontrol edin
- Workflow loglarını detaylı inceleyin

### Güvenlik Notları

1. **API Key'leri Gizli Tutun**: Firebase API key'lerini asla public repository'lerde paylaşmayın
2. **Firebase Rules**: Firestore ve Storage için güvenlik kurallarını yapılandırın
3. **App Check**: Üretim ortamında App Check'i etkinleştirin
4. **Regular Updates**: Firebase SDK'larını düzenli olarak güncelleyin

### Faydalı Kaynaklar

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Firebase](https://rnfirebase.io/)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Status](https://status.firebase.google.com/)
