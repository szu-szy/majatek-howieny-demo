# Fonty self-hosted — Majątek Howieny

Wrzuć tu licencjonowane pliki rodziny **Juana Extra** (Latinotype) w formacie `.woff2`.
@font-face deklaracje są w `assets/css/components/fonts.css` i oczekują DOKŁADNIE tych nazw:

| Plik                         | Waga | Styl    |
|------------------------------|------|---------|
| `JuanaExtra-Regular.woff2`   | 400  | normal  |
| `JuanaExtra-Italic.woff2`    | 400  | italic  |
| `JuanaExtra-Medium.woff2`    | 500  | normal  |
| `JuanaExtra-SemiBold.woff2`  | 600  | normal  |
| `JuanaExtra-SemiBoldItalic.woff2` | 600 | italic |

Dopóki plików nie ma, nagłówki na homepage używają fallbacku **Playfair Display** (bez błędów).
Po wgraniu plików font załaduje się automatycznie (font-display: swap).

> Jeśli nazwy plików z odlewni są inne — zmień ścieżki w `fonts.css` albo przemianuj pliki na powyższe.
