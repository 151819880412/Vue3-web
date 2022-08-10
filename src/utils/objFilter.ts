
export function preProcessData(formData) {
  function isEmpty(obj) {
    if (typeof obj === 'undefined' || obj === null || obj === '') return true;
    return false;
  }
  Object.keys(formData).forEach(item => {
    if (isEmpty(formData[item])) {
      delete formData[item];
    }
  });
  return formData;
}