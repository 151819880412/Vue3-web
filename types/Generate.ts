export type Getters<T extends Record<any, any>> = {
  [Key in keyof T as `${Capitalize<Key & string>}`]: T[Key];
};


// export type Generate<T> = {
//   [P in keyof T]: T[P]
// };


export type Generate<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T & string as T[K] extends Function ?
  `isScreen${Capitalize<K> }` | `is${Capitalize<K> } Allowed` :
  never]: () => boolean
} & T


// const myObj = {
//   // start() { /*...*/ },
//   a:1
// }
// type Generated = Generate<typeof myObj> 
// const aaa:Generated = {
//   a:2||null,
// }
// console.log(aaa)


// { isScreenStart: () => boolean; isStartAllowed: () => boolean; } & { start(): void; };