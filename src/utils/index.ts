
/**
 * @description生成唯一id
*/
export function generateRandomId() {
  let id = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const length = characters.length

  for (let i = 0; i < 10; i++) {
    id += characters.charAt(Math.floor(Math.random() * length))
  }

  return id
}
