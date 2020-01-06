import axios from 'axios';


// export const getAllEmpsDB = () => {
//   axios.get(BASE_URL+ALL_EMPS)
//   .then( response => {return response.data} )
//   .catch(error => console.log("NO!!!", error));
// }

// export const getAllClientsDB = () => {
//   axios.get(BASE_URL+ALL_CLIENTS)
//   .then( response => this.setState({allClients: response.data}))
//   .catch(error => console.log("NO!!!", error));
// }

// export const getAllAdminDB = () => {
//   let result = "SHOULD SEE ADMINS instead of this";
//   axios.get(BASE_URL+ALL_ADMIN)
//   .then(response => { result = response.data})
//   .catch(error => { console.log(error.messages)});
//   return result;
// }

// export const getAllShiftsDB = () => {
//   axios.get(BASE_URL+ALL_SHIFTS)
//   .then( response => this.setState({allShifts: response.data}))
//   .catch(error => console.log("NO!!!, error"));
// }

// export const getAllUnavailsDB = () => {
//   axios.get(BASE_URL+ALL_UNAVAILS)
//   .then( response => this.setState({allUnavails: response.data}))
//   .catch(error => console.log("NO!!!, error"));
// }

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