# newrelic-day-night-cycle

### Description

This app is designed to change application policies on newrelic.

E.g.
prod-gold-day <--> prod-gold-night
prod-silver-day <--> prod-silver-night

### Endpoints

/ping
- Used to check application health

/policies?api-key=12345
- Send through your api key for your newrelic account and get back a list of active policies.

### Scripts

bin/day-to-night
- A script to change gold-day and silver-day to the night equivalents

bin/night-to-day
- A script to change gold-night and silver-night to the day equivalents

### Setup

```
npm install
npm start
```

### Testing

```
npm test
```

Tests still need to be written.

### Deployment

Not yet confirmed.
