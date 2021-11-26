import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";
import { Profile } from '../../../containers/pages';

// Authentication

const getDataPlayer = (email) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('players')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(documentSnapshot => {
            let data_user = documentSnapshot.data();
            if (data_user.role == "admin") {
              resolve(data_user)
            } else {
              reject(new Error("Sorry you dont have access this application, please call, Say Assalamu'alaikum 085977300189"));
            }
          });
        } else {
          reject(new Error("Sorry your account not already register on application please call Developers, Say Assalamu'alaikum ! 085977300189"));
        }
      })
      .catch(err => {
        return Alert.alert(
          "Infomation",
          err.toString(),
        )
      })
  });
}

const getDataUnion = async (data) => {
  let dataUnion = []
  data.badminton_union.forEach(itemUnion => {
    let data = itemUnion.get();
    dataUnion.push(data)
  })
  return await Promise.all(dataUnion);
}

const getItemUnion = (union) => {

  let data = []
  union.forEach(item => {
    let dto = item.data();
    dto.id = item.id;
    data.push(dto)
  })
  return data;
}

export const SigninWithGoogle = () => (dispatch) => {

  dispatch({ type: "CHANGE_ISLOADING", value: true })

  return new Promise((resolve) => {

    excuteLoginFirebase()
      .then((userCredential) => {
        return getDataPlayer(userCredential.additionalUserInfo.profile.email)
      })
      .then(dataUser => {
        dispatch({ type: "CHANGE_USER", value: { name: dataUser.name, email: dataUser.email } })
        return getDataUnion(dataUser)
      })
      .then(dataUnion => {
        return getItemUnion(dataUnion)
      }).then(itemUnion => {
        dispatch({ type: "CHANGE_ISLOGIN", value: true })
        dispatch({ type: "CHANGE_ISLOADING", value: false })
        dispatch({ type: "CHANGE_UNION", value: itemUnion })
        resolve(itemUnion)
      })
      .catch((err) => {
        dispatch({ type: "CHANGE_ISLOADING", value: false })
        return Alert.alert("Infomation", err.toString())
      });

  });

}

// end authentication


export const getPBFull = (key) => (dispatch) => {
  dispatch({ type: "CHANGE_ISLOADINGFULL", value: true })
  return new Promise((resolve, reject) => {
    firestore()
      .collection('badminton_union')
      .doc(key.id)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          let data_pb = documentSnapshot.data();
          dispatch({ type: "CHANGE_ISLOADINGFULL", value: false })
          return resolve(data_pb)
        } else {
          return reject(documentSnapshot.exists)
        }
      });
  });
}

export const getLocation = () => () => {

  let dataLocation = [];

  return new Promise((resolve, reject) => {
    firestore()
      .collection('location')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {

          querySnapshot.forEach(documentSnapshot => {
            let dto = documentSnapshot.data()
            dto.id = documentSnapshot.id;
            dataLocation.push(dto)
          });

          return resolve(dataLocation)
        } else {
          return reject(new Error("Data location not yet."));
        }
      }).catch((err) => {
        return reject(new Error(err));
      })
  });
}

export const checkBookingDateExisting = () => {

}

export const saveBooking = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    firestore()
    .collection('bookings')
    .add(data)
    .then(() => {
      resolve(true)
    }).catch((err)=>{
      reject(new Error(err))
    });
  })
}

export const setUnion = (item) => (dispatch) => {
  dispatch({ type: "CHANGE_CURRENT_UNION", value: item })
}

async function excuteLoginFirebase() {

  GoogleSignin.configure({
    webClientId: '706496795223-mvmklfr5k4d2jms3tkvntamu35fg69uo.apps.googleusercontent.com',
  });

  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export const removeSession = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  }
  catch (exception) {
    return false;
  }
}

export const addSession = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
    return true;
  } catch (e) {
    Alert.alert(e)
  }
}

export const getSession = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    Alert.alert(e)
  }
}