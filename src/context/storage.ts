import { MMKV } from "react-native-mmkv";
import { STORAGES_KEY } from "../constants/storageKeys";

export type dataStoreType = "string" | "boolean" | "number" | "object";

export const storageMmkv = new MMKV();

export const getData = (key: STORAGES_KEY, _type?: dataStoreType) => {
  try {
    const data = storageMmkv.getString(key);
    if (data) {
      const parseData = JSON.parse(data);
      return parseData;
    }
  } catch (error) {
    console.log("storage getData", error);
  }
};

export const setData = (key: STORAGES_KEY, value: any) => {
  try {
    if (typeof value === "boolean") {
      storageMmkv.set(key, value);
    } else if (typeof value === "number") {
      storageMmkv.set(key, value);
    } else {
      const jsonValue = JSON.stringify(value);
      storageMmkv.set(key, jsonValue);
    }
  } catch (error) {
    console.log("storage setData", error);
  }
};

export const getStorageKey = () => {
  const keys = storageMmkv.getAllKeys();
  return keys;
};

export const deleteStorage = (key: STORAGES_KEY) => {
  return storageMmkv.delete(key);
};

export const storage = {
  deleteStorage,
  getData,
  getStorageKey,
  setData,
};



export type Storage = typeof storage;
