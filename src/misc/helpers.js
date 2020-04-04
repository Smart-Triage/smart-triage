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
