import axios from 'axios'
import Delivery from './objects/Delivery'
import Quotes from './objects/Quotes'
import Quote from './objects/Quote'

const setting = {
  key: '',
  secret: '',
  endpoint: 'https://api.shippify.co'
}

const endpoints = {
  'quotes': '/v1/deliveries/quotes',
  'deliveries': '/v1/deliveries',
  'deliveries/complete': '/v1/deliveries/{:id}/complete',
  'deliveries/token': '/v1/deliveries/token/{:id}',
  'deliveries/labels': '/v1/deliveries/{:ids}/labels',
  'deliveries/cancel': '/v1/deliveries/{:id}/cancel',
  'draft': '/v1/deliveries/drafts',
  'webhook': '/hooks/companies/{:company}'
}

function headers () {
  const basic = Buffer.from(`${setting.key}:${setting.secret}`, 'ascii')
  return {
    'Content-Type': 'application/json',
    Authorization: `Basic ${basic.toString('base64')}`
  }
}

function initialize (key, secret, endpoint) {
  setting.key = key
  setting.secret = secret
  setting.endpoint = endpoint || setting.endpoint
}

/* REQUESTs */

const request = {
  get: async (uri, options = {}) => {
    return axios.get(`${setting.endpoint}${uri}`, Object.assign(options, {
      headers: headers()
    }))
  },
  post: async (uri, data, options = {}) => {
    return axios.post(`${setting.endpoint}${uri}`, data, Object.assign(options, {
      headers: headers()
    }))
  }
}

async function quotes (deliveries = [], date = new Date(), options = {}) {
  const opts = Object.assign({
    // date: date.getTime(),
    express: false,
    flexible: true,
    limit: null,
    timeslots: false
  }, options)
  deliveries.map(delivery => {
    if (delivery.pickup) {
      delivery.pickup.date = date
    }
    return delivery
  })
  const quotesResponse = await request.post(endpoints['quotes'], Object.assign({
    deliveries
  }, opts))
  return Quotes.parse(quotesResponse.data)
}

async function deliveries (deliveries, quoteId, metadata = {}, options = {}) {
  const deliveryRequest = Object.assign({
    deliveries,
    quoteId,
    metadata
  }, options)
  const deliveryResponse = await request.post(endpoints['deliveries'], deliveryRequest)
  return deliveryResponse.data.payload
}

deliveries.cancel = async function deliveryCancel (id) {
  const deliveryCancelResponse = await request.post(endpoints['deliveries/cancel'].replace('{:id}', id))
  return deliveryCancelResponse.data
}

deliveries.complete = async function deliveryCancel (id) {
  const deliveryCancelResponse = await request.post(endpoints['deliveries/complete'].replace('{:id}', id))
  return deliveryCancelResponse.data
}

export default {
  initialize,
  quotes,
  deliveries,
  // Objects
  Delivery,
  Quotes,
  Quote
}
