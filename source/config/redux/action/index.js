import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";


export const SigninWithGoogle = () => (dispatch) => {
  dispatch({ type: "CHANGE_ISLOADING", value: true })
  return new Promise((resolve, reject) => {
    excuteLoginFirebase().then((userCredential) => {
      console.log(userCredential)
      firestore()
        .collection('players')
        .where('email', '==', userCredential.additionalUserInfo.profile.email)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.size > 0) {
            querySnapshot.forEach(documentSnapshot => {
              let data_user = documentSnapshot.data();
              if (data_user.role == "admin") {

                dispatch({ type: "CHANGE_ISLOGIN", value: true })
                dispatch({ type: "CHANGE_ISLOADING", value: false })
                dispatch({ type: "CHANGE_UNION", value: data_user.badminton_union })
                dispatch({ type: "CHANGE_USER", value: { name: data_user.name, email: data_user.email } })

                return resolve(true)
              } else {
                dispatch({ type: "CHANGE_ISLOADING", value: false })
                return Alert.alert(
                  "Infomation",
                  "Sorry you dont have access this application, please call, Say Assalamu'alaikum 085977300189",
                )
              }
            });
          } else {
            dispatch({ type: "CHANGE_ISLOADING", value: false })
            return Alert.alert(
              "Infomation",
              "Sorry your account not already register on application please call Developers, Say Assalamu'alaikum ! 085977300189",
            )
          }
        });
    }).catch((err) => {
      resolve(false)
      dispatch({ type: "CHANGE_ISLOADING", value: false })
      return Alert.alert("Infomation", err.toString())
    });
  });
}


export const getPBFull = (key) => (dispatch) => {
  dispatch({ type: "CHANGE_ISLOADINGFULL", value: true })
  return new Promise((resolve, reject) => {
    firestore()
    .collection('badminton_union')
    // Suggestion using id Union
      .where('name', '==', key)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(documentSnapshot => {
            let data_pb = documentSnapshot.data();
            dispatch({ type: "CHANGE_ISLOADINGFULL", value: false })
            return resolve(data_pb)
          })
        }
      }).catch(err => {
        resolve(false)
        return Alert.alert("Infomation", err.toString())
      })
  });
}

export const getLocation = () => (dispatch) => {

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
          return Alert.alert("Infomation", "Data location not yet.")
        }
      }).catch((err) => {
        resolve(false);
        return Alert.alert("Infomation", err.toString())
      })
  });
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