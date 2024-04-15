// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { getDatabase } from 'firebase/database';
import { getFirestore, collection, doc, setDoc, onSnapshot,deleteDoc, query, where, orderBy, getDocs, updateDoc, arrayUnion, getDoc} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'hospital-app-5ee82.firebaseapp.com',
    projectId: 'hospital-app-5ee82',
    storageBucket: 'hospital-app-5ee82.appspot.com',
    messagingSenderId: '668579763178',
    appId: '1:668579763178:web:025cbca121963c5a9f9893',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage();

async function addMedicine(medicine) {
    try {
        const docRef = doc(collection(database, "medicines"));
        await setDoc(docRef, medicine);
        alert("Data saved successfully!")
    } catch (error) {
        alert("Error saving data: ", error);
    }
}

function getMedicine(onChange) {
    const collectionRef = collection(database, "medicines");

    onSnapshot(collectionRef, (querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });

        onChange(documents);
    }, (error) => {
        alert("Error to get data: ", error);
    });
}

async function deleteMedicine(docId) {
    const docRef = doc(database, "medicines", docId);

    try {
        await deleteDoc(docRef);
        alert('Data successfully deleted!');
    } catch (error) {
        alert('Error removing data: ', error);
    }
}

async function queryByFirstChar(startChar, onChange) {
    const collectionRef = collection(database, "medicines");
    // Chuyển đổi ký tự đầu vào thành chữ hoa (hoặc chữ thường tùy thuộc vào yêu cầu)
    const normalizedStartChar = startChar.toUpperCase();

    // Tính toán ký tự tiếp theo sau startChar trong bảng chữ cái để giới hạn phạm vi truy vấn
    const nextChar = String.fromCharCode(normalizedStartChar.charCodeAt(0) + 1);

    const queryConstraint = query(
        collectionRef,
        where("name", ">=", normalizedStartChar),
        where("name", "<", nextChar),
        orderBy("name")
    );

    try {
        const querySnapshot = await getDocs(queryConstraint);
        const documents = [];
        querySnapshot.forEach(doc => {
            documents.push({ id: doc.id, ...doc.data() });
        });
        onChange(documents);  // Trả về danh sách các documents
    } catch (error) {
       alert("Error fetching medicines: ", error);
        onChange([]);  // Trả về mảng rỗng nếu có lỗi
    }
}

async function queryMedByName(medicineName, onChange) {
    const medicinesCollectionRef = collection(database, "medicines");
    const q = query(medicinesCollectionRef, where("name", "==", medicineName));

    try {
        const querySnapshot = await getDocs(q);
        const medicines = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        onChange(medicines);
    } catch (error) {
        onChange([]);
    }
}

async function queryMedBCatOrAct(key, option, onChange) {
    const medicinesCollectionRef = collection(database, "medicines"); 
    const q = query(medicinesCollectionRef, where(option, "array-contains", key));

    try {
        const querySnapshot = await getDocs(q);
        const medicines = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        onChange(medicines);
    } catch (error) {
        alert("Error fetching medicines by catelogue: ", error);
        onChange([]);
    }
}


async function updateMedicine(docId, updateData) {
    const docRef = doc(database, "medicines", docId); // Tạo một tham chiếu đến document cần cập nhật

    try {
        await updateDoc(docRef, updateData); // Cập nhật document
    } catch (error) {
        alert('Error updating data: ', error);
    }
}

async function addWinBid(documentId, newWinBid) {
    const docRef = doc(database, "medicines", documentId);
    try {
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        await updateDoc(docRef, {
            win_bid: arrayUnion(newWinBid),
            quantity: Number(data.quantity) + Number(newWinBid.wquantity)
        });
        alert("win_bid added successfully!");
    } catch (error) {
        alert("Error adding win_bid: ", error);
    }
}

async function deleteWinBid(documentId, index) {
    const docRef = doc(database, "medicines", documentId);
    try {
        // Tải document hiện tại
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        // Kiểm tra nếu index hợp lệ và xóa phần tử
        const updatedWinBids = [...data.win_bid];
        updatedWinBids.splice(index, 1);  // Xóa phần tử tại index

        // Cập nhật document
        await updateDoc(docRef, {
            win_bid: updatedWinBids
        });

        alert("win_bid removed successfully!");
    } catch (error) {
        alert("Error updating document:", error);
    }
}

function uploadImage(file, field, onChange) {
    if (!file) {
        return;
    }
    const storageRef = ref(storage, `${field}/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(downloadURL => {
            onChange(downloadURL);
        });
    }).catch(error => {
        alert('Upload failed: ' + error);
    });
}
function deleteImage(img_url){
    if (!img_url) {
        return;
    }
    const imageRef = ref(storage, img_url);
    deleteObject(imageRef);
}

export { database, addMedicine, getMedicine, deleteMedicine, queryByFirstChar, updateMedicine, addWinBid, deleteWinBid, queryMedByName, queryMedBCatOrAct};
export {uploadImage, deleteImage};
