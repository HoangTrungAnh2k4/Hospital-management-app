// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { getDatabase } from 'firebase/database';
import { getFirestore, collection, doc, setDoc, onSnapshot,deleteDoc, query, where, orderBy, getDocs, updateDoc, arrayUnion, getDoc, addDoc, limit} from 'firebase/firestore';
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

function getTime(){
    const time = new Date();
    return `${time.getDate()}/${time.getMonth()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
}

async function addMedicine(medicine) {
    try {
        const docRef = doc(collection(database, "medicines"));
        await setDoc(docRef, medicine);
        addHistory({
            field: "Thêm",
            time: getTime(),
            content: `Thêm thuốc ${medicine.name}.`
        }, true);
    } catch (error) {
        alert("Error saving data: ", error);
    }
}

async function getMedicine(onChange) {
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

async function addBlood(blood) {
    try {
        const docRef = doc(collection(database, "blood"));
        await setDoc(docRef, blood);
        alert("Data saved successfully!")
    } catch (error) {
        alert("Error saving data: ", error);
    }
}

function getBlood(onChange) {
    const collectionRef = collection(database, "blood");

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
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const medicineName = docSnap.data().name; // Giả sử thuộc tính tên thuốc là 'name'

            await deleteDoc(docRef);

            addHistory({
                field: "Xóa",
                time: getTime(),
                content: `Xóa thuốc ${medicineName}.`
            }, true);
        } else {
            console.log("Không tìm thấy thuốc để xóa.");
        }
    } catch (error) {
        console.error('Error removing data: ', error);
    }
}
async function deleteBlood(docIdBlood) {
    const docRef = doc(database, "blood", docIdBlood);

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

async function queryByFirstChar_blood(startChar, onChange) {
    const collectionRef = collection(database, "blood");
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
       alert("Error fetching blood: ", error);
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
async function queryMedByName_blood(bloodName, onChange) {
    const bloodCollectionRef = collection(database, "blood");
    const q = query(bloodCollectionRef, where("name", "==", bloodName));

    try {
        const querySnapshot = await getDocs(q);
        const blood = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        onChange(blood);
    } catch (error) {
        onChange([]);
    }
}

async function queryMedByCatOrAct(key, option, onChange) {
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

async function queryMedBCatOrAct_blood(key, option, onChange) {
    const bloodCollectionRef = collection(database, "blood"); 
    const q = query(bloodCollectionRef, where(option, "array-contains", key));

    try {
        const querySnapshot = await getDocs(q);
        const blood = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        onChange(blood);
    } catch (error) {
        alert("Error fetching blood by catelogue: ", error);
        onChange([]);
    }
}


async function updateMedicine(docId, updateData) {
    const docRef = doc(database, "medicines", docId); // Tạo một tham chiếu đến document cần cập nhật

    try {
        // Trước khi cập nhật, lấy thông tin hiện tại của thuốc để có thể ghi lại những gì thay đổi
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
             // Ghi lịch sử thay đổi
             const medicineName = docSnap.data().name;
             addHistory({
                field: "Cập nhật",
                time: getTime(),
                content: `Cập nhật dữ liệu cho thuốc ${medicineName}.`
            }, true);
            // Cập nhật document
            await updateDoc(docRef, updateData);
        } else {
            console.log("Không tìm thấy thuốc để cập nhật.");
        }
    } catch (error) {
        console.error('Error updating data: ', error);
    }
}

async function addWinBidMedicine (documentId, newWinBid) {
    const docRef = doc(database, "medicines", documentId);
    try {
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        addHistory({
            field: "Thêm",
            time: getTime(),
            content: `Đấu thầu thành công cho thuốc ${data.name}.`
        }, true);
        await updateDoc(docRef, {
            win_bid: arrayUnion(newWinBid),
            quantity: Number(data.quantity) + Number(newWinBid.wquantity)
        });
    } catch (error) {
        alert("Error adding win_bid: ", error);
    }
}

async function updateBlood(docIdBlood, updateData) {
    const docRef = doc(database, "blood", docIdBlood); // Tạo một tham chiếu đến document cần cập nhật

    try {
        await updateDoc(docRef, updateData); // Cập nhật document
    } catch (error) {
        alert('Error updating data: ', error);
    }
}

async function addWinBid_blood(documentId, newWinBid) {
    const docRef = doc(database, "blood", documentId);
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

async function deleteWinBidMedicine(documentId, index) { 
    const docRef = doc(database, "medicines", documentId);
    try {
        // Load the current document
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            throw new Error("Document does not exist!");
        }
        const data = docSnap.data();

        // Check if the index is valid and retrieve the corresponding win bid
        if (index < 0 || index >= data.win_bid.length) {
            throw new Error("Invalid index!");
        }
        const winBid = data.win_bid[index];

        // Check if the current quantity is sufficient to remove the win bid
        if (data.quantity < winBid.wquantity) {
            throw new Error("Insufficient quantity to remove this win bid!");
        }

        // Update the win bids array by removing the specified index
        addHistory({
            field: "Xóa",
            time: getTime(),
            content: `Xóa lượt đấu thầu thành công cho thuốc ${data.name}.`
        }, true);
        const updatedWinBids = [...data.win_bid];
        updatedWinBids.splice(index, 1);

        // Subtract the wquantity from the total quantity
        const updatedQuantity = Number(data.quantity) - Number(winBid.wquantity);

        // Update the document with the new win bids array and adjusted quantity
        await updateDoc(docRef, {
            win_bid: updatedWinBids,
            quantity: updatedQuantity
        });

    } catch (error) {
        console.error("Error updating document:", error);
        alert("Error updating document: " + error.message);
    }
}

async function deleteWinBid_blood(documentId, index) {
    const docRef = doc(database, "blood", documentId);
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

async function uploadImage(file, field) {
    if (!file) {
        throw new Error("No file provided");
    }
    const storageRef = ref(storage, `${field}/${file.name}`);
    try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        addHistory({
            field: "Thêm",
            time: getTime(),
            content: `Thêm ảnh vào ${field}.`
        }, (field === "medicines"));
        return downloadURL;
    } catch (error) {
        throw new Error('Upload failed: ' + error.message);
    }
}

function uploadImageBlood(file, onChange) {
    if (!file) {
        return;
    }
    const storageRef = ref(storage, `blood/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(downloadURL => {
            onChange(downloadURL);
        });
    }).catch(error => {
        alert('Upload failed: ' + error);
    });
}
function deleteImage(img_url, field){
    if (!img_url) {
        return;
    }
    const imageRef = ref(storage, img_url);
    deleteObject(imageRef);
    addHistory({
        field: "Xóa",
        time: getTime(),
        content: `Xóa ảnh thuộc ${field}.`
    }, (field === "medicines"));
}

async function addEquipment(catalogue_1, catalogue_2, equipment) {
    try {
        // Kiểm tra xem liệu catalogue_1 đã tồn tại hay chưa
        let catalogue1Ref;
        const catalogue1Query = query(collection(database, 'equipments'), where("name", "==", catalogue_1));
        const catalogue1Snapshot = await getDocs(catalogue1Query);
        if (!catalogue1Snapshot.empty) {
            // Nếu tồn tại, lấy tham chiếu đến document đầu tiên
            catalogue1Ref = catalogue1Snapshot.docs[0].ref;
        } else {
            // Nếu không tồn tại, tạo mới
            catalogue1Ref = await addDoc(collection(database, 'equipments'), { name: catalogue_1 });
        }

        // Kiểm tra xem liệu catalogue_2 đã tồn tại trong subcollection 'details' của catalogue_1 hay chưa
        let catalogue2Ref;
        const catalogue2Query = query(collection(database, `equipments/${catalogue1Ref.id}/details`), where("name", "==", catalogue_2));
        const catalogue2Snapshot = await getDocs(catalogue2Query);
        if (!catalogue2Snapshot.empty) {
            // Nếu tồn tại, lấy tham chiếu đến document đầu tiên
            catalogue2Ref = catalogue2Snapshot.docs[0].ref;
        } else {
            // Nếu không tồn tại, tạo mới
            catalogue2Ref = await addDoc(collection(database, `equipments/${catalogue1Ref.id}/details`), { name: catalogue_2 });
        }

        // Thêm equipment vào sub-subcollection 'equipment' của catalogue_2
        await addDoc(collection(database, `equipments/${catalogue1Ref.id}/details/${catalogue2Ref.id}/equipment`), equipment);
        addHistory({
            field: "Thêm",
            time: getTime(),
            content: `Thêm vật tư ${equipment.name} thuộc ${catalogue_2} vào ${catalogue_1}.`
        }, false);
    } catch (error) {
        console.error("Error adding equipment:", error);
    }
}

function getEquipmentByCatalogue(catalogue_1, catalogue_2, onChange) {
    try {
        const equipmentsQuery = query(collection(database, 'equipments'), catalogue_1 ? where("name", "==", catalogue_1) : limit(1));
        onSnapshot(equipmentsQuery, (equipmentsSnapshot) => {
            if (!equipmentsSnapshot.empty) {
                const catalogue1Ref = equipmentsSnapshot.docs[0].ref;
                const detailsQuery = query(collection(database, `equipments/${catalogue1Ref.id}/details`), catalogue_2 ? where("name", "==", catalogue_2) : limit(1));
                onSnapshot(detailsQuery, (detailsSnapshot) => {
                    if (!detailsSnapshot.empty) {
                        const catalogue2Ref = detailsSnapshot.docs[0].ref;
                        const equipmentQuery = collection(database, `equipments/${catalogue1Ref.id}/details/${catalogue2Ref.id}/equipment`);
                        onSnapshot(equipmentQuery, (equipmentSnapshot) => {
                            const equipmentList = equipmentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                            onChange(equipmentList);
                        });
                    } else {
                        onChange([]);
                    }
                });
            } else {
                onChange([]);
            }
        });
    } catch (error) {
        console.error("Error setting up listeners:", error);
        onChange([]);
    }
}

function getCatalogue(onChange) {
    let catalogueData = [];

    onSnapshot(collection(database, 'equipments'), (catalogue1Snapshot) => {
        catalogueData = [];

        catalogue1Snapshot.forEach(doc => {
            const catalogue1Data = {
                id: doc.id, 
                name: doc.data().name,
                details: []
            };

            onSnapshot(collection(database, `equipments/${doc.id}/details`), (catalogue2Snapshot) => {
                catalogue1Data.details = [];

                catalogue2Snapshot.forEach(detailDoc => {
                    catalogue1Data.details.push({
                        id: detailDoc.id,
                        name: detailDoc.data().name
                    });
                });

                const index = catalogueData.findIndex(item => item.id === catalogue1Data.id);
                if (index !== -1) {
                    catalogueData[index] = catalogue1Data;
                } else {
                    catalogueData.push(catalogue1Data);
                }

                onChange([...catalogueData]);
            });
        });
    });
}

async function updateEquipment(catalogue_1, catalogue_2, equipmentId, newData) {
    try {
        const equipmentRef = doc(database, `equipments/${catalogue_1}/details/${catalogue_2}/equipment/${equipmentId}`);
        const docSnap = await getDoc(equipmentRef);
        const equipmentName = docSnap.data().name;
        addHistory({
            field: "Cập nhật",
            time: getTime(),
            content: `Cập nhật dữ liệu cho ${equipmentName}.`
        }, false);
        await updateDoc(equipmentRef, newData);
    } catch (error) {
        alert('Error updating data: ', error);
    }
}

async function addWinBidEquipment(catalogue_1, catalogue_2, equipmentId, winBid) {
    try {
        // Locate the catalogue_1
        const catalogue1Query = query(collection(database, 'equipments'), where("name", "==", catalogue_1));
        const catalogue1Snapshot = await getDocs(catalogue1Query);
        if (catalogue1Snapshot.empty) {
            throw new Error("Catalogue 1 not found");
        }
        const catalogue1Ref = catalogue1Snapshot.docs[0].ref;

        // Locate the catalogue_2
        const catalogue2Query = query(collection(database, `equipments/${catalogue1Ref.id}/details`), where("name", "==", catalogue_2));
        const catalogue2Snapshot = await getDocs(catalogue2Query);
        if (catalogue2Snapshot.empty) {
            throw new Error("Catalogue 2 not found");
        }
        const catalogue2Ref = catalogue2Snapshot.docs[0].ref;

        // Locate the specific equipment
        const equipmentRef = doc(database, `equipments/${catalogue1Ref.id}/details/${catalogue2Ref.id}/equipment`, equipmentId);
        const equipmentSnap = await getDoc(equipmentRef);
        if (!equipmentSnap.exists()) {
            throw new Error("Equipment not found");
        }

        // Extract existing data
        const existingData = equipmentSnap.data();

        addHistory({
            field: "Thêm",
            time: getTime(),
            content: `Đấu thầu thành công cho vật tư ${existingData.name}.`
        }, false);
        // Add or update the win bid and quantity
        await updateDoc(equipmentRef, {
            win_bid: arrayUnion(winBid),
            quantity: Number(existingData.quantity) + Number(winBid.wquantity)
        });

        console.log("Win bid added successfully to the equipment!");
    } catch (error) {
        console.error("Error adding win bid to equipment:", error);
    }
}

async function deleteWinBidEquipment(catalogue1Name, catalogue2Name, equipmentId, bidIndex) {
    try {
        // Query for the catalogue1 document using its name
        const catalogue1Query = query(collection(database, 'equipments'), where("name", "==", catalogue1Name));
        const catalogue1Snapshot = await getDocs(catalogue1Query);
        if (catalogue1Snapshot.empty) {
            throw new Error("Catalogue 1 not found");
        }
        const catalogue1Ref = catalogue1Snapshot.docs[0].ref;

        // Query for the catalogue2 document using its name within the specific catalogue1
        const catalogue2Query = query(collection(database, `equipments/${catalogue1Ref.id}/details`), where("name", "==", catalogue2Name));
        const catalogue2Snapshot = await getDocs(catalogue2Query);
        if (catalogue2Snapshot.empty) {
            throw new Error("Catalogue 2 not found");
        }
        const catalogue2Ref = catalogue2Snapshot.docs[0].ref;

        // Access the specific equipment document
        const equipmentRef = doc(database, `equipments/${catalogue1Ref.id}/details/${catalogue2Ref.id}/equipment`, equipmentId);
        const equipmentSnap = await getDoc(equipmentRef);
        if (!equipmentSnap.exists()) {
            throw new Error("Equipment not found");
        }
        const equipmentData = equipmentSnap.data();

        // Validate the bid index
        if (bidIndex < 0 || bidIndex >= equipmentData.win_bid.length) {
            throw new Error("Invalid index!");
        }
        const winBid = equipmentData.win_bid[bidIndex];

        // Ensure there is enough quantity to remove the win bid
        if (equipmentData.quantity < winBid.wquantity) {
            throw new Error("Insufficient quantity to remove this win bid!");
        }

        // Create the history entry before modifying the equipment
        addHistory({
            field: "Xóa",
            time: getTime(),
            content: `Xóa lượt đấu thầu thành công cho thiết bị ${equipmentData.name}.`
        }, false);

        // Remove the bid from the array and update the quantity
        const updatedWinBids = [...equipmentData.win_bid];
        updatedWinBids.splice(bidIndex, 1);
        const updatedQuantity = Number(equipmentData.quantity) - Number(winBid.wquantity);

        // Update the document with the new win bids array and adjusted quantity
        await updateDoc(equipmentRef, {
            win_bid: updatedWinBids,
            quantity: updatedQuantity
        });

        console.log("Win bid removed successfully from the equipment!");

    } catch (error) {
        console.error("Error removing win bid from equipment:", error);
        alert("Error removing win bid: " + error.message);
    }
}

async function deleteEquipment(catalogue1Name, catalogue2Name, equipmentId) {
    try {
        // Locate the catalogue_1 by name
        const catalogue1Query = query(collection(database, 'equipments'), where("name", "==", catalogue1Name));
        const catalogue1Snapshot = await getDocs(catalogue1Query);
        if (catalogue1Snapshot.empty) {
            throw new Error("Catalogue 1 not found");
        }
        const catalogue1Ref = catalogue1Snapshot.docs[0].ref;

        // Locate the catalogue_2 by name within the found catalogue_1
        const catalogue2Query = query(collection(database, `equipments/${catalogue1Ref.id}/details`), where("name", "==", catalogue2Name));
        const catalogue2Snapshot = await getDocs(catalogue2Query);
        if (catalogue2Snapshot.empty) {
            throw new Error("Catalogue 2 not found");
        }
        const catalogue2Ref = catalogue2Snapshot.docs[0].ref;

        // Create a reference to the equipment document
        const equipmentRef = doc(database, `equipments/${catalogue1Ref.id}/details/${catalogue2Ref.id}/equipment`, equipmentId);

        const equipmentSnap = await getDoc(equipmentRef);
        const equipmentName = equipmentSnap.data().name;
        addHistory({
            field: "Xóa",
            time: getTime(),
            content: `Xóa vật tư ${equipmentName}.`
        }, false);
        // Delete the equipment document
        await deleteDoc(equipmentRef);

        console.log("Equipment has been successfully deleted.");
    } catch (error) {
        console.error("Error deleting equipment:", error);
    }
}

async function queryEquipmentByName(equipmentName, onChange) {
    try {
        const equipmentResults = [];
        // First, get all catalogue_1 documents
        const catalogue1Ref = collection(database, "equipments");
        const catalogue1Snapshot = await getDocs(catalogue1Ref);

        // Loop through all catalogue_1 documents
        for (const cat1Doc of catalogue1Snapshot.docs) {
            // For each catalogue_1, access its catalogue_2 subcollections
            const catalogue2Ref = collection(database, `equipments/${cat1Doc.id}/details`);
            const catalogue2Snapshot = await getDocs(catalogue2Ref);

            for (const cat2Doc of catalogue2Snapshot.docs) {
                // For each catalogue_2, search for equipment by name
                const equipmentRef = collection(database, `equipments/${cat1Doc.id}/details/${cat2Doc.id}/equipment`);
                const eqQuery = query(equipmentRef, where("name", "==", equipmentName));
                const eqSnapshot = await getDocs(eqQuery);

                // Collect all matching equipment
                eqSnapshot.forEach(doc => {
                    equipmentResults.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
            }
        }

        onChange(equipmentResults);
    } catch (error) {
        console.error("Error searching for equipment:", error);
        onChange([]); // Return an empty array in case of errors
    }
}

async function updateCatalogue1Name(catalogue1Id, newCatalogue1Name) {
    try {
        const catalogue1Ref = doc(database, "equipments", catalogue1Id);
        const cataSnap = await getDoc(catalogue1Ref);
        addHistory({
            field: "Cập nhật",
            time: getTime(),
            content: `Cập nhật tên cho ${cataSnap.data().name} thành ${newCatalogue1Name}.`
        }, false);
        await updateDoc(catalogue1Ref, {
            name: newCatalogue1Name
        });
    } catch (error) {
        alert("Error updating catalogue name:", error);
    }
}

async function updateCatalogue2Name(catalogue1Id, catalogue2Id, newCatalogue2Name) {
    try {
        const catalogue2Ref = doc(database, `equipments/${catalogue1Id}/details`, catalogue2Id);
        const cataSnap = await getDoc(catalogue2Ref);
        addHistory({
            field: "Cập nhật",
            time: getTime(),
            content: `Cập nhật tên cho ${cataSnap.data().name} thành ${newCatalogue2Name}.`
        }, false);
        await updateDoc(catalogue2Ref, {
            name: newCatalogue2Name
        });
    } catch (error) {
        alert("Error updating catalogue2 name:", error);
    }
}

async function deleteCatalogue2(catalogue1Id, catalogue2Id) {
    try {
        // Reference to the `equipment` subcollection within `catalogue_2`
        const equipmentCollectionRef = collection(database, `equipments/${catalogue1Id}/details/${catalogue2Id}/equipment`);

        // Check if there are any equipment items
        const snapshot = await getDocs(equipmentCollectionRef);
        if (snapshot.empty) {
            // If the subcollection is empty, delete the `catalogue_2` document
            const catalogue2Ref = doc(database, `equipments/${catalogue1Id}/details`, catalogue2Id);
            const cataSnap = await getDoc(catalogue2Ref);
            addHistory({
                field: "Xóa",
                time: getTime(),
                content: `Xóa danh mục ${cataSnap.data().name}.`
            }, false);
            await deleteDoc(catalogue2Ref);
        } else {
            alert("Catalogue_2 not deleted because it contains equipment items.");
        }
    } catch (error) {
        alert("Error in deleting catalogue_2:", error);
    }
}

async function deleteCatalogue1(catalogue1Id) {
    try {
        // Reference to the `details` subcollection under `catalogue_1`
        const detailsCollectionRef = collection(database, `equipments/${catalogue1Id}/details`);

        // Check if there are any `catalogue_2` documents
        const snapshot = await getDocs(detailsCollectionRef);
        if (snapshot.empty) {
            // If the subcollection is empty, delete the `catalogue_1` document
            const catalogue1Ref = doc(database, "equipments", catalogue1Id);
            const cataSnap = await getDoc(catalogue1Ref);
            addHistory({
                field: "Xóa",
                time: getTime(),
                content: `Xóa danh mục ${cataSnap.data().name}.`
            }, false);
            await deleteDoc(catalogue1Ref);
        } else {
            alert("Catalogue_1 not deleted because it contains `catalogue_2` documents.");
        }
    } catch (error) {
        alert("Error in deleting catalogue_1:", error);
    }
}

async function addHistory(history, flag) {
    try {
        const docRef = doc(collection(database, flag?"medhistory":"equiphistory"));
        await setDoc(docRef, history);
        console.log("Data saved successfully!")
    } catch (error) {
        console.log("Error saving data: ", error);
    }
}

async function getHistory(flag, onChange) {
    const collectionRef = collection(database, flag?"medhistory":"equiphistory");

    onSnapshot(collectionRef, (querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });

        onChange(documents);
    }, (error) => {
        console.log("Error to get data: ", error);
    });
}

function deleteImage_blood(img_url){
    if (!img_url) {
        return;
    }
    const imageRef = ref(storage, img_url);
    deleteObject(imageRef);
}

export { database, addMedicine,addBlood, getMedicine,getBlood, deleteMedicine,deleteBlood, queryByFirstChar,queryByFirstChar_blood, updateMedicine,updateBlood, addWinBidMedicine, addWinBid_blood, deleteWinBidMedicine, deleteWinBid_blood, queryMedByName,queryMedByName_blood, queryMedByCatOrAct,queryMedBCatOrAct_blood};
export {uploadImage,uploadImageBlood, deleteImage,deleteImage_blood};
export {addEquipment, getEquipmentByCatalogue, getCatalogue, updateEquipment, addWinBidEquipment, deleteWinBidEquipment, deleteEquipment, queryEquipmentByName, updateCatalogue1Name, updateCatalogue2Name, deleteCatalogue1, deleteCatalogue2};
export {addHistory, getHistory};