Shippify for Node.JS
===
This library allows you to quickly use Shippify API with NodeJS

---
## Usage
### Installing
`npm install shippify-node -S`

### Initialize
Initialize the library:
```javascript
import shippify from 'shippify-node'

shippify.initialize('api_key', 'api_secret')
```

### Getting a quote from Shippify
```javascript
// Create a delivery to request a quote
const delivery = new shippify.Delivery()
delivery.addPickup({
  "contact": {
      "name": "John Doe",
      "email": "john@doe.com",
      "phonenumber": "+19209489292"
  },
  "location": {
      "address": "Central Park, New York, NY, United States",
      "instructions": "Central Park West, APT 10920"
  }
})
delivery.addDropoff({
  "contact": {
    "name": "Jane Doe",
    "email": "janedoe@domain.com",
    "phonenumber": "+1 234567890"
  },
  "location": {
      "address": "200 Eastern Pkwy, Brooklyn, NY 11238, USA",
      "instructions": "APT 2094",
      "lat": 40.6720036,
      "lng": -73.9593279
  }
})

delivery.addPackages({
  "name": "roses",
  "size": "xs",
  "qty": 1
})

// Getting the quotes
const quotes = await shippify.quotes([delivery], new Date('2019-07-31 09:00:00'))

// You can access to closest quote by closest
console.log(quotes.closest)
// You can access to all quotes
console.log(quotes.all)
```

### Creating a delivery on Shippify
With quotes we can create a delivery
```javascript
const delivery = new shippify.Delivery() // Delivery created for get quotes
const quote = quotes.closest
const deliveries = await shippify.delivery([delivery], quote.id)
// That's all
```

### Canceling a delivery
```javascript
// Simplily with the id
await shippify.delivery.cancel(id)
```
## API

---
#### TODO
* Add Webhook support
* Add Draft support
* Testing
