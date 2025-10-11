# Esperi

Esperi is a tarot reading app that offers users the ability to select up to five cards. These cards are sourced from an API and presented alongside a personalized reading.

# Client
#### [Live Site](https://cartomancerssecrets.netlify.app)

## API Reference
### Cards
#### Get all cards
```http
  GET https://tarotapi.dev/api/v1/cards
```

#### Get random card
**Replace $n with desired amount (number)
```http
  GET https://tarotapi.dev/api/v1/cards/random
```

#### Get n random cards
```http
    GET https://tarotapi.dev/api/v1/cards/random?n=$n
```

#### Get all card scans
```http
    GET http://data.totl.net/tarot-rwcs-images/
```

#### Ace of Cups
```http
    GET http://data.totl.net/tarot-rwcs-images/c01.jpg
```

### OpenAI
```
  openai.chat.completetions.create
```


## Color Reference

| Color             | Hex      |
| ----------------- | -------- |
| <span style="background-color:#e1c4ca; padding:5px; color:#000;">Example Color</span> | `#e1c4ca` |
| <span style="background-color:#a57fa0; padding:5px; color:#fff;">Example Color</span> | `#a57fa0` |
| <span style="background-color:#db8aae; padding:5px; color:#000;">Example Color</span> | `#db8aae` |
| <span style="background-color:#b25385; padding:5px; color:#fff;">Example Color</span> | `#b25385` |
| <span style="background-color:#699897; padding:5px; color:#000;">Example Color</span> | `#699897` |




## Run Locally
#### Clone this project
```bash
    git clone https://github.com/jonnicwolf/heart_of_the_cards.git
```
#### then
```bash
    cd heart_of_the_cards/
```
#### then
```bash
    cd client/
```
#### Start localhost
```bash
  npm run dev
```
#### Build
```bash
    npm run build
```


## Fonts
#### Headers
- Bagnard [https://www.1001fonts.com/bagnard-font.html#waterfalls_bagnard_regular_otf]
#### Titles
- Amatic SC Bold [https://fonts.google.com/specimen/Amatic+SC?query=amat]
#### Normal Text
- Bebas Neue [https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap]


## Features
- User authenticated
- AI card interpreter
- Cross platform

## Tech Stack

**Client:** React, Styled-Components, React Motion, p5.js, OpenAI, Firebase Auth, TanStack Query

**Server:** Node, Express, Vercel
# mvp
