import * as _ from 'lodash'
import Quote from './Quote'

const raw = Symbol()
const express = Symbol()
const flex = Symbol()

export default class Quotes {
  constructor (payload) {

    this[raw] = payload.quotes
    this[express] = payload.express
    this[flex] = payload.flex
  }

  get all () {
    return this[raw].map(q => new Quote(q))
  }

  get closest () {
    return new Quote(this[express] || _.first(_.orderBy(this[raw], ['dropoffStartTime'], ['asc'])))
  }

  get furthest () {
    return new Quote(_.last(_.orderBy(this[raw], ['dropoffStartTime'], ['asc'])))
  }

  get cheapest () {
    return new Quote(_.first(_.orderBy(this[raw], ['cost'], ['asc'])))
  }

  get expensive () {
    return new Quote(_.first(_.orderBy(this[raw], ['cost'], ['asc'])))
  }

  get express () {
    return this[express]
  }

  get flex () {
    return this[flex]
  }

  get raw () {
    return this[raw]
  }
}

Quotes.parse = function (data) {
  return new Quotes(data.payload)
}
