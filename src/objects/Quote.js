const rawSymbol = Symbol()

export default class Quote {
  constructor (raw) {
    this[rawSymbol] = raw
    Object.assign(this, raw)
  }

  get id () {
    return this[rawSymbol].quoteId
  }

  get date () {
    return new Date(this[rawSymbol].dropoffStartTime)
  }

}
