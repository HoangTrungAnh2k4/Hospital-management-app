import { getDoc, setDoc, doc} from 'firebase/firestore';
import { database } from 'src/firebase'

const getTotalPayment = async (docID) => {
    try {
        const totalPaymentDocRef = doc(database, 'Patients', docID, 'Amount', 'TotalPayment');
        const totalPaymentDocSnapshot = await getDoc(totalPaymentDocRef);

        if (totalPaymentDocSnapshot.exists()) {
            const totalPayment = totalPaymentDocSnapshot.data();
            return totalPayment;
        } else {
            console.log('Total payment document does not exist.');
            return null;
        }
    } catch (error) {
        console.error('Error getting total payment:', error);
        return null;
    }
};

export default getTotalPayment