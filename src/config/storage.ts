//@ts-ignore
import SyncStorage from 'sync-storage';

export function retrieveItem(storageKey:string) {
  try {
    var retrievedItem = SyncStorage.get(storageKey);
    return retrievedItem;
  } catch (error) { 
    return null;
  }
}

export function saveItem(storageKey:string, storageValue:any) {
  try {
    SyncStorage.set(storageKey, storageValue);
    return true;
  } catch (error) {
    return false;
  }
}

export function removeItem(storageKey:string) {
  try {
    SyncStorage.remove(storageKey)
    return true;
  } catch (error) {
    return false;
  }
}