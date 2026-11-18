# KEFALONIA — Cinematic Travel Trailer

**Laufzeit:** 60 Sekunden
**Zweck:** Persönlicher Film. Kein Werbespot. Eine Einladung.
**Tonalität:** Apple Keynote × Airbnb × Visit Greece × National Geographic × Netflix Intro
**Ziel-Emotion:** *„Genau dort möchte ich gerade sein."*

---

## 0. Leitidee

Der Film verkauft kein Reiseziel. Er zeigt **Zeit**.

Der ganze Trailer basiert auf einem einzigen dramaturgischen Trick: Die ersten 45 Sekunden zeigen
nie ein Gesicht frontal, nie eine Sehenswürdigkeit als „Sehenswürdigkeit", nie ein Logo, nie einen
Preis. Es gibt nur Licht, Wasser, Wind und zwei Menschen, die man nur an Details erkennt — eine
Hand am Kaffeebecher, ein Lachen im Gegenlicht, zwei Gläser, die sich berühren.

Das Publikum (eine Person) soll sich **selbst in die Leerstelle setzen**. Deshalb ist die
Kameraperspektive fast durchgehend die einer *dritten Person, die dabei ist* — nicht die eines
Werbefilmers.

**Der emotionale Bogen:**

| Phase | Sekunden | Emotion | Funktion |
|---|---|---|---|
| Leere | 0–5 | Ruhe, fast Melancholie | Reset. Alles Laute wird abgeschaltet. |
| Weite | 5–18 | Ehrfurcht | Der Maßstab. „Die Welt ist größer als dein Kalender." |
| Nähe | 18–35 | Wärme, Intimität | Das eigentliche Versprechen: *wir*. |
| Rausch | 35–45 | Sehnsucht, Herzschlag | Der Sog. Zu schnell, um festzuhalten. |
| Frage | 45–60 | Stille, Entscheidung | Der Ball liegt bei ihr. |

**Die Regel für den Schnitt:** Jede Szene ist einen Tick **zu kurz**. Der Zuschauer soll bei jedem
Bild denken „warte, ich wollte da noch hinsehen". Genau dieses Gefühl *ist* Sehnsucht.

---

## 1. Technische Basis

| Parameter | Wert | Begründung |
|---|---|---|
| **Master-Format** | 3840 × 2160, 2.39:1 letterboxed | Anamorphes Kino-Seitenverhältnis = sofortiges „Netflix"-Signal |
| **Framerate** | 24 fps (Master) | Filmisch. 30 fps sieht nach Reisevlog aus, 60 fps nach Werbung. |
| **Zeitlupen-Shots** | in 48/60 fps generieren → auf 24 fps verlangsamen | Szene 03, 05b, 06 |
| **Zweit-Export** | 9:16 (1080 × 1920), 2.39-Streifen zentriert, Text in der schwarzen Fläche | Sie wird es auf dem Handy sehen. Das ist der eigentliche Master. |
| **Farbwelt** | Türkis-Cyan in den Schatten, warmes Bernstein in den Lichtern | Klassischer „Teal & Orange"-Split, aber entsättigt |
| **Kontrast** | Milde S-Kurve, angehobener Schwarzpunkt (Lifted Blacks, ca. 4–6 IRE) | Kein hartes Digital-Schwarz. Fühlt sich analog an. |
| **Korn** | Feines 35-mm-Korn, ca. 4 % Deckkraft | Klebt die KI-Shots optisch zusammen und kaschiert Artefakte |
| **Vignette** | Sehr sanft, ca. −0,3 Blenden | Führt den Blick, ohne aufzufallen |
| **Audio** | Stereo, Musik −14 LUFS, Sounddesign −22 bis −18 LUFS | Sounddesign flüstert, es erklärt nicht |

**Farbreferenz (Hex, als LUT-Zielwerte):**
Meer `#2E8B96` → `#7FD4D4` · Schatten `#1C2B33` · Haut/Licht `#E8C39E` · Sonne `#FFD9A0` · Assos-Häuser `#F2EDE4` · Zypressen `#3A4A3C`

---

## 2. Storyboard

> Jede Szene enthält einen **copy-paste-fertigen KI-Prompt** (bewusst auf Englisch — alle
> Video-Modelle verstehen englische Kamerasprache deutlich präziser).
> Negative Prompts stehen gesammelt in Abschnitt 6.

---

### SZENE 01 — „Die Stille" · 00:00 – 00:05

**Kamerabewegung**
Kein Schnitt, keine Bewegung im ersten Moment. Bild ist absolut schwarz für 1,2 Sekunden.
Ab Sekunde 1,2 ein extrem langsamer **Push-In** (Dolly nach vorn, ca. 4 % über 3,8 s) auf die
Wasseroberfläche. Kaum wahrnehmbar — der Zuschauer spürt es, bevor er es sieht.

**Bildaufbau**
Extreme Untersicht, Kamera ca. 30 cm über dem Wasser. Der Horizont liegt im oberen Drittel,
fast außerhalb des Bildes. Eine einzelne Welle rollt von rechts nach links durchs Bild und
bricht kurz vor der Linse. Kein Land, kein Boot, kein Mensch. Nur Wasser und Dämmerlicht.
Bildaufteilung: 80 % Wasser, 20 % Himmel.

**Brennweite**
35 mm (Vollformat), Blende f/2.0. Weit genug für Raum, nah genug für Intimität.
Kein Weitwinkel — Weitwinkel wirkt hier dokumentarisch statt meditativ.

**Licht**
Blaue Stunde, ca. 25 Minuten vor Sonnenaufgang. Einzige Lichtquelle ist der Himmel selbst.
Farbtemperatur ca. 8000 K. Keine Sonne im Bild. Das Wasser ist fast monochrom blaugrau, nur die
Gischt bricht als hellster Punkt heraus.

**Stimmung**
Leere. Nicht traurig — *entlastet*. Das Gefühl der letzten Sekunde vor dem Aufwachen.
Das ist der Zustand, aus dem der Rest des Films entsteht.

**Musik**
Keine. Absolute Abwesenheit von Musik ist hier das stärkste Instrument.
Bei 00:04,6 setzt ein einzelner, sehr tiefer Sub-Bass-Ton ein (ca. 40 Hz, kaum hörbar, eher
spürbar) — die Ankündigung, dass gleich etwas beginnt.

**Sounddesign**
- Meeresrauschen, gefiltert: Alles über 4 kHz weggedreht, als hörte man es durch eine geschlossene Tür
- Bei 00:01,2 (Bildeinsatz) öffnet der Filter langsam auf volle Bandbreite — das Bild „schaltet den Ton ein"
- Eine einzelne brechende Welle bei 00:03,4, sauber und trocken, mit hörbarem Auslaufen im Kies
- Ganz hinten, extrem leise: eine einzelne Möwe, weit entfernt

**Übergang**
Rein: Hartes Schwarz (kein Fade — der Film *beginnt* einfach).
Raus: **Fade-through-White** über 0,4 s. Die brechende Welle wird überstrahlt und öffnet sich in
Szene 02. Das ist der einzige Weißblende-Moment im ganzen Film — deshalb funktioniert er.

**Texteinblendung**
```
We don't need another busy vacation.
```
- Einsatz: 00:01,8 · Ausblendung beginnt: 00:04,4
- Position: exakt zentriert, horizontal und vertikal
- Typo: **SF Pro Display Light** (oder Helvetica Neue Light / Inter Light), 42 pt bei 4K
- Laufweite (Tracking): +40, Farbe `#FFFFFF` bei 88 % Deckkraft
- Animation: Fade-In über 0,9 s **plus** eine Skalierung von 100 % → 100,8 % über die gesamte
  Standzeit. Diese fast unsichtbare Bewegung ist der Apple-Keynote-Effekt.
- Kein Schatten, kein Glow, keine Outline. Nur Text auf Bild.

**KI-Prompt**
```
Extreme low angle shot, camera 30cm above the ocean surface at blue hour, 25 minutes
before sunrise. A single gentle wave rolls from right to left and breaks softly close to
the lens. No land, no boats, no people. Horizon sits in the upper third of the frame.
Shot on 35mm anamorphic lens at f/2.0, shallow depth of field, cinematic, muted blue-grey
palette, 8000K color temperature, soft natural light from the sky only, lifted blacks,
subtle 35mm film grain. Extremely slow dolly push-in. Meditative, calm, empty.
Photorealistic, National Geographic cinematography, 24fps motion blur.
```

---

### SZENE 02 — „Der Maßstab" · 00:05 – 00:12

**Kamerabewegung**
Der Signature-Shot. **Drohne, Reveal-Flug rückwärts und aufwärts** in einer Bewegung:
Start tief über dem Wasser, ca. 15 m über der Oberfläche, Blick auf die weiße Kalksteinwand.
Dann in einem gleichmäßigen Zug rückwärts *und* nach oben (Combined Pull-Back & Rise), während
die Kamera leicht nach unten neigt (Tilt −12°). Myrtos Beach schiebt sich von unten ins Bild und
wird über 7 Sekunden vollständig sichtbar.
Geschwindigkeit: konstant, ohne Beschleunigung. **Kein** Speed-Ramping — das wäre Drohnen-YouTube,
nicht National Geographic.

**Bildaufbau**
Sekunde 5–7: Nur weiße Felswand, das Bild ist fast abstrakt.
Sekunde 7–9: Die Bucht öffnet sich. Der Strand liegt als weiße Sichel im unteren Bilddrittel.
Sekunde 9–12: Vollbild. Der Farbverlauf des Wassers von Weiß über Türkis zu tiefem Blau bildet
drei klare horizontale Bänder. Der Strand liegt genau auf der unteren Drittellinie.
Ein einzelnes kleines Boot im Wasser — winzig, als Größenreferenz. **Das Boot ist das wichtigste
Detail im Bild:** Ohne es ist es Landschaft, mit ihm ist es Maßstab.

**Brennweite**
24 mm (Vollformat-äquivalent), f/2.8. Weit, aber nicht verzerrt. Keine Fischauge-Krümmung am
Horizont — der muss absolut gerade bleiben.

**Licht**
Später Vormittag, ca. 10:30 Uhr, Sonne von schräg links hinten. Das ist die einzige Tageszeit,
zu der Myrtos dieses leuchtende Türkis zeigt — das Licht muss steil genug sein, um bis auf den
Kiesgrund durchzudringen. Harte, aber saubere Schatten der Klippen auf der linken Bildseite als
Kontrastanker. Keine Wolken, oder maximal ein paar hohe Zirren.

**Stimmung**
Ehrfurcht. Ein einziger Atemzug, der zu groß ist für den Brustkorb. Der Moment, in dem einem klar
wird, wie klein der eigene Terminkalender ist.

**Musik**
**Einsatz bei exakt 00:05,0**, synchron zur Weißblende.
Ein einzelner, tiefer Klavieranschlag mit sehr langem Nachhall (Reverb-Fahne ca. 4 s), gefolgt von
einem einsetzenden warmen Streicher-Pad. Tempo ca. 72 BPM, aber noch **ohne Beat** — nur Fläche.
Tonart: D-Dur oder A-Dur (offen, hell). Keine Melodie, nur Grundton und Quinte. Die Melodie kommt
erst in Szene 04 — sonst verbraucht sich der Film zu früh.

**Sounddesign**
- Meeresrauschen aus Szene 01 läuft **durch**, öffnet sich aber ins Weite (mehr Stereobreite, mehr Hall)
- Wind, sehr breit, langsam an- und abschwellend
- Zwei bis drei Möwenrufe, weit auseinandergezogen, im Stereopanorama von links nach rechts wandernd
- **Bewusst kein Drohnengeräusch.** Nie.
- Ganz leise: das ferne Tuckern des kleinen Bootsmotors, als bestätigende Ebene für die Bildinformation

**Übergang**
Rein: aus der Weißblende von Szene 01, über 0,4 s.
Raus: **Match-Cut auf Wasserfarbe.** Das Türkis am unteren Bildrand von Szene 02 wird zum Türkis
neben dem Bootsrumpf in Szene 03. Harter Schnitt, aber weil die Farbe identisch ist, empfindet
das Auge ihn als fließend. Timing: exakt auf den Nachhall des Klavieranschlags.

**Texteinblendung**
Keine. Dieses Bild braucht keine Worte, und Worte würden es kleiner machen.

**KI-Prompt**
```
Aerial drone shot over Myrtos Beach, Kefalonia, Greece. The drone flies backwards and
rises simultaneously in one smooth continuous motion, tilting down 12 degrees, revealing
a white limestone cliff first, then the entire crescent-shaped white pebble beach and the
bay below. The water forms three distinct horizontal bands of color: white shallows,
bright turquoise, deep blue. One tiny boat floats in the turquoise water for scale.
Late morning light, 10:30am, sun from back left, hard clean cliff shadows on the left
side. 24mm lens, f/2.8, no fisheye distortion, perfectly level horizon. Constant speed,
no speed ramping. Cinematic, photorealistic, National Geographic aerial cinematography,
teal and amber color grade, subtle film grain, 24fps.
```

---

### SZENE 03 — „Die Bewegung" · 00:12 – 00:18

**Kamerabewegung**
Zwei Mikroshots, nahtlos verbunden.

*03a (00:12–00:15,2)* — Kamera direkt am Bootsrumpf montiert, ca. 40 cm über der Wasserlinie,
Blick nach schräg vorn. Statische Montage, aber die Bewegung des Bootes erzeugt einen
gleichmäßigen Vorwärtsfluss. Die Bugwelle läuft konstant durchs untere Bilddrittel.

*03b (00:15,2–00:18)* — Schnitt auf **Unterwasser-Halbperspektive** (Split-Level, halb über /
halb unter Wasser) oder alternativ Kamera senkrecht nach unten aus dem Boot. Die Sonnenstrahlen
brechen im Wasser und bilden bewegte Lichtnetze auf dem Sandgrund. Sehr sanfte
Aufwärtsbewegung der Kamera, in **Zeitlupe (50 %)**.

**Bildaufbau**
03a: Diagonale Komposition — der Bootsrumpf schneidet von links unten nach rechts oben durchs
Bild und teilt es im Verhältnis 1:2. Rechts oben nur offenes Wasser. Kein Horizont.
03b: Vollflächig Wasser. Die Lichtnetze („Caustics") bilden ein unregelmäßiges Muster, das nie
symmetrisch wird. Der Sandgrund liegt ca. 4 m tief, sichtbar aber unscharf.

**Brennweite**
03a: 28 mm, f/4 (mehr Tiefenschärfe, das Wasser soll bis hinten lesbar bleiben)
03b: 20 mm, f/2.8 — Weitwinkel, weil Wasser die Bildwirkung ohnehin um ca. 25 % vergrößert

**Licht**
Mittagsnah, ca. 12:30 Uhr. Sonnenstand hoch genug, dass die Strahlen fast senkrecht ins Wasser
eintreten — nur dann entstehen diese scharfen Lichtnetze. Starke Spiegelungen auf der Oberfläche,
bewusst leicht überstrahlt (Highlight-Clipping bei ca. 105 %) — das darf hier kaputtgehen, das
ist das Gefühl von zu viel Sonne.

**Stimmung**
Kindliche Freude. Kein Gedanke im Kopf. Die Textur von Sommer, nicht die Idee davon.

**Musik**
Die Streicherfläche aus Szene 02 hält. **Bei 00:12,0 kommt das erste rhythmische Element:**
ein sehr weicher, gedämpfter Kick (kein Club-Kick — eher ein Herzschlag, tief gefiltert) auf
72 BPM. Dazu ein sanftes Arpeggio auf Rhodes oder gezupftem Klavier, achtel-basiert.
Referenz: Ben Böhmer, „Beyond Beliefs" (Intro-Sektion) oder ODESZA, „Corners of the Earth"
in den ersten 40 Sekunden.

**Sounddesign**
- Wasser am Rumpf: rhythmisches Platschen und Zischen, im Takt der Bugwelle
- Bootsmotor, jetzt **nah** — aber tief gefiltert und leise, ca. −26 dB. Er soll als Vibration
  wahrgenommen werden, nicht als Motor.
- Bei 00:15,2 (Schnitt unter Wasser): **abrupter Filterwechsel.** Alles über 800 Hz fällt weg,
  ein dumpfes Blubbern und Rauschen tritt an die Stelle. Das ist der stärkste Sound-Moment
  der ersten Hälfte — der Zuschauer taucht körperlich mit.
- Bei 00:17,6 öffnet der Filter wieder, als Vorbereitung auf Szene 04

**Übergang**
Rein: Match-Cut auf Farbe (siehe Szene 02).
Zwischen 03a und 03b: harter Schnitt auf den Kick.
Raus: **Sound-Led Transition.** Der Ton von Szene 04 (Kaffee wird eingeschenkt) setzt 0,3 s
**vor** dem Bildschnitt ein. Das Ohr ist schon auf der Terrasse, während das Auge noch im Wasser
ist. Danach harter Schnitt.

**Texteinblendung**
Keine.

**KI-Prompt (03a)**
```
Camera mounted on the hull of a small wooden boat, 40cm above the waterline, looking
diagonally forward as the boat glides through brilliant turquoise water. The hull cuts
across the frame from lower left to upper right. Constant forward motion, bow wave in the
lower third. No horizon visible. 28mm lens, f/4, midday sun at 12:30pm, intense specular
highlights on the water surface, slightly blown out. Cinematic, photorealistic, crisp
water detail, teal and amber grade, subtle film grain, 24fps.
```

**KI-Prompt (03b)**
```
Underwater split-level shot in crystal clear turquoise Mediterranean water, 4 meters deep.
Near-vertical sunbeams pierce the surface and create shifting caustic light patterns on
the sandy seabed below. Very slow upward camera drift, slow motion at 50 percent speed.
20mm wide lens, f/2.8. High midday sun, strong light rays, bright and dreamlike.
No fish, no people, no divers. Photorealistic, cinematic underwater cinematography,
subtle film grain, 24fps.
```

---

### SZENE 04 — „Der Morgen" · 00:18 – 00:25

Das emotionale Zentrum des Films. Hier kippt er von *Ort* zu *uns*.

**Kamerabewegung**
Sehr langsamer **seitlicher Dolly nach rechts** (ca. 25 cm über 7 s), kombiniert mit einem
minimalen **Rack Focus**: Der Fokus liegt zunächst auf dem Dampf über der Kaffeetasse im
Vordergrund und wandert bei ca. 00:22 auf das Meer im Hintergrund. Diese Fokusverlagerung ist
die eigentliche Aussage der Szene — *der Blick geht vom Nahen ins Weite.*

**Bildaufbau**
Vordergrund links unten, unscharf: eine Kaffeetasse auf einem Holztisch, daneben ein
angeschnittenes Stück Brot, Honig, eine Feige. Nicht gestylt — bewusst leicht unordentlich.
Mittelgrund: eine leinene Vorhangkante oder Tischdecke, die im Wind flattert. **Der Wind ist
der Hauptdarsteller dieser Szene** — er macht das Bild lebendig und beweist, dass der Moment echt ist.
Hintergrund: Meer und Horizont, weich, überstrahlt.
Menschen: **nur eine Hand**, die bei ca. 00:21 ins Bild kommt und die Tasse anhebt. Kein Gesicht.
Kein Arm bis zur Schulter. Nur eine Hand — die kann jede Hand sein. Sie kann ihre Hand sein.

**Brennweite**
50 mm, f/1.8. Die klassische Erzählbrennweite, nah am menschlichen Sehen. Offene Blende für die
weiche Trennung von Vorder- und Hintergrund. Bokeh am Meer soll rund und ruhig sein, nicht nervös.

**Licht**
Morgens, ca. 08:15 Uhr. Weiches Gegenlicht von schräg rechts hinten. Der Dampf über dem Kaffee
wird vom Gegenlicht erfasst und leuchtet — das ist der teuerste Effekt im ganzen Film und kostet
nichts. Ein zarter Lens-Flare an der rechten Bildkante, aber dezent: kein Anamorphic-Streifen quer
durchs Bild, nur ein warmer Halo. Farbtemperatur ca. 5200 K, in der Nachbearbeitung auf 5600 K
gezogen für zusätzliche Wärme.

**Stimmung**
Geborgenheit. Der Film hört hier auf, ein Reisefilm zu sein, und wird zu einer Erinnerung an
etwas, das noch nicht passiert ist. Wichtig: **Diese Szene darf nicht schön sein wollen.**
Sie muss beiläufig wirken.

**Musik**
**Hier kommt zum ersten Mal die Melodie.** Ein einfaches Klaviermotiv, vier bis fünf Töne,
absteigend. Nichts Virtuoses — es muss sich merken lassen, nachdem man es einmal gehört hat.
Referenz: Ludovico Einaudi, „Experience" (aber nur die ersten acht Takte, ohne die Steigerung)
oder Ólafur Arnalds, „Near Light".
Der Kick aus Szene 03 tritt zurück (−6 dB) und atmet.

**Sounddesign**
- Kaffee wird eingeschenkt (setzt schon 0,3 s vor dem Bildschnitt ein, siehe Szene 03)
- Porzellan auf Holz: ein einzelnes, klares Klicken bei 00:21, synchron zur Hand
- Wind in Leinenstoff — nah mikrofoniert, das flatternde Detail ist deutlich hörbar
- Meeresrauschen jetzt **weit entfernt**, nur noch als Fläche im Hintergrund
- Zikaden, ganz leise, aus dem Trockenen rechts
- Ein einzelner Vogel, kurz, unaufdringlich
- **Kein** Geschirrklappern, keine Stimmen, kein Café-Ambiente. Sie sind allein.

**Übergang**
Rein: harter Schnitt (Ton führt).
Raus: **Whip-Pan-Transition.** Die Kamera zieht am Ende von Szene 04 minimal nach rechts an
(Beschleunigung in den letzten 6 Frames), Szene 05a beginnt mit einer identischen
Rechtsbewegung, die abbremst. Dazwischen 3 Frames Bewegungsunschärfe.
Alternativ und weniger riskant: **Dip-to-Warm-White** über 0,25 s.

**Texteinblendung**
Optional, nur wenn der Film sonst zu wortlos wirkt:
```
Slow mornings.
```
- Einsatz 00:19,4, Ausblendung 00:23,0
- Position: linksbündig, im unteren linken Sechstel, mit großzügigem Rand (ca. 8 % Bildbreite)
- Gleiche Typo wie Szene 01, aber kleiner: 28 pt bei 4K, Deckkraft 75 %
- **Empfehlung: weglassen.** Der Film ist stärker, wenn zwischen Sekunde 5 und 45 kein einziges
  Wort fällt. Dann treffen die letzten drei Zeilen umso härter.

**KI-Prompt**
```
Slow lateral dolly right across a breakfast table on a Greek terrace overlooking the sea.
Foreground left, out of focus: a ceramic coffee cup with visible steam, fresh bread, honey,
a fig on a weathered wooden table. Mid-ground: a linen curtain edge fluttering in the wind.
Background: soft, overexposed sea and horizon. At the midpoint, a single human hand enters
the frame and lifts the coffee cup. No face visible, no full arm, only the hand.
Rack focus from the steam in the foreground to the sea in the background.
50mm lens, f/1.8, shallow depth of field, round calm bokeh. Warm soft backlight, 8:15am,
sun from back right, the steam is rim-lit and glowing, gentle warm lens flare at the right
edge. 5600K, cinematic, photorealistic, intimate, unstaged, slightly messy table.
Subtle film grain, 24fps.
```

---

### SZENE 05 — „Golden Hour" · 00:25 – 00:35

Drei Mikroshots. Der wärmste Teil des Films.

---

#### 05a — Assos · 00:25 – 00:28,5

**Kamerabewegung**
Drohne, langsamer **seitlicher Orbit nach links** um die Halbinsel von Assos, ca. 80 m Höhe,
Neigung −20°. Sehr langsam, ca. 3 m/s. Die Bewegung soll wie ein Atemzug wirken, nicht wie ein Flug.

**Bildaufbau**
Die Landzunge von Assos liegt als geschwungene Form in der unteren Bildhälfte. Die pastellfarbenen
Häuser (ocker, terrakotta, weiß) bilden einen warmen Farbtupfer gegen das tiefblaue Wasser.
Zypressen als vertikale dunkle Akzente. Der Horizont liegt auf der oberen Drittellinie, die Sonne
außerhalb des Bildes rechts — nur ihr Licht ist im Bild, nicht sie selbst.

**Brennweite** 35 mm, f/4

**Licht**
Ende September: Sonnenuntergang gegen 19:15–19:25 Uhr Ortszeit. Dieser Shot entsteht um ca.
18:40 Uhr, also gut 35 Minuten davor. Extrem langes, warmes Streiflicht von rechts, ca. 3200 K.
Die Ostseiten der Häuser liegen in kühlem blauem Schatten — dieser Kontrast zwischen 3200 K Licht
und 7000 K Schatten ist der ganze Reiz des Bildes.

**Stimmung** Wärme, Ankommen, das Gefühl von „hier könnte man bleiben".

---

#### 05b — Fiskardo, das Lachen · 00:28,5 – 00:32

**Der wichtigste Shot des Films.**

**Kamerabewegung**
Handkamera, aber ruhig — leichte, organische Mikrobewegung, wie von jemandem, der einfach
danebensteht. **Kein Gimbal-Look.** Diese eine Szene darf und soll technisch unperfekt sein.
Sehr sanfter Push-In, ca. 3 %.

**Bildaufbau**
Halbnah, zwei Personen am Hafen von Fiskardo, im **Gegenlicht**. Sie sind zu 80 % Silhouette,
nur die Konturen sind vom Sonnenlicht gezeichnet (Rim Light). Eine Person wirft im Lachen den Kopf
leicht zurück. Die Gesichter sind durch das Gegenlicht **nicht identifizierbar** — das ist
dramaturgisch gewollt (jeder kann sich hineinprojizieren) und technisch klug (KI-Modelle scheitern
an Gesichtern, nicht an Silhouetten).
Im Hintergrund unscharf: Segelbootmasten, die bunten Hafenhäuser von Fiskardo, Lichterketten,
die gerade eingeschaltet werden.
Zeitlupe: 60 % — schnell genug, dass es echt bleibt, langsam genug, dass es sich wie Erinnerung anfühlt.

**Brennweite**
85 mm, f/2.0. Die Telebrennweite komprimiert den Hintergrund und lässt die Lichterketten zu großen,
weichen Bokeh-Kreisen zerfließen. **Das ist der Shot, der teuer aussieht.**

**Licht**
Direktes Gegenlicht, Sonne knapp über dem Horizont, ca. 18:55 Uhr. Starker Halo um die Haare.
Gewollter Kontrastverlust im unteren Bilddrittel (Veiling Flare) — das Bild „verwäscht" leicht.
Kein Aufheller von vorn. Die Gesichter dürfen ruhig fast schwarz sein.

**Stimmung**
Der Kern der ganzen Botschaft: **Es geht nicht um Kefalonia. Es geht um uns beide, an einem Ort,
an dem nichts von uns verlangt wird.**

---

#### 05c — Die Gläser · 00:32 – 00:35

**Kamerabewegung**
Statisch, Kamera auf Tischhöhe. Nur ein extrem langsamer Push-In (2 %). Nach der Handkamera von
05b wirkt diese Ruhe wie ein Ausatmen.

**Bildaufbau**
Zwei Weißweingläser in Nahaufnahme, leicht beschlagen, im Anschnitt vom rechten Bildrand.
Dahinter, unscharf, das Meer und der Sonnenuntergang. Die Gläser werden bei 00:33,4 aneinander
geführt und berühren sich — **ohne Gesichter, ohne Arme im Bild**, nur die Gläser und zwei Hände.
Das Sonnenlicht bricht durch den Wein und wirft einen warmen Lichtfleck auf die Tischplatte.
Das ist das Bild, das sie sich merken wird.

**Brennweite** 85 mm Makro-nah, f/2.2. Extrem flache Schärfeebene — nur der Kontaktpunkt der
beiden Gläser ist wirklich scharf.

**Licht** Direktes tiefstehendes Sonnenlicht von hinten links, das durch das Glas gebrochen wird.

**Stimmung** Ein Versprechen ohne Worte.

---

**Musik (für 05a–05c durchgehend)**
Die Steigerung. Das Klaviermotiv aus Szene 04 wird von warmen Streichern verdoppelt, ein weicher
Bass kommt hinzu, und der Kick wird deutlicher (aber nie hart). Ab 00:31 baut sich die Spannung
merklich auf — ein langer Streicher-Swell, der auf 00:35 zuläuft.
Referenz: ODESZA, „A Moment Apart" · Ben Böhmer, „After Earth" · Hans Zimmer, „Time" in der
zurückhaltenden Version.
**Wichtig:** Der Swell endet bei exakt 00:35,0 — genau dort, wo der Schnellschnitt einsetzt.

**Sounddesign (05a–05c)**
- 05a: Wind aus der Höhe, sehr breit. Ganz entfernt Kirchenglocken (2–3 Schläge, tief, unaufdringlich).
- 05b: **Das Lachen ist der lauteste diegetische Ton des ganzen Films** (−14 dB), aber leicht
  verhallt, wie in der Erinnerung. Dazu Hafengeräusche: leises Klopfen von Tauwerk gegen Masten,
  Wasser gegen Bootsrümpfe, gedämpfte Stimmen aus einer Taverne, Besteck auf Tellern.
- 05c: Ein einzelnes, klares **Klingen der Gläser** bei 00:33,4 — hell, mit langem Ausklang, und
  bewusst 2 dB lauter gemischt als alles andere in dieser Sekunde. Es soll fast wie ein Musikton
  wirken. Dazu erste Grillen, Blätter im Wind.

**Übergänge**
05a → 05b: harter Schnitt auf einen Betonungspunkt der Musik
05b → 05c: **Speed-Ramp-Blend** — 05b läuft die letzten 8 Frames aus 60 % auf 100 % Geschwindigkeit
hoch, mit 4 Frames Überblendung in 05c
05c → 06: **Flash-Cut**, 2 Frames Weiß, exakt auf den Musikeinsatz von 00:35,0

**Texteinblendung**
Keine.

**KI-Prompt (05a)**
```
Slow aerial orbit moving left around the Assos peninsula, Kefalonia, Greece, 80 meters
altitude, camera tilted down 20 degrees, very slow 3 m/s movement. The curved peninsula
sits in the lower half of the frame, pastel ochre and terracotta houses catching warm
light, dark cypress trees as vertical accents, deep blue water. Horizon on the upper third
line, sun outside the frame to the right. Golden hour 35 minutes before sunset, long warm
3200K raking light from the right, cool blue 7000K shadows on the east-facing walls.
Cinematic, photorealistic, aerial cinematography, warm and serene, subtle film grain, 24fps.
```

**KI-Prompt (05b)**
```
Handheld medium shot, subtle organic camera movement, not gimbal-smooth. Two people
standing at the harbour of Fiskardo, Kefalonia, strongly backlit by the low sun. They are
mostly silhouettes with bright rim light on their hair and shoulders, faces not
identifiable. One of them laughs and tilts their head slightly back. Background out of
focus: sailboat masts, colorful harbour houses, string lights just switching on, rendering
as large soft bokeh circles. 85mm lens, f/2.0, compressed background. Direct backlight,
sun just above the horizon at 18:55, strong halo, veiling flare washing out the lower
third. Slow motion at 60 percent. Cinematic, photorealistic, warm golden hour, intimate,
candid, subtle film grain, 24fps.
```

**KI-Prompt (05c)**
```
Static macro close-up at table height, extremely slow 2 percent push-in. Two glasses of
white wine, lightly fogged with condensation, framed from the right edge. The glasses are
brought together and touch. Only two hands visible, no faces, no arms. Behind them,
completely out of focus, the sea and the setting sun. Low golden sunlight from back left
refracts through the wine and casts a warm light patch on the wooden table. 85mm lens,
f/2.2, razor-thin depth of field, only the contact point of the glasses is sharp.
Cinematic, photorealistic, warm, intimate, subtle film grain, 24fps.
```

---

### SZENE 06 — „Der Sog" · 00:35 – 00:45

Sechs Shots in zehn Sekunden. Jeder zwischen 1,2 und 2,0 Sekunden. **Auf den Beat geschnitten.**

| # | Timecode | Bild | Kamera | Brennweite |
|---|---|---|---|---|
| 06a | 00:35,0–00:36,6 | Bug eines Bootes durchschneidet türkises Wasser | Statisch von oben, senkrecht | 24 mm, f/5.6 |
| 06b | 00:36,6–00:38,2 | Klippenwand, Springer fällt ins Wasser (klein im Bild) | Statisch, Totale | 50 mm, f/4 |
| 06c | 00:38,2–00:40,0 | Füße laufen durch flaches Wasser, Wasser spritzt | Tief, Kamera folgt, Zeitlupe 50 % | 35 mm, f/2.8 |
| 06d | 00:40,0–00:41,8 | Leerer Kiesstrand, letztes Licht, lange Schatten | Langsamer Push-In | 35 mm, f/2.8 |
| 06e | 00:41,8–00:43,4 | Sonne berührt den Horizont, Meer als flüssiges Gold | Statisch, Tele | 200 mm, f/8 |
| 06f | 00:43,4–00:45,0 | Sternenhimmel / Milchstraße über einer Klippensilhouette | Sehr langsamer Timelapse-Schwenk | 20 mm, f/1.4 |

**Bildaufbau (Prinzip)**
Jeder Shot hat **genau ein** dominantes Element und keine sekundäre Information. Bei dieser
Schnittgeschwindigkeit kann das Auge nur eine Sache pro Bild aufnehmen. Alles andere ist Ballast.
Bewusster Wechsel der Bildkomposition von Shot zu Shot: zentriert → links → Bewegung nach rechts
→ zentriert → Horizontlinie → vertikal. Dieser Rhythmus im Bildaufbau erzeugt das Rauschgefühl.

**Licht (Verlauf über die 10 Sekunden)**
06a–06c: helles Nachmittagslicht, ca. 5600 K
06d–06e: Sonnenuntergang, 2800–3200 K
06f: Nacht, 4000 K bläulich, nur Sternenlicht
**Der Lichtverlauf erzählt hier den ganzen Tag in zehn Sekunden.** Das ist der eigentliche Inhalt
der Sequenz — nicht die einzelnen Orte.

**Stimmung**
Herzschlag. Zu schnell, um festzuhalten. Genau so fühlt sich eine Woche an, wenn sie vorbei ist.
Das ist der Grund, warum diese Sequenz funktioniert: Sie simuliert das Gefühl der Erinnerung.

**Musik**
Der Höhepunkt. Voller Beat, Bass, Streicher, das Klaviermotiv jetzt in voller Oktavierung.
Bei 00:43,4 (Übergang zum Sternenhimmel): **plötzlicher Filter-Sweep** — ein Tiefpassfilter fährt
über 1,2 s alles über 500 Hz herunter, gleichzeitig läuft ein Reverse-Cymbal-Swell hoch.
Bei 00:45,0 ist die Musik **vollständig weg**. Kein Ausblenden — ein Abriss.
Referenz für diesen Moment: das Ende des Intros von „Sicko Mode" auf null gedreht, oder besser:
ODESZA, „Line of Sight", der Break bei 2:14.

**Sounddesign**
- Jeder Schnitt bekommt einen eigenen kurzen, trockenen Ton: Wasserrauschen (06a), Platsch (06b),
  Schritte im Wasser (06c), Wind (06d), Stille (06e), Grillen (06f)
- Diese Töne sind **kurz und hart geschnitten**, keine Überblendungen. Das erzeugt den Puls.
- Bei 06f: Grillen setzen als dichter Teppich ein, dazu ein einzelner ferner Hund, Blätter im
  Nachtwind. Die Nacht ist voller als der Tag.
- Bei 00:45,0: **Alles außer dem Meeresrauschen wird abgeschnitten.**

**Übergänge**
Ausschließlich harte Schnitte, jeweils exakt auf einen Beat.
Ausnahme: 06e → 06f ist ein **Dissolve über 12 Frames** — der einzige weiche Übergang der Sequenz,
und dadurch wirkt der Sprung von Tag zu Nacht wie ein Einschlafen.

**Texteinblendung**
Keine.

**KI-Prompts (Kurzform, ein Prompt pro Shot)**
```
06a: Top-down static shot, the bow of a small boat cutting through brilliant turquoise
     water, white wake spreading. 24mm, f/5.6, bright afternoon sun, high contrast.
     Cinematic, photorealistic, 24fps.

06b: Wide static shot of a white limestone cliff in Kefalonia, a small distant figure
     falls through the air toward the deep blue water below. The figure is tiny in the
     frame. 50mm, f/4, bright afternoon light. Cinematic, photorealistic, 24fps.

06c: Low camera following bare feet running through shallow turquoise water, water
     splashing, sunlight catching the droplets. Slow motion 50 percent. 35mm, f/2.8,
     late afternoon light. No faces. Cinematic, photorealistic, 24fps.

06d: Slow push-in across an empty white pebble beach in Kefalonia at sunset, long shadows,
     no people, calm water at the edge of the frame. 35mm, f/2.8, warm 3000K light.
     Cinematic, photorealistic, 24fps.

06e: Static telephoto shot of the sun touching the horizon over the sea, the water turning
     into liquid gold, heavy atmospheric compression. 200mm, f/8, 2800K.
     Cinematic, photorealistic, 24fps.

06f: Very slow timelapse pan of the Milky Way over the silhouette of a coastal cliff in
     Kefalonia, thousands of stars, no light pollution, deep blue night sky. 20mm, f/1.4.
     Cinematic, photorealistic astrophotography timelapse, 24fps.
```

---

### SZENE 07 — „Die Frage" · 00:45 – 01:00

Fünfzehn Sekunden fast schwarzes Bild. Das ist mutig, und genau deshalb funktioniert es.

**Kamerabewegung**
Keine. Absolut statisches Schwarz.
Optional, sehr subtil: ein kaum sichtbarer Rest der Wasseroberfläche aus Szene 01 bei 6 %
Deckkraft im unteren Bildviertel — man weiß nicht, ob man es sieht oder sich einbildet.

**Bildaufbau**
Reines Schwarz (`#000000` für den Hintergrund, kein Lift hier — der Kontrast zum Rest des Films
ist beabsichtigt). Der Text steht exakt zentriert. Kein anderes Element im Bild.

**Brennweite / Licht**
Entfällt.

**Stimmung**
Die Stille nach dem Rausch. Der Zuschauer hat gerade zehn Sekunden lang zu viel gesehen und ist
jetzt allein mit dem Nachbild. **In dieser Leere entsteht die Sehnsucht** — nicht in den Bildern
davor. Die Bilder waren nur das Material; hier arbeitet der Kopf des Zuschauers.

**Musik**
Keine. Fünfzehn Sekunden ohne Musik nach einem Höhepunkt sind emotional extrem laut.
**Einzige Ausnahme:** Bei 00:57,5 — zeitgleich mit „Just us." — ein einzelner Klavierton, der
letzte Ton des Motivs aus Szene 04, mit sehr langem Nachhall. Er läuft über den Schnitt hinaus
aus und endet erst bei 01:00,0.
Ein Ton. Mehr braucht es nicht.

**Sounddesign**
- Nur Meeresrauschen — dasselbe wie in Szene 01, aber ungefiltert, weit, ruhig
- Es läuft bis 01:00,0 durch und wird in den letzten 1,5 Sekunden langsam ausgeblendet
- Kein Wind, keine Möwen, keine Grillen. **Der Film kehrt dorthin zurück, wo er begonnen hat.**
  Das ist der Grund, warum sich die ganze Sache rund anfühlt.

**Übergänge**
Rein: harter Schnitt ins Schwarz bei 00:45,0, exakt synchron mit dem Musikabriss.
Zwischen den Textblöcken: Fade-Out über 0,8 s → 1,2 s echtes Schwarz → Fade-In des nächsten
Blocks über 0,8 s. **Diese Pausen sind der wichtigste Teil der Szene.** Wer sie kürzt,
zerstört den Film.
Raus: Schwarz hält 1,5 s nach dem letzten Text.

**Texteinblendungen — exaktes Timing**

| Text | Fade-In | Steht | Fade-Out | Typo |
|---|---|---|---|---|
| `Kefalonia` | 00:47,0 – 00:47,8 | bis 00:50,4 | bis 00:51,2 | 64 pt, Tracking +180, Light, 100 % weiß |
| *(Pause)* | | 00:51,2 – 00:52,4 | | reines Schwarz |
| `End of September?` | 00:52,4 – 00:53,2 | bis 00:55,6 | bis 00:56,4 | 40 pt, Tracking +40, Light, 92 % weiß |
| *(Pause)* | | 00:56,4 – 00:57,5 | | reines Schwarz |
| `Just us.` | 00:57,5 – 00:58,3 | bis 00:59,4 | bis 01:00,0 | 40 pt, Tracking +40, Light, 92 % weiß |

**Typografische Details, die den Unterschied machen:**
- „Kefalonia" bekommt eine deutlich größere Laufweite (+180) als die anderen Zeilen. Das ist der
  klassische Apple-Keynote-Move: Ein einzelnes Wort, weit gesperrt, zentriert, auf Schwarz.
- Alle drei Zeilen sind auf **derselben vertikalen Achse** zentriert — der Text „springt" nie.
- Jede Zeile skaliert während ihrer Standzeit von 100 % auf 100,6 %. Unsichtbar, aber es hält den
  Blick fest. Ohne diese Bewegung wirkt der Text tot.
- Kein Fett, keine Großbuchstaben, kein Ausrufezeichen. Das Fragezeichen bei „End of September?"
  ist das einzige Satzzeichen mit Gewicht — und es ist eine echte Frage.

**Warum diese Reihenfolge funktioniert:**
`Kefalonia` gibt dem Gefühl einen Namen. `End of September?` macht es zu einem Datum, also zu
etwas Möglichem. `Just us.` nimmt dem Ganzen jeden Reisecharakter und macht es zu einer Aussage
über die Beziehung. Die letzte Zeile ist der Grund, warum sie Ja sagt — nicht Myrtos Beach.

---

## 3. Musik — Empfehlungen

### Der Aufbau, den der Film braucht

| Abschnitt | Zeit | Was passiert musikalisch |
|---|---|---|
| Stille | 0:00–0:05 | Nichts. Nur ein Sub-Bass bei 0:04,6 |
| Fläche | 0:05–0:12 | Klavieranschlag + Streicher-Pad, kein Rhythmus, 72 BPM |
| Puls | 0:12–0:18 | Weicher Kick + Arpeggio |
| Melodie | 0:18–0:25 | Klaviermotiv, 4–5 Töne, absteigend |
| Steigerung | 0:25–0:35 | Streicher verdoppeln die Melodie, Bass kommt, Swell auf 0:35 |
| Höhepunkt | 0:35–0:43,4 | Voller Beat, Oktavierung |
| Abriss | 0:43,4–0:45 | Filter-Sweep + Reverse-Swell → Stille |
| Nachhall | 0:57,5–1:00 | Ein einzelner Klavierton |

**Kritisch:** Der Track muss bei **exakt 0:35** einen Wechsel haben und bei **0:45** enden können.
Wenn kein Track das von Natur aus tut, schneide ihn — lieber ein sauber geschnittener fremder
Track als ein durchlaufender, der nicht sitzt.

### Genres, nach Eignung sortiert

**1. Cinematic Ambient + Emotional Piano (stärkste Empfehlung)**
Ruhig genug für die Intimität von Szene 04, trägt aber die Weite von Szene 02.
Referenzkünstler: Ludovico Einaudi, Ólafur Arnalds, Max Richter („On the Nature of Daylight" —
Vorsicht, sehr verbraucht), Nils Frahm, Joep Beving, Hania Rani.
Risiko: kann bei Szene 06 zu kraftlos werden. Lösung: ab 0:35 einen zweiten Layer dazumischen.

**2. Melodic / Organic House (beste Balance)**
Genau die Mischung aus Weite und Puls, die dieser Film braucht — und der Grund, warum sich
moderne Reisefilme so anfühlen.
Referenzkünstler: **Ben Böhmer** (ideal: „Breathing", „After Earth", „Beyond Beliefs"),
**ODESZA** („A Moment Apart", „Corners of the Earth", „Line of Sight"), Lane 8, Tinlicker,
Nils Hoffmann, Fejká.
**Das ist meine Top-Empfehlung für diesen Film.** Ben Böhmer trifft exakt den Ton: emotional,
aber nie kitschig, mit einem Aufbau, der wie geschaffen ist für 60 Sekunden.

**3. Hans Zimmer Light / Modern Score**
Für Szene 02 und 06 großartig, für Szene 04 zu groß. Nur nehmen, wenn du den Film eher
episch als intim willst — was hier vermutlich der falsche Weg wäre.
Referenz: „Time" (Inception), „Day One" (Interstellar), Ludwig Göransson, Jóhann Jóhannsson.

**4. Soft Indie / Folk**
Wärmer und persönlicher, aber weniger cinematic. Funktioniert nur ohne Gesang — sobald jemand
singt, konkurriert der Text mit deinen Texteinblendungen.
Referenz: Bon Iver (instrumentale Passagen), Novo Amor, Sylvan Esso in ruhig.

**5. Chill Electronic / Downtempo**
Solide, aber austauschbar. Nimm es nur als Rückfalloption.

### Wo bekommst du den Track

| Quelle | Vorteil | Hinweis |
|---|---|---|
| **Musicbed** | Beste kuratierte Auswahl für genau diesen Stil | Abo, aber die Qualität rechtfertigt es |
| **Artlist** | Sehr gute Cinematic-Ambient-Sektion, faire Lizenz | Jahresabo |
| **Epidemic Sound** | Größte Auswahl, gute Suche nach Stimmung | Etwas generischer |
| **Uppbeat / Pixabay** | Kostenlos | Deutlich hörbar kostenlos. Für einen persönlichen Film okay. |
| **Suno / Udio** | Track exakt auf deine 60 Sekunden komponieren | Sehr stark geworden. Prompt-Vorschlag unten. |

**Prompt-Vorschlag für eine KI-Komposition:**
```
Cinematic melodic house instrumental, 72 BPM, key of D major. Starts with a single deep
piano note and warm string pad, no drums for 12 seconds. A soft filtered kick enters
gently, joined by a plucked rhodes arpeggio. At 18 seconds a simple descending 5-note
piano melody begins. From 25 seconds strings double the melody and a warm sub bass enters,
building to a swell at 35 seconds. Full arrangement from 35 to 43 seconds, then a low-pass
filter sweep and reverse cymbal into complete silence at 45 seconds. Emotional, spacious,
nostalgic, never cheesy. In the style of Ben Böhmer and ODESZA. No vocals.
```

---

## 4. Sounddesign

Sounddesign ist bei einem KI-generierten Film **wichtiger als das Bild**. Es ist der Grund,
warum der Zuschauer glaubt, was er sieht. Rechne mit mehr Zeit für den Ton als für die Bilder.

### Die vier Ebenen

**Ebene 1 — Basisatmosphäre (läuft durchgehend, −28 dB)**
Ein einziges, langes Meeresrauschen-File über den ganzen Film. Es ändert nur seinen Filter und
seine Stereobreite. Diese durchlaufende Ebene ist der Klebstoff, der aus sieben KI-Clips einen
Film macht.

**Ebene 2 — Ortsatmosphäre (pro Szene, −24 bis −20 dB)**
Wind, Möwen, Zikaden, Hafen, Grillen. Wechselt mit jeder Szene, überblendet immer 0,5 s vor
dem Bildschnitt.

**Ebene 3 — Detailtöne (punktuell, −18 bis −14 dB)**
Die Töne, die man bewusst hört: Kaffee, Porzellan, Gläser, Schritte, das Lachen.
**Maximal ein Detailton pro Szene.** Zwei sind schon zu viel.

**Ebene 4 — Musik (−14 LUFS)**

### Konkrete Soundeffekte, nach Szene

| Szene | Sounds | Quelle |
|---|---|---|
| 01 | Wellen (gefiltert), eine brechende Welle mit Kiesauslauf, eine ferne Möwe | Freesound, Epidemic Sound |
| 02 | Weites Meer, Wind (breit), 2–3 Möwen im Panorama, ferner Bootsmotor | BOOM Library „Coastal" |
| 03 | Wasser am Bootsrumpf, gedämpfter Motor, Unterwasser-Blubbern | A Sound Effect „Underwater" |
| 04 | Kaffee einschenken, Porzellan auf Holz, Wind in Leinen, Zikaden, ein Vogel | Freesound |
| 05 | Höhenwind, ferne Kirchenglocken, Tauwerk an Masten, Taverne, Lachen, Gläserklingen | Epidemic Sound |
| 06 | Bugwelle, Platsch, Schritte im Wasser, Wind, Grillen, ferner Hund | Boom Library |
| 07 | Nur Wellen, ungefiltert, weit | dasselbe File wie Szene 01 |

### Fünf Regeln, die den Unterschied machen

1. **Ton führt Bild.** Setze den Ton der nächsten Szene 0,2–0,4 s vor dem Bildschnitt ein.
   Das ist der einzige Trick, der aus geschnittenen Clips einen Film macht.
2. **Möwen sparsam.** Maximal vier Rufe im ganzen Film. Mehr klingt nach Klischee-Bibliothek.
3. **Kein Drohnengeräusch.** Nie. Auch nicht leise.
4. **Stereobreite als Erzählmittel.** Weite Shots = breit (Stereo 100 %), intime Shots = schmal
   (Stereo 40 %). Der Zuschauer merkt es nicht bewusst, spürt es aber sofort.
5. **Nutze die Stille.** Die stärksten Momente dieses Films sind 0:00–0:01,2 und 0:45–0:47.
   Widerstehe dem Impuls, sie zu füllen.

---

## 5. KI-Tools

### Empfehlung nach Aufgabe

| Aufgabe | Erste Wahl | Alternative | Warum |
|---|---|---|---|
| **Drohnen-Shots** (02, 05a) | **Google Veo** | Luma Ray | Veo hält Horizonte gerade und erfindet keine Architektur dazu. Die größte Schwäche anderer Modelle bei Luftaufnahmen. |
| **Wasser & Wellen** (01, 03, 06a) | **Kling** | Veo | Kling hat die bislang beste Wasserphysik — Gischt, Brechung, Schaum. |
| **Unterwasser / Caustics** (03b) | **Kling** | Runway | Lichtnetze im Wasser sind physikalisch komplex; Kling schafft sie am überzeugendsten. |
| **Intime Detailshots** (04, 05c) | **Runway Gen-4** | Veo | Runway ist am besten bei kontrollierter Kamerabewegung und flacher Schärfentiefe. |
| **Menschen / Lachen** (05b) | **Veo** | Kling | Beide scheitern an Gesichtern. Deshalb: Gegenlicht-Silhouette. Siehe Abschnitt 6. |
| **Präzise Kamerabewegungen** | **Higgsfield** | — | Higgsfield hat vordefinierte Kamerabewegungen (Dolly, Crane, Whip-Pan, Push-In) als Presets. Genau dafür ist es gebaut. |
| **Nachtaufnahmen / Sterne** (06f) | **Luma Dream Machine** | Veo | Luma ist bei dunklen Szenen am rauschärmsten. |
| **Nativer Ton** | **Veo** | — | Veo generiert Audio mit. Als Grundlage brauchbar, aber ersetze es durch echte Soundbibliotheken — der KI-Ton klingt in ruhigen Szenen synthetisch. |
| **Musik** | **Suno** | Udio, Musicbed | Siehe Prompt in Abschnitt 3. |
| **Upscaling auf 4K** | **Topaz Video AI** | Magnific | Fast alle Modelle liefern unter 4K. Topaz ist hier Standard. |
| **Schnitt & Grading** | **DaVinci Resolve** (kostenlos) | Premiere Pro | Resolve ist beim Color Grading überlegen und kostet nichts. |

### Realistischer Produktionsplan

**Schritt 1 — Ton zuerst (2–3 h)**
Baue die Tonspur, bevor du ein einziges Bild generierst. Musik auswählen, auf 60 Sekunden
schneiden, Schnittpunkte markieren. **Der Film wird nach der Musik geschnitten, nicht umgekehrt.**
Wenn du zuerst Bilder machst, passt nachher nichts.

**Schritt 2 — Generieren (6–10 h)**
Rechne mit **6 bis 10 Versuchen pro brauchbarem Shot.** Das ist normal, kein Zeichen für einen
schlechten Prompt. Bei 12 Shots sind das 70–120 Generierungen. Plane das Budget entsprechend.
Generiere jeden Shot 2 Sekunden länger als gebraucht — du brauchst Spielraum für den Schnitt.

**Schritt 3 — Auswahl (1 h)**
Sortiere gnadenlos. Ein Shot mit einem sichtbaren Artefakt ruiniert den ganzen Film, weil der
Zuschauer ab dann nach Fehlern sucht. Lieber einen Shot ersetzen als einen halbguten behalten.

**Schritt 4 — Schnitt (3–4 h)**
Zuerst der grobe Rhythmus auf die Musik, dann die Feinheiten. Die Übergänge zuletzt.

**Schritt 5 — Grading (2 h)**
Ein einziges LUT über alle Shots, danach pro Shot nachjustieren. Der Grad ist das, was die
unterschiedlichen KI-Modelle optisch zusammenbindet — ohne ihn sieht man jeden Modellwechsel.

**Schritt 6 — Sounddesign (3–4 h)**
Die vier Ebenen aus Abschnitt 4. Nimm dir hierfür wirklich Zeit.

**Schritt 7 — Korn, Vignette, Export (1 h)**
Korn ganz zum Schluss, über alles. Dann 16:9 und 9:16 exportieren.

**Gesamtaufwand: realistisch 18–25 Stunden.** Wer sagt, das geht in drei, hat es nicht gemacht.

---

## 6. Was schiefgeht — und wie du es vermeidest

**Gesichter.** Das größte Risiko. KI-Modelle erzeugen bei Nahaufnahmen unheimliche Gesichter, und
ein einziges davon zerstört die emotionale Wirkung sofort. **Lösung, konsequent durchgezogen:**
In diesem Storyboard gibt es kein einziges erkennbares Gesicht. Nur Hände (04, 05c),
Gegenlicht-Silhouetten (05b), Füße (06c) und eine winzige Figur (06b). Das ist kein Kompromiss,
sondern eine bessere Regie-Entscheidung — sie lässt Raum für Projektion.

**Hände.** Zweitgrößtes Risiko. Bei Szene 04 und 05c sind Hände im Bild. Halte sie **teilweise
verdeckt** (durch die Tasse, durch das Glas) und in Bewegung — statische, voll sichtbare Hände
sind der klassische Fehlerfall. Generiere diese beiden Shots doppelt so oft wie die anderen.

**Text im Bild.** KI-Modelle erfinden Schrift auf Schildern, Booten und Hauswänden — meistens
unleserlichen Buchstabensalat. Schreibe in jeden Prompt `no text, no signage, no lettering`.

**Der Horizont.** Bei Drohnenaufnahmen kippt oder krümmt der Horizont häufig. In Resolve mit dem
Lens-Distortion-Werkzeug korrigierbar, aber besser gleich `perfectly level horizon,
no fisheye distortion` in den Prompt schreiben und aussortieren, was schief ist.

**Morphing.** Bei Clips über 5 Sekunden fangen KI-Modelle an, Objekte ineinander zu verwandeln.
**Lösung:** Generiere nie länger als 5 Sekunden am Stück. Szene 02 (7 s) besteht deshalb aus zwei
Generierungen, die über eine gemeinsame Bewegung zusammengeschnitten werden.

**Uneinheitlicher Look.** Vier verschiedene Modelle liefern vier verschiedene Bildästhetiken.
**Lösung:** dieselben Formulierungen in *jedem* Prompt (`cinematic, photorealistic, teal and amber
color grade, subtle film grain, 24fps`), plus ein gemeinsames LUT am Ende, plus Korn über alles.

### Universeller Negative Prompt

Hänge das an jeden einzelnen Prompt an:
```
no text, no signage, no lettering, no watermark, no logo, no crowds, no tourists,
no umbrellas, no plastic chairs, no modern hotels, no cars, no distorted faces,
no deformed hands, no extra fingers, no warped horizon, no fisheye distortion,
no oversaturation, no HDR look, no lens dirt, no camera shake, no speed ramping,
no slow zoom artifacts, no morphing objects
```

---

## 7. Die drei Dinge, auf die es wirklich ankommt

Wenn du alles andere aus diesem Dokument vergisst — diese drei entscheiden über die Wirkung:

**1. Die Stille bei 0:45–0:47.**
Zwei Sekunden schwarzes Bild mit nichts als Meeresrauschen, direkt nach dem musikalischen
Höhepunkt. Das ist der Moment, in dem der Film aufhört, ein Video zu sein, und zu einer Frage
wird. Jeder Instinkt wird dir sagen, diese Lücke zu füllen. Tu es nicht.

**2. „Just us."**
Nicht Myrtos Beach überzeugt sie. Nicht die Drohne. Diese zwei Wörter. Der ganze Film davor
existiert nur, um diesen letzten Zeilen genug Gewicht zu geben. Deshalb steht sie am Ende,
allein, mit einem einzigen Klavierton.

**3. Kein einziges Wort zwischen Sekunde 5 und 45.**
Vierzig Sekunden ohne Text. Keine Ortsnamen, keine Untertitel, keine Erklärung. Der Film
behauptet nichts — er zeigt nur. Und genau deshalb glaubt man ihm.

---

*Wenn sie nach dem Ende zwei Sekunden nichts sagt, hat der Film funktioniert.*
