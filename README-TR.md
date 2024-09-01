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
