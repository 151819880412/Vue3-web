import { createStorage as create, CreateStorageParams } from './storageCache';

export type Options = Partial<CreateStorageParams>;

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    storage,
    ...options,
  };
};

export const WebStorage = create(createOptions(localStorage));

export const createStorage = (storage: Storage = localStorage, options: Options = {}) => {
  return create(createOptions(storage, options));
};

export const createSessionStorage = (options: Options = {}) => {
  // console.log('createSessionStorage', JSON.parse(JSON.stringify({ ...options })));
  return createStorage(sessionStorage, { ...options});
};

export const createLocalStorage = (options: Options = {}) => {
  // console.log('createLocalStorage', JSON.parse(JSON.stringify({ ...options })));
  return createStorage(localStorage, { ...options});
};

export default WebStorage;
