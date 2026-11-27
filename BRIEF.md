Zadání pro stavbu webu Minka Creative
Verze 1 · 25. 11. 2026 · určeno pro Claude Code nebo jiný AI nástroj pro programování. Texty, fotky a rozhodnutí v sekci 14 dodá Jakub, vše ostatní je návrh k realizaci.
1. Cíl a kontext
Co web je: hlavní web fotografa a tvůrce videí Jakuba Minky, značka Minka Creative (minka-creative.cz). Zastřešuje foto, video a dron. Svatební video je samostatná značka na minka-weddings.cz (jen odkaz).
Hlavní cíl: víc poptávek od firem, stavebních firem a developerů, realitek a architektů, obcí a turistických center, pořadatelů akcí a škol (maturitní plesy).
Vedlejší cíle: být dohledatelný lokálně (Vlašim, Benešov, Středočeský kraj, Praha; druhotně Vysočina a Jižní Čechy), vystupovat dobře v AI vyhledávání a budovat důvěru referencemi.
Hlavní akce návštěvníka: odeslat poptávku, zavolat nebo napsat (klidně i přes Whatsapp). Každá stránka vede k jedné z nich.
Předpoklad tohoto zadání (varianta A): jeden web včetně dronových služeb. Doména fotovideodronem.cz se po spuštění přesměruje (301) na nový web. Pokud se Jakub rozhodne pro druhý, dronový web, zadání se upraví.
2. Značka a tón
• Název: Minka Creative. Osobní podpis: Jakub Minka, fotograf a tvůrce videí.
• Tón: stručný, jistý, lidský. Krátké věty, žádný korporátní žargon, žádné přehnané sliby.
• Obrazem se prodává víc než textem. Fotka nebo video zabírá víc místa než odstavec.
• Důvěra: 8+ let zkušeností, vlastní technika, licence a pojištění pro dron, kompletní produkce od nápadu po střih (údaje ověřit před zveřejněním).
3. Technické zadání
• Framework: Astro (statický výstup), TypeScript, komponenty v .astro. Interaktivitu (lightbox, menu, galerie) řešit lehkými ostrůvky nebo čistým JavaScriptem, bez těžkého frameworku, pokud to není nutné.
• Styly: Tailwind CSS nebo vlastní CSS s proměnnými (barvy, písma, rozestupy jako design tokeny). Mobile first.
• Obsah: Astro Content Collections (viz sekce 8) a jednoduchý CMS nad repozitářem (Keystatic nebo Decap, vybrat podle pohodlí; Jakub má obsah upravovat bez zásahu do kódu).
• Obrázky: pipeline Astro (astro:assets), výstup AVIF a WebP, srcset a sizes, lazy loading mimo první obrazovku, vždy zadané rozměry nebo poměr stran (žádný posun layoutu).
• Video: dlouhá videa hostovat externě (YouTube, Vimeo nebo Bunny Stream) a načítat až po kliknutí (náhledový obrázek s tlačítkem Play). Hero smyčka z vlastního souboru: bez zvuku, autoplay muted loop playsinline, 1080p, do cca 4 MB, 6 až 10 sekund, s poster obrázkem.
• Hosting: Cloudflare Pages, Vercel nebo Netlify (statika, CDN, automatické nasazení z Gitu).
• Verzování: Git repozitář od prvního dne.
• Formulář: viz sekce 9.
• Měření: soukromí šetřící analytika (např. Plausible nebo Umami), případně GA4 se souhlasem. Konverze: odeslaný formulář, kliknutí na telefon a e-mail.
• Jazyk: čeština (lang="cs"). Angličtina až později, struktura ať ji nevylučuje.
4. Mapa stránek a adresy
Minimální verze 1 (spuštění):
• / Titulka
• /sluzby/ rozcestník
• /sluzby/foto/, /sluzby/video/, /sluzby/dron/
• /pro-firmy/ firmy a značky (promo, produkty, reelsky)
• /stavebni-fotoreporty/ stavby a developeři
• /interiery-architektura/ realitky, interiéry, exteriéry, architektura
• /obce-mesta-turismus/
• /eventy/ firemní, kulturní, sportovní akce
• /maturitni-plesy/ záznam plesů a maturitní video
• /fotograf-vlasim/ lokální stránka (Vlašim a okolí, Benešov, Středočeský kraj)
• /portfolio/ přehled s filtrem podle kategorie
• /portfolio/[slug]/ detail projektu
• /reference/
• /faq/
• /o-mne/
• /kontakt/
• /ochrana-osobnich-udaju/
• odkaz na minka-weddings.cz v menu a v patičce (ne jako stránka)
Do dalších verzí: další lokální stránky (Benešov, Praha, Vysočina), články (blog), případové studie.
Navigace: Služby (rozbalovací), Portfolio, Reference, O mně, Kontakt, Svatby (externí), tlačítko Poptávka. Na mobilu lepicí lišta s tlačítky Zavolat a Napsat.
5. Vizuální směr
Cíl: web, který působí jako výstava práce. Obraz vede, text doplňuje.
• Velké fotky a videa, na titulce a v hlavních sekcích přes celou šířku obrazovky.
• Hodně vzduchu, silná typografie, málo prvků najednou.
• Návrh barev a písem: připravit dvě varianty (např. tmavý a světlý základ s jedním akcentem), Jakub vybere. Písma samostatně hostovaná (bez volání cizích serverů), maximálně dvě rodiny.
• Pohyb střídmě: jemné objevování sekcí při scrollu, plynulé přechody mezi stránkami (View Transitions), respektovat prefers-reduced-motion.
• Žádné stock fotky. Všechny obrázky jsou z reálných zakázek.
• Tlačítka a odkazy musí mít jasný stav (hover, focus), vhodné i pro dotykové ovládání.
6. Klíčové komponenty
1.  Hero s videem na celou obrazovku, krátký nadpis, jedna věta, dvě tlačítka (Nezávazná poptávka, Portfolio). Na mobilu nahradit videem nebo statickým obrázkem podle rychlosti spojení.
2.  Masonry galerie se zachováním poměru stran fotek, lazy loadingem a bez posunu layoutu. Použít CSS sloupce nebo lehkou knihovnu, pořadí fotek musí dávat smysl i na mobilu.
3.  Lightbox: zvětšení fotky nebo videa, šipky, klávesnice (Esc a šipky), swipe na mobilu, přednačtení sousedního snímku, popisek a alt text.
4.  Sekce přes celou stránku: fotka nebo video s krátkým textem přes obraz (kontrast musí být čitelný).
5.  Karty služeb a projektů s velkým obrázkem, nadpisem a jednou větou.
6.  Video blok s náhledem a načtením až po kliknutí.
7.  Reference: citát, jméno, firma, případně logo. Karusel nebo mřížka.
8.  Logolišta klientů (jen schválená loga).
9.  FAQ formou rozbalovacích položek.
10.  Bloky Kontakt a Poptávka na konci každé stránky.
11.  Patička: kontakty, oblast působení, odkazy na sítě (Instagram, Facebook, YouTube, LinkedIn), Svatby, ochrana údajů.
7. Pravidla textů
• Krátké věty, odstavce nejvýš 2 až 3 věty, hodně nadpisů a odrážek.
• Každý nadpis odpovídá tomu, co lidé hledají (např. Focení interiérů pro realitky, ne Naše vize).
• Výjimky, kde má smysl delší text (SEO a AI vyhledávání): každá hlavní stránka začíná souhrnem na 50 až 80 slov, který přímo odpovídá na otázku (kdo, co, pro koho, kde, orientační cena). Dále 4 až 8 otázek a odpovědí v FAQ a krátká sekce Jak spolupráce probíhá (3 až 5 kroků).
• Rozsah: služby a segmentové stránky 300 až 500 slov celkem, rozdělených do bloků. Lokální stránka kolem 400 slov se skutečnými projekty z oblasti.
• Konkrétní údaje místo obecných frází: čas dodání, co je v ceně, kolik fotek, formáty, místa působení.
• Orientační ceny formou od, kde je to možné. Cestovné a podmínky stručně.
• Žádné nepravdivé nebo nepřesné reference (viz sekce 8, pole vztah).
8. Datový model obsahu
Projekty (projects)
• title, slug, client (název), showClientName (ano/ne podle souhlasu)
• relationship: přímý klient, subdodávka, zprostředkováno. Podle toho se na webu klient uvádí přesně, nebo vůbec.
• year, location, region
• categories[] (firmy, stavby, architektura, obce a turismus, eventy, plesy), services[] (foto, video, dron)
• summary (1 až 2 věty), brief a result (volitelně, krátce)
• cover, gallery[] (obrázek, alt, popisek), videoUrl, featured, order
• testimonial (odkaz na referenci), seoTitle, seoDescription
Služby (services): název, slug, souhrn, benefity, postup, FAQ, související projekty.
Reference (testimonials): jméno, firma, text, projekt, povoleno zveřejnit.
FAQ (faq): otázka, odpověď, kategorie.
Stránky (pages): titulek, souhrn, bloky, SEO pole.
Výchozí data: tabulka minka-zakazky.xlsx (111 projektů, kategorie, kvalita 1 až 3, souhlas). Na web nejdřív jdou projekty s kvalitou 3 a souhlasem.
9. Formulář a kontakt
• Pole: jméno, e-mail, telefon (volitelný), typ projektu (výběr), místo, termín (volitelný), zpráva. Rozpočet volitelně.
• Odeslání na e-mail Jakuba (např. přes Resend, Formspree nebo malou serverless funkci), potvrzení odesílateli.
• Ochrana před spamem: honeypot nebo Cloudflare Turnstile. Souhlas se zpracováním údajů formulovaný lidsky.
• Vedle formuláře telefon (+420 731 055 983), e-mail a případně WhatsApp. Údaje shodné s Google profilem a se sítěmi.
• Poděkování po odeslání s dalším krokem (odpovím do 24 hodin, ověřit).
10. SEO a AI vyhledávání
Základ stránek
• Jeden h1 na stránku, logická hierarchie nadpisů, sémantické HTML (header, main, section, footer).
• Titulek a popis pro každou stránku, vzorec: Služba + místo | Minka Creative.
• Čisté adresy, kanonické URL, sitemap.xml, robots.txt, Open Graph a náhledové obrázky.
• Všechny obrázky s popisným alt, videa s přepisem nebo popisem.
Strukturovaná data (JSON-LD)
• ProfessionalService nebo LocalBusiness pro firmu: název, telefon, e-mail, oblast působení (areaServed: Vlašim, Benešov, Středočeský kraj, Praha), odkazy na sítě.
• Person pro Jakuba Minku.
• Service pro služby, BreadcrumbList, ImageObject a VideoObject u projektů.
• Na stránce FAQ strukturovaná data použít, přínos je hlavně v čitelnosti pro vyhledávače a AI. Nespoléhat se na rozšířené výsledky v Googlu, jejich dostupnost se mění.
AI search
• Stránky odpovídají přímo a konkrétně na otázky (kdo, co, kde, za kolik, jak dlouho).
• Jednotné údaje o firmě všude (název, telefon, web, oblast).
• Čitelný obsah bez nutnosti JavaScriptu, rychlé načítání.
Výkon (cíle)
• LCP do 2,5 s, CLS do 0,1, INP do 200 ms na mobilu.
• Hlavní obrázek titulky přednačíst. Video nikdy neblokuje první vykreslení.
Přesměrování ze starého webu (301)
• /sluzby/letecke-zabery-dron/ → /sluzby/dron/
• /sluzby/fotograficke-sluzby/ → /sluzby/foto/
• /sluzby/video/ → /sluzby/video/
• /portfolio/[slug]/ → /portfolio/[slug]/ pokud projekt zůstává, jinak na příslušnou kategorii
• /faq/ a /kontakt/ na stejné adresy
• Před spuštěním vytvořit úplný seznam starých adres (export ze Search Console nebo crawl) a každou namapovat.
Po spuštění: Search Console, odeslání sitemap, kontrola indexace a chyb, Google Firemní profil odkazuje na nový web.
11. Přístupnost a právní věci
• Dostatečný kontrast textu na fotkách a videích, ovládání klávesnicí, viditelný focus.
• Videa se nespouštějí se zvukem automaticky.
• Zásady ochrany osobních údajů, informace o cookies podle toho, co se skutečně používá.
• U lidí na fotkách (eventy, plesy) a u log klientů ověřit souhlas se zveřejněním.
12. Fáze a pořadí stavby
Každá fáze se uzavře dřív, než začne další. Na konci každé je funkční, nasazený náhled.
1.  Základ: repozitář, Astro, styly, design tokeny, hlavní layout (hlavička, patička, navigace), nasazení náhledu.
2.  Design systém: typografie, tlačítka, karty, hero, sekce přes celou šířku, masonry galerie, lightbox, video blok.
3.  Titulka s reálnými fotkami a videem.
4.  Šablona služby (např. /stavebni-fotoreporty/), ze které se odvodí ostatní.
5.  Portfolio: přehled s filtrem, detail projektu, napojení na CMS.
6.  Kontakt a formulář, poděkování, měření.
7.  Zbylé stránky podle mapy (sekce 4) naplněné texty.
8.  SEO a technika: meta, strukturovaná data, sitemap, přesměrování, výkon.
9.  Kontrola: zařízení, prohlížeče, rychlost, přístupnost, odkazy, formulář.
10.  Spuštění: přepnutí domény, přesměrování, Search Console, sledování po dobu několika týdnů.
13. Kritéria hotového webu
• Všechny stránky z mapy existují a mají obsah, žádné zástupné texty.
• Web vypadá dobře na mobilu, tabletu a počítači, galerie a videa fungují plynule.
• Výkon splňuje cíle ze sekce 10 v běžném testu (např. Lighthouse nebo PageSpeed).
• Formulář odesílá a chodí na správný e-mail, spam je omezený.
• Každá stránka má titulek, popis, h1, alt u obrázků a strukturovaná data tam, kde mají smysl.
• Přesměrování ze starého webu fungují a jsou otestovaná.
• Jakub umí sám přidat projekt a upravit text přes CMS.
14. Co dodá Jakub
• Logo a barvy značky, pokud mají být zachovány.
• Výběr 15 až 20 nejlepších projektů, ke každému fotky (nejlepších 5 až 10), případně video a jednu větu o zadání a výsledku.
• Souhlasy se zveřejněním jmen klientů a logo. Přesné označení vztahu (přímý klient, subdodávka, zprostředkováno).
• Reference v aktuální podobě.
• Ceny od a podmínky (cestovné, rozsah).
• Hero video a fotky z dronu, ideálně v původní kvalitě.
• Přístupy: doména, hosting, e-mail, Search Console, měření.
• Otevřená rozhodnutí: barvy a písmo (varianta A nebo B), výběr CMS, výběr hostingu, jeden web vs. dva (zadání předpokládá jeden), případná angličtina.
15. Úvodní zadání pro AI nástroj
Přečti celé zadání. Nejdřív navrhni plán po fázích z části 12 a vypiš otázky, které potřebuješ zodpovědět. Potom začni fází 1. Nevymýšlej texty, ceny ani reference. Kde chybí podklady, použij zřetelně označený zástupný text. Po každé fázi shrň, co je hotové a co zbývá, a nech si schválit další krok. Piš čitelný a komentovaný kód, drž se struktury z části 4 a datového modelu z části 8.