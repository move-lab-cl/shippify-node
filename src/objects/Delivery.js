import { flatten } from 'lodash'
export default class Delivery {
  constructor () {
    this.pickup = {}
    this.dropoff = {}
    this.packages = []
  }

  addPickup (pickup) {
    this.pickup = pickup
  }

  addDropoff (dropoff) {
    this.dropoff = dropoff
  }

  addPackages (...packages) {
    this.packages = flatten(this.packages.concat(packages))
  }

  addPackage (pkg) {
    this.packages.push(pkg)
  }
}
