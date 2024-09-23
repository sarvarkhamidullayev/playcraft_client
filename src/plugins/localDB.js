import { openDB } from "idb";

// Function to initialize or access the IndexedDB with dynamic store names
async function getDB(storeName) {
  return openDB("PlayCraft", 1, {
    upgrade(db) {
      // Create the object store if it doesn't exist
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}

// Create or Update (upsert) a record in a specified store
export async function upsertItem(storeName, item) {
  const db = await getDB(storeName);
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);

  const result = await store.put(item);
  await tx.done;
  return result; // Return the key (id)
}

// Read a record by id from a specified store
export async function getItem(storeName, id) {
  const db = await getDB(storeName);
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);

  const item = await store.get(id);
  await tx.done;
  return item;
}

// Read all records from a specified store
export async function getAllItems(storeName) {
  const db = await getDB(storeName);
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const items = await store.getAll();
  await tx.done;
  return items;
}

// Delete a record by id from a specified store
export async function deleteItem(storeName, id) {
  const db = await getDB(storeName);
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);

  await store.delete(id);
  await tx.done;
}

// Clear all records from a specified store
export async function clearStore(storeName) {
  const db = await getDB(storeName);
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);

  await store.clear();
  await tx.done;
}
export async function syncData(storeName, array) {
  // Clear the existing data in the store
  await clearStore(storeName);

  // Open the database and start a transaction
  const db = await getDB(storeName);
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);

  try {
    // Add each item in the array to the store, ensuring the ID is preserved
    for (const item of array) {
      await store.put(item); // `put` will update if the ID already exists or insert if it's new
    }
    // Ensure the transaction is committed
    await tx.done;
  } catch (error) {
    console.error("Failed to sync data to", storeName, ":", error);
    // Optionally, handle rollback or error logging here
  }
}
