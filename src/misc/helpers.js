import UsersDB from '@/firebase/users-db'

/**
 * Create new user from firebase auth user infos
 */
// eslint-disable-next-line
export const createNewUserFromFirebaseAuthUser = async firebaseAuthUser => {
  const userDb = new UsersDB()
  const user = {
    id: firebaseAuthUser.uid
  }

  return userDb.create(user, firebaseAuthUser.uid)
}

export function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf))
}

export function str2ab(str) {
  const buf = new ArrayBuffer(str.length * 2) // 2 bytes for each char
  const bufView = new Uint16Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i += 1) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}
