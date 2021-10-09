import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCI1P9aspz4ubml9TPlUoiMI7N7h4MYucg",
    authDomain: "ziggalo-db.firebaseapp.com",
    projectId: "ziggalo-db",
    storageBucket: "ziggalo-db.appspot.com",
    messagingSenderId: "694745296762",
    appId: "1:694745296762:web:7688e85962ffd826f630c3"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth,additionalData) => {

        if(!userAuth) {
            return;
        }

        const userRef = firestore.doc(`users/${userAuth.uid}`); 
        
        const snapShot = await userRef.get();

        if(!snapShot.exists){
            const {displayName,email} = userAuth;

            const createdAt = new Date();

            try{

                await userRef.set(
                    {
                        displayName,
                        email,
                        createdAt,
                        ...additionalData
                    }
                )
            }catch(error){

                console.log("Error creating user",error.message);
            }
        }

        return userRef;

}

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)

    const batch = firestore.batch()

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,obj)
        }
    );

    return await batch.commit()

}

export const convertCollectionsToMap = (collections) => {
    const transformedCollections = collections.docs.map(doc => {
        const {title,items} = doc.data();

        return {
            routName : encodeURI(title.toLowerCase()),
            id : doc.id,
            title,
            items
        }
    })

    console.log(transformedCollections)

    return transformedCollections.reduce((accumulator,collections) => {
        accumulator[collections.title.toLowerCase()] = collections;
        return accumulator;
    },{})
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


