# Tinder Date · Season 2 💘

Kontynuacja gry „Tinder Date” od Ani. Tym razem gra Ania, a Mariusz pisze wiadomości.
Statyczna strona (HTML + CSS + JS), bez budowania i bez serwera. Wystarczy darmowy hosting plików.

## Co jest w grze

| Level | Nazwa | Co się dzieje |
|---|---|---|
| — | Intro / Match / Zasady | „Season 2”, odwrócone role |
| 09 | The Morning After | czat dzień po randce + polaroidy z wieczoru |
| 10 | Detail Detective | 4 pytania o wieczór, który przygotowała Ania (z reakcjami Mariusza) |
| 11 | Birthday Twist | czat o 22. urodzinach + 5 poszlak (Beskidy, cisza, strój kąpielowy). Bez nazwy miejsca, domku i sauny |
| 12 | Pack Your Bag | gra w pakowanie + **pełny poradnik z checklistą** |
| 13 | Swipe Your Weekend | Tinder-swipe atrakcji opisanych zagadkowo (prawdziwe nazwy w komentarzach w config.js) |
| 14 | Your Wishes | pytania o klimat weekendu + pole na życzenie |
| 15 | Send | podsumowanie i **wysyłka odpowiedzi na maila** |
| Finał | It's a Trip | czat, odliczanie do wyjazdu, link do listy pakowania |

Postęp zapisuje się w przeglądarce telefonu Ani. Checklista pakowania jest dostępna cały czas (przycisk „🧳 Lista” na dole).

## Struktura

```
index.html            – wszystkie ekrany
assets/js/config.js   – CAŁA TREŚĆ: pytania, odpowiedzi, atrakcje, lista rzeczy, mail
assets/js/app.js      – logika gry
assets/css/style.css  – wygląd (styl jak w Season 1)
assets/img/           – zdjęcia
season1.html          – oryginalna gra od Ani (link „Zagraj jeszcze raz w Season 1”)
```

Teksty zmieniasz tylko w `assets/js/config.js`. Pytanie, atrakcję albo rzecz wyłączysz, dopisując `off: true`.

## Wysyłka odpowiedzi na maila (FormSubmit.co)

Odpowiedzi idą przez darmowy [FormSubmit](https://formsubmit.co), bez zakładania konta.
**Przy pierwszej wysyłce FormSubmit musi zostać aktywowany**, więc zrób test sam, zanim wyślesz link Ani:

1. Wrzuć stronę na hosting (niżej), otwórz ją i przejdź grę do końca. Na koniec kliknij „Wyślij do Mariusza”.
2. Gra pokaże błąd wysyłki. To normalne przy pierwszym razie. Na mail `mariusz2723@gmail.com` przyjdzie wiadomość od FormSubmit z przyciskiem **Activate Form**. Kliknij go (sprawdź też spam).
3. Wyślij jeszcze raz. Tym razem mail z odpowiedziami powinien przyjść.
4. Kliknij „Od nowa ↻” na dole, żeby wyczyścić swój testowy postęp. Ania na swoim telefonie zacznie i tak od zera.
5. (Opcjonalnie) W mailu aktywacyjnym FormSubmit podaje losowy alias. Wpisz go w `config.js` → `formEndpoint: 'https://formsubmit.co/ajax/TWOJ_ALIAS'`, żeby adres mailowy nie był widoczny w kodzie strony.

Jeśli wysyłka kiedyś nie zadziała, gra pokaże Ani przyciski „Wyślij mailem ✉️” (otwiera aplikację pocztową z gotową treścią) i „Skopiuj odpowiedzi”.

> Wysyłka działa tylko ze strony na hostingu (http/https), nie z pliku otwartego z dysku.

## Darmowy hosting

Strona zawiera prywatne zdjęcia. Dlatego polecam hosting, który działa z **prywatnym** repozytorium.
Strona jest oznaczona `noindex` i ma `robots.txt`, więc nie trafi do Google. Zobaczy ją tylko ktoś, kto ma link.

### Opcja A: Netlify (polecana)
1. Wypchnij repo na GitHub (może być **prywatne**).
2. Wejdź na [app.netlify.com](https://app.netlify.com) → *Add new site* → *Import an existing project* → GitHub → wybierz repo.
3. Build command: puste, Publish directory: `/` (root). Kliknij *Deploy*.
4. W *Site configuration → Change site name* ustaw np. `tinder-date-s2`, żeby dostać adres `https://tinder-date-s2.netlify.app`.

Bez GitHuba: [app.netlify.com/drop](https://app.netlify.com/drop). Wystarczy przeciągnąć cały folder.

### Opcja B: Cloudflare Pages
[dash.cloudflare.com](https://dash.cloudflare.com) → *Workers & Pages* → *Create* → *Pages* → połącz z GitHubem → wybierz repo → bez build command, output directory `/`.

### Opcja C: GitHub Pages
Repo → *Settings* → *Pages* → *Deploy from a branch* → `main` / `root`.
⚠️ Na darmowym planie GitHub Pages działa tylko dla **publicznych** repo. Wtedy zdjęcia i kod (z mailem) będą widoczne publicznie na GitHubie.

## Podgląd lokalny

Wystarczy dwukrotnie kliknąć `index.html`. Do testu wysyłki potrzebny jest serwer, np.:

```
npx serve .
```
