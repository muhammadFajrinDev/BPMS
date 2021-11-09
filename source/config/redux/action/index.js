import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const SigninWithGoogle = () =>{
    excuteLoginFirebase().then((userCredential)=>{
      console.log(userCredential)
    }).catch((err)=>{
      console.log(err)
    });
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

export const removeSession = async (key) =>{
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
}

export const addSession = async (key,value) => {
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
    } catch(e) {
      Alert.alert(e)
    }
}