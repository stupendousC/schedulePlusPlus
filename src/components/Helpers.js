import axios from 'axios';

export const convertEmployeeObjsToArray = (JSONofEmployees) => {
  return ["TODO", "conv", "employees", "from JSON"];
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