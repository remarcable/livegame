# Wer besiegt Paul? Livespiel

## Über dieses Projekt

Dieses Repository enthält den Code für die Secondscreen-App, bei dem Zuschauer von Wer besiegt Paul? mit ihrem Smartphone mittippen können.

## Wie man das Projekt zum Laufen bekommt

### Über die Kommandozeile (cmd oder Terminal)

```
$ git clone https://github.com/wbp-dev/livegame.git
$ cd livegame
$ meteor npm install
$ meteor
```

### Über Github Desktop

1.  Plus-Button (+) klicken, 'Clone' auswählen
2.  Unter wbp-dev nach livegame suchen, auswählen
3.  Auf 'Clone livegame' klicken, bestätigen
4.  Mit der Kommandozeile zum Ordner navigieren, dependencies installieren und Meteor starten:

```
$ cd ./PFAD/ZU/livegame
$ meteor npm install
$ meteor
```

Stelle sicher, dass alle Webfonts, die in `client/main.css` definiert sind auch lokal vorhanden sind.

## Tests

- `npm test` startet `jest --watch` und führt alle Tests der Form `*.test.js` aus
- `npm test:meteor` startet Meteor im Testmode und führt alle Tests in `/imports/testing/clientTests.js` und `/imports/testing/serverTests.js` aus. Damit die Testfiles nicht von jest geladen werden, haben sie den Namen `*.tests.js`

## Neue Interaction hinzufügen

Erstelle dafür neue Einträge in folgenden Orten. Für die Interaktionen mit Implementation kannst du die bereits existierenden Interaktionen als Startpunkt nehmen

- `imports/api/interactions/types/index.js` + Implementation
- `imports/api/helpers/getTextForInteraction.js`
- `imports/ui/components/InteractionIcon/index.js`
- `imports/ui/Pages/LiveGame/Interactions/index.js` + Implementation
- Zusätzlich eventuell noch ein Admininterface zur Steuerung während der Show und eine Liveview-Ansicht

## Mitentwickeln

Bitte bei der Entwicklung auf folgende Dinge achten:

- Die Entwicklung von Features erfolgt **[immer in Branches](https://guides.github.com/introduction/flow/index.html)**. Sobald etwas fertiggestellt wurde, kann ein Pull Request erstellt werden, damit sich andere den [Code ansehen können](https://www.sitepoint.com/the-importance-of-code-reviews/).
- Sauberer Code (Clean Code) hat oberste Priorität. Der Code ist lesbar und leicht verständlich.
- Wir folgen dem [AirBnB Styleguide](https://github.com/airbnb/javascript).
- Ein Programm kann dabei helfen, diesen Styleguide zu befolgen. Es gibt dafür sogenannte _Linter_ wie [eslint](http://eslint.org/).
- Ich empfehle zur Entwicklung den Code-Editor [Atom](https://atom.io/). Er sieht hübsch aus und kann automatisch auf den Code Style achten.
- Commit Messages [sollten einfach verständlich sein](http://chris.beams.io/posts/git-commit/#seven-rules)

## Weitere Ressourcen

- [Meteor Guide](https://guide.meteor.com) - Artikel zu einzelnen Aspekten bezüglich Meteor
- Speziell zu Code Style findet man im Meteor Guide [eine ganze Menge](https://guide.meteor.com/code-style.html)
- [Meteor API Reference](http://docs.meteor.com/), definitiv einen Blick wert!
- Meteor hat einen eigenen [Package Manager](https://atmospherejs.com/)
- [...]
