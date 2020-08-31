export function uniqObjInArray (arr) {
  const object = {}
  const objres = arr.reduce((item, next) => { // item累加  next 当前值
    console.log('item is ', item)
    object[next.key] ? '' : object[next.key] = true && item.push(next)
    return item
  }, [])
  return objres
/* ————————————————
版权声明：本文为CSDN博主「goose leaves a mark」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/lck8989/java/article/details/83819450 */
}
