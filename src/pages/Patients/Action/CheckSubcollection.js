import { getDocs, collection} from 'firebase/firestore';
import { database } from 'src/firebase'

const checkSubcollection = async (docId, subcollectionName) => {
    const subcollectionRef = collection(database, "Patients", docId, subcollectionName);

    try {
        const querySnapshot = await getDocs(subcollectionRef);
        const data = [];
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
        } 
        return data;
    } catch (error) {
        console.error("Error checking and displaying subcollection:", error);
    }
};

export default checkSubcollection