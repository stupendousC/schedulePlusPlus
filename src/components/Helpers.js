

export const convertDateString = (timeObj) => {
  const year = timeObj.getFullYear();
  let month = timeObj.getMonth() + 1;
  let day = timeObj.getDate();

  if (month < 10) { month = "0" + month.toString() }
  if (day < 10) { day = "0" + day.toString() }

  return `${year}-${month}-${day}`;
}



// FROM VIDEO STORE, MIGHT RECYCLE LATER

// export const formatDate = (arg_date) => {
//   const date = new Date(arg_date);
//   const month = date.toLocaleString('default', { month: 'long' });
//   const day = date.getUTCDate();
//   const year = date.getFullYear();

//   return `${month} ${day}, ${year}`
// }

// export const getCustomerNameFromId = (id, customerObjs) => {
//   const customer = customerObjs.find( obj => obj.id === id);
//   return customer.name;
// }