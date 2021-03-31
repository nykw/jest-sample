export function forEach<X, F extends (x: X) => unknown>(items: X[], callback: F) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
