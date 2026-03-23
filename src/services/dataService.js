import { db, auth, storage } from '../config/firebaseConfig';
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    setDoc,
    addDoc
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage';
import defaultRooms from '../data/defaultRooms';


const dataService = {
    // 📦 FETCH Rooms from Firebase (or fallback to defaults)
    getRooms: async () => {
        try {
            console.log('🔥 Fetching rooms from Firebase...');
            const roomsCol = collection(db, 'rooms');
            const roomSnapshot = await getDocs(roomsCol);

            if (!roomSnapshot.empty) {
                const roomList = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Sort by ID (handling both number and string types)
                roomList.sort((a, b) => {
                    const idA = typeof a.id === 'string' ? parseInt(a.id) || a.id : a.id;
                    const idB = typeof b.id === 'string' ? parseInt(b.id) || b.id : b.id;
                    return idA - idB;
                });

                console.log(`✅ Loaded ${roomList.length} rooms from Firebase`);
                return roomList;
            } else {
                console.warn('⚠️ No rooms in Firebase. Using default local data.');
                return defaultRooms;
            }
        } catch (error) {
            console.error('❌ Firebase connection failed:', error);
            return defaultRooms;
        }
    },

    // 💰 UPDATE Price in Firebase
    updateRoomPrice: async (roomId, newPrice) => {
        try {
            const roomRef = doc(db, 'rooms', roomId.toString());
            await updateDoc(roomRef, {
                price: Number(newPrice)
            });
            console.log(`✅ Price updated for Room ${roomId}`);
            return true;
        } catch (error) {
            console.error('❌ Failed to update price:', error);
            throw error;
        }
    },

    // 🛠️ ONE-TIME Seed Function
    seedDefaults: async () => {
        console.log('🌱 Seeding default rooms...');
        const roomsCol = collection(db, 'rooms');
        for (const room of defaultRooms) {
            const roomRef = doc(roomsCol, room.id.toString());
            await setDoc(roomRef, room);
        }
        console.log('✅ Seeding complete!');
    },

    addBooking: (bookingDetails) => {
        return {
            ...bookingDetails,
            bookingNumber: 'BK' + Date.now(),
            status: 'confirmed'
        };
    }
};

export default dataService;
