import { db, auth } from '../config/firebaseConfig';
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    setDoc
} from 'firebase/firestore';
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

                // Sort by ID to keep order consistent
                roomList.sort((a, b) => a.id - b.id);

                console.log(`✅ Loaded ${roomList.length} rooms from Firebase`);
                return roomList;
            } else {
                console.warn('⚠️ No rooms in Firebase. Using default local data.');
                // Optional: Seed Firebase with default data one time
                // await dataService.seedDefaults(); 
                return defaultRooms;
            }
        } catch (error) {
            console.error('❌ Firebase connection failed (Keys missing?):', error);
            console.log('⚠️ Falling back to local default data.');
            return defaultRooms;
        }
    },

    // 💰 UPDATE Price in Firebase
    updateRoomPrice: async (roomId, newPrice) => {
        try {
            // Find the Firestore Doc ID (assuming ID is stored as field, or we use a query)
            // Ideally, we should use the document ID. For now, let's query by internal ID if they differ.
            // If the document ID matches the room ID (e.g. "1", "2"), we can use doc() directly.

            // Implementation assuming document ID matches room.id (passed as string)
            const roomRef = doc(db, 'rooms', roomId.toString());

            await updateDoc(roomRef, {
                price: Number(newPrice)
            });

            console.log(`✅ Price updated for Room ${roomId} in Firebase`);
            return true;
        } catch (error) {
            console.error('❌ Failed to update price in Firebase:', error);
            throw error;
        }
    },

    // 🛠️ ONE-TIME Seed Function (Call this once to upload defaults)
    seedDefaults: async () => {
        console.log('🌱 Seeding default rooms to Firebase...');
        const roomsCol = collection(db, 'rooms');
        for (const room of defaultRooms) {
            const roomRef = doc(roomsCol, room.id.toString());
            await setDoc(roomRef, room);
        }
        console.log('✅ Seeding complete!');
    },

    addBooking: (bookingDetails) => {
        console.log('Mock DataService: Saving booking', bookingDetails);
        return {
            ...bookingDetails,
            bookingNumber: 'BK' + Date.now(),
            status: 'confirmed'
        };
    }
};

export default dataService;
