Tabii ki, aşağıda commit mesajı kuralları ve örnekleri verilmiştir:

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
