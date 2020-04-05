// Key Storage with Web Cryptography API
//
// Copyright 2014 Info Tech, Inc.
// Provided under the MIT license.
// See LICENSE file for details.

// Saves cryptographic key pairs in IndexedDB.

// The only global name in this library is openKeyStore.
// openKeyStore takes no parameters, and returns a Promise.
// If the key storage database can be opened, the promise
// is fulfilled with the value of a key store object. If
// it cannot be opened, it is rejected with an Error.
//
// The key store object has methods getKey, saveKey, listKeys
// to manage stored keys, and close, to close the key storage
// database, freeing it for other code to use.
//
// The key storage database name is hard coded as KeyStore. It
// uses one object store, called keys.
//
export default function KeyStore() {
  const self = this
  self.db = null
  self.dbName = 'KeyStore'
  self.objectStoreName = 'keys'

  self.open = () => {
    return new Promise((fulfill, reject) => {
      if (!window.indexedDB) {
        reject(new Error('IndexedDB is not supported by this browser.'))
      }

      const req = indexedDB.open(self.dbName, 1)
      req.onsuccess = evt => {
        self.db = evt.target.result
        fulfill(self)
      }
      req.onerror = evt => {
        reject(evt.error)
      }
      req.onblocked = () => {
        reject(new Error('Database already open'))
      }

      // If the database is being created or upgraded to a new version,
      // see if the object store and its indexes need to be created.
      req.onupgradeneeded = evt => {
        self.db = evt.target.result
        if (!self.db.objectStoreNames.contains(self.objectStoreName)) {
          const objStore = self.db.createObjectStore(self.objectStoreName, {
            autoIncrement: true
          })
          objStore.createIndex('name', 'name', { unique: false })
          objStore.createIndex('spki', 'spki', { unique: false })
        }
      }
    })
  }

  // saveKey method
  //
  // Takes the public and private keys, and an arbitrary name
  // for the saved key. The private key can be passed as null if unavailable.
  //
  // Returns a Promise. If a key can be saved, the
  // Promise is fulfilled with a copy of the object
  // that was saved. Otherwise, it is rejected with an Error.
  //
  self.saveKey = (publicKey, privateKey, name) => {
    return new Promise((fulfill, reject) => {
      if (!self.db) {
        reject(new Error('KeyStore is not open.'))
      }

      window.crypto.subtle
        .exportKey('spki', publicKey)
        .then(spki => {
          const savedObject = {
            publicKey,
            privateKey,
            name,
            spki
          }

          const transaction = self.db.transaction(
            [self.objectStoreName],
            'readwrite'
          )
          transaction.onerror = evt => {
            reject(evt.error)
          }
          transaction.onabort = evt => {
            reject(evt.error)
          }
          transaction.oncomplete = () => {
            fulfill(savedObject)
          }

          const objectStore = transaction.objectStore(self.objectStoreName)
          objectStore.add(savedObject)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  // getKey method
  //
  // Takes the name of a property (one of id, name, or spki), and
  // the value of that property to search for.
  //
  // Returns a Promise. If a key with the given propertyValue of
  // the specified propertyName exists in the database, the Promise
  // is fulfilled with the saved object, otherwise it is rejected
  // with an Error.
  //
  // If there are multiple objects with the requested propertyValue,
  // only one of them is passed to the fulfill function.
  //
  self.getKey = (propertyName, propertyValue) => {
    return new Promise((fulfill, reject) => {
      if (!self.db) {
        reject(new Error('KeyStore is not open.'))
      }

      const transaction = self.db.transaction(
        [self.objectStoreName],
        'readonly'
      )
      const objectStore = transaction.objectStore(self.objectStoreName)

      let request
      if (propertyName === 'id') {
        request = objectStore.get(propertyValue)
      } else if (propertyName === 'name') {
        request = objectStore.index('name').get(propertyValue)
      } else if (propertyName === 'spki') {
        request = objectStore.index('spki').get(propertyValue)
      } else {
        reject(new Error(`No such property: ${propertyName}`))
      }

      request.onsuccess = evt => {
        fulfill(evt.target.result)
      }

      request.onerror = evt => {
        reject(evt.target.error)
      }
    })
  }

  // listKeys method
  //
  // Takes no parameters.
  //
  // Returns a Promise. Unless there is an error, fulfills the
  // Promise with an array of all objects from the key storage
  // database. Otherwise it rejects it with an Error.
  //
  self.listKeys = () => {
    return new Promise((fulfill, reject) => {
      if (!self.db) {
        reject(new Error('KeyStore is not open.'))
      }

      const list = []

      const transaction = self.db.transaction(
        [self.objectStoreName],
        'readonly'
      )
      transaction.onerror = evt => {
        reject(evt.error)
      }
      transaction.onabort = evt => {
        reject(evt.error)
      }

      const objectStore = transaction.objectStore(self.objectStoreName)
      const cursor = objectStore.openCursor()

      cursor.onsuccess = evt => {
        if (evt.target.result) {
          list.push({
            id: evt.target.result.key,
            value: evt.target.result.value
          })
          evt.target.result.continue()
        } else {
          fulfill(list)
        }
      }
    })
  }

  // close method
  //
  // Takes no parameters.
  //
  // Simply closes the database and returns immediately. Note that
  // the IndexedDB system actually closes the database in a separate
  // thread, and there is no way to know when that process is complete.
  //
  self.close = () => {
    return new Promise((fulfill, reject) => {
      if (!self.db) {
        reject(new Error('KeyStore is not open.'))
      }

      self.db.close()
      self.db = null
      fulfill()
    })
  }
}
