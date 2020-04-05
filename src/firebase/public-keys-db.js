import GenericDB from './generic-db'

export default class PublicKeysDB extends GenericDB {
  constructor() {
    super('publicKeys')
  }

  // Here you can extend UserDB with custom methods
}
