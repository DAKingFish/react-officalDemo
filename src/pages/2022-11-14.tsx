/**
 * 
 */
export default () => {
  const objectFlat = (obj) => {
    // ??
    return Object.keys(obj).map((item) => {
      return obj[item]
    }).flat()
  }
  return <div>
    {objectFlat({
      name: [1, 2],
      age: [3, 4, 5],
      address: [6, 7, 8]
    })}
  </div>
}