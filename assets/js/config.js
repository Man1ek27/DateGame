/* =====================================================================
   TINDER DATE · SEASON 2 — cała treść gry w jednym miejscu.
   Tu możesz bezpiecznie zmieniać teksty, pytania, atrakcje i listę rzeczy.
   Pytanie/atrakcję/rzecz wyłączysz, ustawiając  off: true
   UWAGA: w grze celowo NIE pada nazwa miejsca, „domek” ani „sauna”.
   ===================================================================== */
window.GAME = {

  /* ---------- Ustawienia ogólne ---------- */
  settings: {
    // Wyniki gry trafiają tutaj (FormSubmit.co — darmowe, bez konta).
    // Po pierwszej wysyłce FormSubmit przyśle maila z linkiem aktywacyjnym —
    // kliknij go raz (najlepiej przetestuj sam, zanim wyślesz link Ani).
    // Po aktywacji możesz zamienić adres na losowy alias z maila od FormSubmit,
    // np. 'https://formsubmit.co/ajax/a1b2c3d4e5...' — wtedy maila nie widać w kodzie.
    formEndpoint: 'https://formsubmit.co/ajax/mariusz2723@gmail.com',
    fallbackEmail: 'mariusz2723@gmail.com',
    emailSubject: '🎂 Tinder Date S2 — odpowiedzi Ani (urodzinowy wyjazd)',

    // Odliczanie w finale (czas lokalny). Godziny nie zdradzamy 😏
    departure: '2026-11-27T00:00:00',
    returnDate: '2026-11-30T00:00:00',

    her: 'Ania',
    me: 'Mariusz',
    yearsTogether: 3,
    birthdayAge: 22,

    // Link do oryginalnej gry Ani (Season 1). Ustaw '' żeby ukryć przycisk.
    season1Url: 'season1.html'
  },

  /* ---------- LEVEL 09 · THE MORNING AFTER ---------- */
  morningChat: {
    intro: [
      'Dzień dobry, Pani Organizatorko. ☕',
      'Wciąż nie mogę przestać myśleć o naszym wieczorze.',
      'Gra, która zaprowadziła mnie na antresolę w Sempre… a potem płatki róż, świece, nasze zdjęcia na sznurku i tort z trójką. 🥹',
      'Serio. Nikt nigdy nie przygotował dla mnie czegoś tak pięknego.'
    ],
    choices: [
      { id: 'A', label: 'Podobało Ci się? 🙈', reply: [
        'Podobało? Zgubiłem się w Twoim labiryncie, a i tak trafiłem prosto do serca. ❤️',
        'Najlepszy wieczór od bardzo dawna. Każdy detal był przemyślany — i ja to wszystko widziałem.'
      ]},
      { id: 'B', label: 'Wiedziałam, że zrobię wrażenie 😏', reply: [
        'Zrobiłaś. I to takie, że do dziś mam ten wieczór przed oczami. 😍',
        'Dobrze, że zabrałem okulary. Oślepiłaś mnie, dokładnie tak jak zapowiadałaś. 😎✨'
      ]}
    ],
    outro: ['Zachowałem kilka kadrów. Zerknij. 📸']
  },

  memories: [
    { img: 'assets/img/wieczor-1.jpg', caption: 'Nasz balon 🎈' },
    { img: 'assets/img/wieczor-2.jpg', caption: 'Płatki róż i my ♥' },
    { img: 'assets/img/wieczor-3.jpg', caption: 'Świece i my 🕯️' }
  ],
  memoriesThanks: 'Dziękuję, że tak pięknie to wszystko przygotowałaś. Każdy detal. Naprawdę każdy. ❤️',

  /* ---------- LEVEL 10 · DETAIL DETECTIVE ----------
     Krótki quiz dla Ani o wieczorze, który sama przygotowała.
     Każda odpowiedź odsłania wiadomość od Mariusza. */
  quiz: [
    { sup: 'NA ROZGRZEWKĘ', q: 'O której zaczynała się nasza randka?', correct: 'b',
      options: [ {id:'a',e:'🕕',t:'18:00'}, {id:'b',e:'🕡',t:'18:30'}, {id:'c',e:'🕖',t:'19:00'}, {id:'d',e:'🕢',t:'19:30'} ],
      reply: '18:30, antresola, na górze. Byłem na czas. Możesz mnie z tego rozliczyć. 😌' },

    { sup: 'DEKORATORKA ROKU', q: 'Co zawisło na czerwonym sznurku?', correct: 'b',
      options: [ {id:'a',e:'💡',t:'Lampki'}, {id:'b',e:'📸',t:'Nasze polaroidy'}, {id:'c',e:'💌',t:'Liściki'}, {id:'d',e:'🧾',t:'Rachunki 😂'} ],
      reply: 'Każde zdjęcie oglądałem po kilka razy. To była nasza historia na jednym sznurku. 📸' },

    { sup: 'SŁODKI DETAL', q: 'Jaka cyfra stała na torcie?', correct: 'c',
      options: [ {id:'a',e:'1️⃣',t:'1'}, {id:'b',e:'2️⃣',t:'2'}, {id:'c',e:'3️⃣',t:'3'}, {id:'d',e:'♾️',t:'∞'} ],
      reply: 'Trzy lata razem. A następny tort będzie miał dwie dwójki… 🎂😉' },

    { sup: 'PANIE ROMEO…', q: 'Czego kategorycznie NIE zatwierdziłaś w moim ekwipunku?', correct: 'c',
      options: [ {id:'a',e:'🍳',t:'Patelni'}, {id:'b',e:'🎮',t:'Pada do konsoli'}, {id:'c',e:'📦',t:'Pewnego pudełeczka'}, {id:'d',e:'🤿',t:'Maski do nurkowania'} ],
      reply: 'Zapamiętałem. Ale uprzedzam: w tej grze to ja zatwierdzam ekwipunek. 😏' }
  ],
  // Komentarze do wyniku — od 0 punktów do maksimum (rozkładane proporcjonalnie).
  quizComments: [
    'Zero?! Czy Ty w ogóle byłaś na tej randce? 😂',
    'Jeden punkt. Organizatorka zapomniała własnej imprezy. 🤭',
    'Dwa. Ewidentnie byłaś zajęta podziwianiem mnie. 😎',
    'Trzy! Jeden detal uciekł, ale ja pamiętam za nas dwoje. 💋',
    'Komplet! Pamiętasz wszystko — tak jak ja. Jesteśmy groźnym duetem. 💘'
  ],

  /* ---------- LEVEL 11 · BIRTHDAY TWIST ---------- */
  twistChat: {
    intro: [
      'Dobra. Ty przygotowałaś mi wieczór.',
      'A ktoś tu niedługo kończy 22 lata… 🎂',
      'Wiesz już, że od piątku do poniedziałku jesteś cała moja.',
      'Ale nie wiesz, gdzie jedziemy. I na razie tak zostanie. 🤫'
    ],
    choices: [
      { id: 'A', label: 'Powiedz chociaż troszkę… 🥺', reply: [
        'Troszkę? No dobra. Dostaniesz poszlaki…',
        '…ale każdą musisz zdobyć. Jedna dobra odpowiedź o mnie = jedna poszlaka. 😏'
      ]},
      { id: 'B', label: 'Mów wszystko. NATYCHMIAST. 😤', reply: [
        'Wszystko? O nie, nie, nie. Solenizantka musi poczekać. 🤫',
        'Dostaniesz poszlaki, ale nie za darmo. Za każdą odpowiesz na pytanie o mnie. Pomylisz się = kłódka zostaje. 🔒'
      ]}
    ],
    outro: ['Sprawdźmy, jak dobrze mnie znasz. 😏🗝️']
  },

  // Poszlaki odblokowują się po kolei — każdą tylko po POPRAWNEJ odpowiedzi na pytanie o Mariusza.
  // allCorrect: true = każda odpowiedź jest dobra 😄
  clues: [
    { e: '🎂', t: 'Okazja', d: 'Twoje 22. urodziny. Taka liczba zasługuje na coś więcej niż tort.',
      quiz: { q: 'Jaki sport lubię najbardziej?', allCorrect: true,
        options: [ {id:'a',e:'⚽',t:'Piłka nożna'}, {id:'b',e:'💪',t:'Kalistenika'}, {id:'c',e:'🤸',t:'Akrobatyka'}, {id:'d',e:'🏃',t:'Bieganie'} ],
        ok: 'Podchwytliwe — wszystkie są dobre! Ale w ten weekend najbardziej lubię jeden sport: bycie z Tobą. 😏❤️' } },
    { e: '🏔️', t: 'Góry', d: 'Beskidy. Około 1,5 h drogi od Krakowa.',
      quiz: { q: 'Jaki jest mój ulubiony kolor?', correct: 'a',
        options: [ {id:'a',swatch:'#1b2a5c',t:'Ciemnoniebieski'}, {id:'b',swatch:'#111111',t:'Czarny'}, {id:'c',swatch:'#2f6b45',t:'Zielony'}, {id:'d',swatch:'#7a1f33',t:'Bordowy'} ],
        ok: 'Ciemnoniebieski! Jak niebo nad górami tuż po zmroku… sprawdzimy to razem. 💙' } },
    { e: '🌲', t: 'Cisza', d: 'Las, łąki, widoki i zero tłumów. Zasięg może być słaby… i bardzo dobrze.',
      quiz: { q: 'Czego najbardziej się boję?', correct: 'd',
        options: [ {id:'a',e:'🕷️',t:'Pająków'}, {id:'b',e:'🧗',t:'Wysokości'}, {id:'c',e:'🦷',t:'Dentysty'}, {id:'d',e:'😎',t:'Niczego'} ],
        ok: 'Niczego! No… może poza Tobą, kiedy jesteś głodna. 😎' } },
    { e: '👙', t: 'Strój kąpielowy', d: 'Tak, w listopadzie. Nie, nie jedziemy nad morze. Nie pytaj po co. 😏',
      quiz: { q: 'Kto gotuje na tym wyjeździe?', correct: 'b',
        options: [ {id:'a',e:'👩‍🍳',t:'Ja, Ania'}, {id:'b',e:'👨‍🍳',t:'Mariusz — szef kuchni'}, {id:'c',e:'📱',t:'Pyszne.pl'}, {id:'d',e:'🫠',t:'Nikt, głodujemy'} ],
        ok: 'Tak jest. Na tym wyjeździe szef kuchni to ja. Ty tylko jesz i chwalisz. 👨‍🍳' } },
    { e: '🤫', t: 'Dokładne miejsce', d: 'Ściśle tajne do przyjazdu. Nawet nie próbuj wyciągać ode mnie adresu.',
      quiz: { q: 'Kto Cię kocha najbardziej na świecie?', allCorrect: true,
        options: [ {id:'a',e:'❤️',t:'Mariusz'}, {id:'b',e:'💘',t:'Też Mariusz'}, {id:'c',e:'😏',t:'Zdecydowanie Mariusz'}, {id:'d',e:'🔥',t:'Mariusz, bez dwóch zdań'} ],
        ok: 'Wszystkie odpowiedzi były dobre. Tego jednego możesz być pewna na 100%. ❤️' } }
  ],
  clueWrong: [
    'Nie tym razem! 🔒 Poszlaka zostaje pod kluczem. Spróbuj jeszcze raz.',
    'Ała, to zabolało. 💔 Jeszcze raz?',
    'Serio?! 😂 Poszlaka nadal zamknięta.',
    'Zimno, zimno… 🥶 Próbuj dalej.'
  ],

  /* ---------- LEVEL 12 · PACK YOUR BAG ----------
     type: 'must'  = obowiązkowe (liczą się do wyniku)
           'good'  = dobre, bez punktów
           'joke'  = niepotrzebne (−10 pkt)
           'wink'  = specjalne 😏 (bez punktów) */
  packing: [
    { id:'swimsuit', e:'👙', n:'Strój kąpielowy', type:'must',
      r:'Strój kąpielowy w listopadzie? Tak. Nie pytaj. Zaufaj mi. 😏', miss:'Bez stroju kąpielowego?! Odważnie… choć nie powiem, żebym narzekał. 😏 (Ale weź. Serio.)' },
    { id:'flipflops', e:'🩴', n:'Klapki', type:'must',
      r:'Klapki — mądra kobieta. Przydadzą się bardziej, niż myślisz. 🩴', miss:'A klapki? Uwierz mi, będą potrzebne. Więcej nie powiem. 🤐' },
    { id:'towel', e:'🛁', n:'Duży ręcznik', type:'must',
      r:'Duży ręcznik! Po co? Zobaczysz. 😏', miss:'Bez dużego ręcznika?! To jedna z najważniejszych rzeczy na tej liście. Nie pytaj dlaczego. 🤫' },
    { id:'beanie', e:'🧢', n:'Ciepła czapka', type:'must',
      r:'Czapka. Bo uszy marzną szybciej niż serce. 🧢', miss:'Czapka! Wieczorem może być mróz, a Twoje uszy są mi potrzebne. 😄' },
    { id:'gloves', e:'🧤', n:'Rękawiczki', type:'must',
      r:'Rękawiczki — chociaż trzymanie się za ręce też grzeje. 🧤', miss:'Bez rękawiczek? Okej, będę Ci grzał dłonie… cały weekend. 🤲' },
    { id:'cosmetics', e:'🧴', n:'Kosmetyki', type:'must',
      r:'Kosmetyczka jest. Skóra będzie Ci dziękować. ✨', miss:'Kosmetyki! Szczoteczka, krem, balsam — wiesz, że ja nie mam wszystkiego. 😅' },
    { id:'clothes', e:'👕', n:'Ubrania na zmianę', type:'must',
      r:'Ubrania na przebranie — klasyka. Choć dress code na miejscu jest… luźny. 😏', miss:'Ubrania na zmianę? Planujesz cały weekend w jednym swetrze? 😂' },
    { id:'boots', e:'🥾', n:'Wygodne buty', type:'must',
      r:'Wygodne buty. Będziemy chodzić po górach, nie po wybiegu. 🥾', miss:'Bez wygodnych butów? Góry nie wybaczają balerinek. 🥾' },
    { id:'warm', e:'🧥', n:'Ciepłe ubrania', type:'must',
      r:'Kurtka, polar, ciepłe warstwy — może być zimowo. Brawo! 🧥', miss:'Ciepłe ubrania! W Beskidach pod koniec listopada potrafi sypnąć śniegiem. ❄️' },
    { id:'mood', e:'😁', n:'Dobry humor', type:'must',
      r:'Dobry humor — najważniejsza rzecz na liście. Mój już spakowany. 😁', miss:'A DOBRY HUMOR?! Bez niego nie wpuszczam solenizantki do auta. 😤😂' },

    { id:'water', e:'💧', n:'Butelka wody', type:'good',
      r:'Woda! I tak, pamiętam o Twoim kaszlu. 😂💧' },
    { id:'socks', e:'🧦', n:'Ciepłe skarpety', type:'good',
      r:'Grube skarpety na wieczory. Najbardziej romantyczna rzecz na świecie. 🧦' },
    { id:'lotion', e:'🫧', n:'Balsam do ciała', type:'good',
      r:'Balsam? Mogę pomóc w aplikacji. 😇' },
    { id:'hair', e:'🎀', n:'Gumki do włosów', type:'good',
      r:'Gumki do włosów — przydadzą się. Bardziej niż myślisz. 🎀' },
    { id:'charger', e:'🔌', n:'Ładowarka', type:'good',
      r:'Ładowarka — choć liczę, że telefon będzie głównie robił nam zdjęcia. 📸' },
    { id:'pajamas', e:'🌙', n:'Piżama', type:'good',
      r:'Piżama? Weź. Choć nie obiecuję, że się przyda. 😏' },
    { id:'dress', e:'👗', n:'Coś ładnego na urodziny', type:'good',
      r:'Coś ładnego na urodzinowy wieczór? Nie mogę się doczekać. 😍🎂' },
    { id:'glasses', e:'👓', n:'Okulary', type:'good',
      r:'Okulary — oczywiście. Musisz mnie przecież dobrze widzieć. 😎' },

    { id:'box', e:'📦', n:'Pewne pudełeczko', type:'wink',
      r:'Pudełeczko?! 😳 Pani Romeo… tym razem: ZATWIERDZONE. 😏📦' },

    { id:'cake', e:'🎂', n:'Własny tort', type:'joke',
      r:'Własny tort na własne urodziny?! Odłóż. To moja działka. 😏🎂' },
    { id:'heels', e:'👠', n:'Szpilki', type:'joke',
      r:'Szpilki? Na górską ścieżkę? Ty mnie chcesz przetestować z pierwszej pomocy. 😂' },
    { id:'flamingo', e:'🦩', n:'Dmuchany flaming', type:'joke',
      r:'Dmuchany flaming?! To nie Chorwacja, kochanie. Zostaw go na wakacje. 😂🦩' },
    { id:'beachumbrella', e:'🏖️', n:'Parasol plażowy', type:'joke',
      r:'Parasol plażowy? W Beskidach w listopadzie? Prędzej przyda się łopata do śniegu. 😂' },
    { id:'mop', e:'🧹', n:'Mop', type:'joke',
      r:'Mop?! Jedziemy odpoczywać, nie sprzątać. Odkładaj. 🧹😂' },
    { id:'cat', e:'🐈', n:'Kot', type:'joke',
      r:'Kot?! Wiem, że kochasz koty, ale ten weekend jest tylko dla nas dwojga. 🐈😂' },
    { id:'uvlamp', e:'💅', n:'Lampa UV do paznokci', type:'joke',
      r:'Lampa UV?! Klientki poczekają. W ten weekend jedyna stylizacja, jaką robisz, to relaks. 💅😂' },
    { id:'mask', e:'🤿', n:'Maska do nurkowania', type:'joke',
      r:'Maska do nurkowania! Oddaję Ci Twój żart: szukasz Atlantydy? 😂🤿' },
    { id:'pan', e:'🍳', n:'Patelnia', type:'joke',
      r:'Patelnia?! Spokojnie, gotuję ja. Tym razem to ja pytam: randka czy MasterChef? 😂' },
    { id:'alarm', e:'⏰', n:'Budzik', type:'joke',
      r:'Budzik? Na urodzinowym wyjeździe? Zakazane. Obudzę Cię sam. ☕😏' }
  ],

  /* ---------- PORADNIK PAKOWANIA (checklista) ---------- */
  guide: [
    { title: '🤫 Tajny zestaw (nie pytaj po co)', items: [
      'Strój kąpielowy (najlepiej dwa)',
      'Klapki',
      'Duży ręcznik',
      'Gumki / spinka do włosów',
      'Butelka na wodę'
    ]},
    { title: '🏔️ Spacery i zimno', items: [
      'Wygodne buty na spacer (najlepiej za kostkę, nieprzemakalne)',
      'Ciepła kurtka',
      'Czapka',
      'Rękawiczki',
      'Szalik / komin',
      'Polar lub ciepły sweter',
      'Legginsy termiczne / ciepłe spodnie',
      'Grube skarpety (kilka par)',
      'Mały plecak na wycieczki'
    ]},
    { title: '🧴 Kosmetyczka', items: [
      'Szczoteczka i pasta',
      'Płyn do demakijażu',
      'Balsam / krem nawilżający',
      'Pomadka ochronna (mróz = spierzchnięte usta)',
      'Szampon, odżywka, żel',
      'Leki osobiste',
      'Szczotka do włosów, ewentualnie suszarka'
    ]},
    { title: '👕 Ubrania', items: [
      'Ubrania na przebranie (na 4 dni)',
      'Wygodny dres na leniwe chwile',
      'Piżama 😏',
      'Bielizna',
      'Coś ładnego na urodzinowy wieczór 🎂'
    ]},
    { title: '🔌 Drobiazgi', items: [
      'Telefon + ładowarka',
      'Dowód osobisty',
      'Okulary (i etui!)',
      'Gry / karty, jeśli masz ochotę'
    ]},
    { title: '✨ Nastawienie', items: [
      'Dobry humor 😁',
      'Gotowość do totalnego wypoczynku',
      'Zero wiadomości od klientek — paznokcie poczekają 💅',
      'Urodzinowy nastrój 🎂',
      'Apetyt (na wszystko 😏)'
    ]}
  ],
  tipsTitle: '❄️ Pogoda i rady',
  tips: [
    '🌡️ Koniec listopada w Beskidach: w dzień ok. 0–5°C, w nocy mróz. Może spaść śnieg.',
    '🧅 Ubieraj się na cebulkę — w ruchu robi się ciepło, na postoju zimno.',
    '👟 Buty z dobrą podeszwą — ścieżki mogą być błotniste albo oblodzone.',
    '🎁 Nie pakuj prezentów dla siebie. To Twoje urodziny — ja się tym zajmę. 😏'
  ],
  myPart: [
    'Dojazd i nawigacja (tym razem bez złych zakrętów 🚗)',
    'Gotowanie — szef kuchni to ja, Ty odpoczywasz 👨‍🍳',
    'Coś na rozgrzanie 🍷',
    'Urodzinowe niespodzianki 🎂',
    'Playlista na drogę 🎶'
  ],

  /* ---------- LEVEL 13 · SWIPE YOUR WEEKEND ----------
     Atrakcje są celowo opisane zagadkowo — bez nazw.
     (Dla Ciebie: hint = co to naprawdę jest.)
     Czas = przybliżony dojazd z miejsca noclegu. */
  activities: [
    { id:'stars', e:'✨', bg:'#3b2a7a,#8a63ff', t:'Wieczór pod gwiazdami', tag:'na miejscu',
      d:'Ciemne niebo bez miejskich świateł, koc, coś ciepłego w kubku i tylko my.' },
    { id:'lazy', e:'🛋️', bg:'#8a63ff,#c38bff', t:'Dzień totalnego lenia', tag:'na miejscu',
      d:'Koc, filmy, drzemka, przekąski, drzemka. Zero planu, zero wstawania.' },
    { id:'cook', e:'👨‍🍳', bg:'#e0603a,#ffb36b', t:'Kolacja od szefa kuchni', tag:'na miejscu',
      d:'Ja gotuję, Ty siedzisz pod kocem z kieliszkiem i tylko chwalisz. Szef kuchni: Mariusz.' },
    { id:'walk', e:'🥾', bg:'#2f9e7a,#9ad48a', t:'Spacer po okolicy', tag:'z buta',
      d:'Łąki, las, górskie widoki i powrót prosto pod koc. Bez auta.' },
    { id:'sunrise', e:'🌅', bg:'#ff9a5a,#ffd36b', t:'Wschód słońca z kawą', tag:'na miejscu',
      d:'Kubek kawy, koc na ramionach i mgły nad doliną. Tak, trzeba wstać. Warto.' },
    { id:'snow', e:'⛄', bg:'#5aa0d8,#d6ecff', t:'Zimowe szaleństwo', tag:'jeśli sypnie',
      d:'Bałwan, orzełek i bitwa na śnieżki. Przegrany robi herbatę.' },
    { id:'games', e:'🎲', bg:'#3a7d6b,#7fd1b3', t:'Wieczorny turniej', tag:'na miejscu',
      d:'Karty i planszówki. Stawka? Ustalimy na miejscu. 😏' },
    // hint: Muzeum Browaru Żywiec (ok. 20 min)
    { id:'gold', e:'🍺', bg:'#d4a017,#f2d16b', t:'Złoto w butelce', tag:'ok. 20 min',
      d:'Miejsce, gdzie od ponad 160 lat powstaje coś, co znasz z etykiety z tańczącą parą. Zwiedzanie… z degustacją. 😏' },
    // hint: Jezioro Żywieckie (ok. 25 min)
    { id:'water', e:'🌊', bg:'#2d7fd3,#7bc4ff', t:'Wielka woda między górami', tag:'ok. 25 min',
      d:'Tafla wody otoczona szczytami. Spacer brzegiem, herbata z termosu i zachód słońca tylko dla nas.' },
    // hint: Góra Żar — kolej linowo-terenowa + górny zbiornik elektrowni (ok. 40 min)
    { id:'peak', e:'🚠', bg:'#3b6fd8,#9fb7ff', t:'Wagonikiem pod chmury', tag:'ok. 40 min',
      d:'Szczyt, na który wjeżdża się wagonikiem po szynach. Na górze czeka jezioro, którego nie stworzyła natura, a w dole widać dwa kolejne.' },
    // hint: Żywiecki Park Etnograficzny (skansen) — sprawdź godziny otwarcia w listopadzie
    { id:'time', e:'🛖', bg:'#8a5a3a,#d9a877', t:'Podróż w czasie', tag:'bardzo blisko',
      d:'Drewniane chaty, dawne rzemiosło i wieś sprzed stu lat. Wehikuł czasu na jedno popołudnie.' },
    // hint: Grota Komonieckiego + wodospad Dusica (w okolicy, krótki spacer leśną ścieżką)
    { id:'cave', e:'🦇', bg:'#24404a,#5fa3a8', t:'Tajemnice lasu', tag:'w okolicy',
      d:'Ukryta w lesie skalna grota nazwana na cześć dawnego kronikarza, a niedaleko woda spadająca kaskadą po skałach. Weź latarkę i odwagę. 🔦' },
    // hint: masaż / SPA w okolicy
    { id:'touch', e:'💆', bg:'#c26bd4,#f2b6ff', t:'Coś dla ciała', tag:'w okolicy',
      d:'Ciepłe dłonie, olejki i godzina, w której nie musisz nic. Urodzinowo. 😏' }
  ],

  /* ---------- LEVEL 14 · YOUR WISHES ---------- */
  prefs: [
    { id:'pace', sup:'TEMPO', q:'Jaki ma być ten weekend?', hint:'Bez presji — każda odpowiedź jest dobra.',
      options:[ {id:'chill',e:'🐢',t:'Totalny chill'}, {id:'mix',e:'⚖️',t:'Pół na pół'}, {id:'active',e:'🏃‍♀️',t:'Aktywnie: góry i zwiedzanie'} ] },
    { id:'birthday', sup:'URODZINY 🎂', q:'Jak chcesz świętować 22?', hint:'Można wybrać kilka. Reszta i tak będzie niespodzianką. 😏', multi:true,
      options:[ {id:'midnight',e:'🕛',t:'Tort o północy'}, {id:'toast',e:'🥂',t:'Toast pod gwiazdami'}, {id:'allday',e:'🎁',t:'Niespodzianki przez cały dzień'}, {id:'surprise',e:'🤫',t:'Zaskocz mnie'} ] },
    { id:'wakeup', sup:'POBUDKA', q:'Jak wstajemy?', hint:'Urodzinowo — Ty decydujesz.',
      options:[ {id:'early',e:'🌅',t:'Wcześnie, żeby nic nie przegapić'}, {id:'noalarm',e:'☕',t:'Bez budzika'}, {id:'coffee',e:'😴',t:'Kto pierwszy wstanie, robi kawę'}, {id:'stay',e:'🛌',t:'W ogóle nie wstajemy 😏'} ] },
    { id:'dinner', sup:'SZEF KUCHNI POLECA 👨‍🍳', q:'Co mam Ci ugotować na kolację?', hint:'Można wybrać kilka albo wpisać własne danie. Gotuję ja — Ty odpoczywasz.', multi:true, other:'Inne danie… (wpisz, co chcesz)',
      options:[ {id:'pasta',e:'🍝',t:'Makaron'}, {id:'grill',e:'🥩',t:'Coś z grilla'}, {id:'stew',e:'🍲',t:'Coś rozgrzewającego (zupa, gulasz)'}, {id:'pizza',e:'🍕',t:'Domowa pizza'} ] },
    { id:'breakfast', sup:'ŚNIADANIE DO ŁÓŻKA', q:'Co mam Ci podać rano?', hint:'Wiem, co wybierzesz. Ale udawajmy, że nie wiem. 😉 Możesz też wpisać coś swojego.', other:'Coś innego… (wpisz)',
      options:[ {id:'sandwich',e:'🧀',t:'Kanapka z serem i ketchupem'}, {id:'pancakes',e:'🥞',t:'Naleśniki'}, {id:'eggs',e:'🍳',t:'Jajecznica'}, {id:'oats',e:'🥣',t:'Owsianka z owocami'} ] },
    { id:'drinks', sup:'WIECZOREM PIJEMY…', q:'Co rozgrzewa najlepiej?', hint:'Można wybrać kilka.', multi:true,
      options:[ {id:'mulled',e:'🍷',t:'Grzaniec'}, {id:'prosecco',e:'🥂',t:'Prosecco'}, {id:'tea',e:'🍵',t:'Herbata z rumem i pomarańczą'}, {id:'zero',e:'🧃',t:'Bez procentów'} ] },
    { id:'evening', sup:'WIECZORY', q:'Jaki klimat wieczorów?', hint:'Można wybrać kilka. Ostatnia opcja też się liczy. 😏', multi:true,
      options:[ {id:'games',e:'🎲',t:'Gry planszowe / karty'}, {id:'movie',e:'🎬',t:'Film pod kocem'}, {id:'stars',e:'✨',t:'Gwiazdy i rozmowy'}, {id:'noplan',e:'😏',t:'Nie planujmy wieczorów…'} ] }
  ],
  wishPrompt: 'Twoje urodzinowe życzenie na ten wyjazd (albo coś, czego NIE chcesz, np. jedzenie, którego nie lubisz):',

  /* ---------- FINAŁ ---------- */
  finalChat: [
    'Odebrałem. Plan się układa. 😏',
    'Ty się pakuj, ja ogarniam resztę.',
    'Ostatnio to Ty mnie zaskoczyłaś. Teraz moja kolej. Wszystkiego najlepszego, solenizantko. 🎂❤️'
  ]
};
