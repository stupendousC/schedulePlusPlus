import React, {useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { isPhoneValid, isEmailValid, convertToValidPhoneNumberIfInParens, convertToValidPhoneNumberIfAllNums } from './Helpers';


const Info = ({info, URL_endpoint, updateInfoCallback}) => {
  const copiedPerson = JSON.parse(JSON.stringify(info));
  const [person, setPerson] = useState(copiedPerson);
  const [errorMsgs, setErrorMsgs] = useState([]);

  const onFieldChange = (e) => {
    person[e.target.name] = e.target.value;
    setPerson(person);
  }

  const evalFormThenSendApi = (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    axios.put(URL_endpoint, person)
    .then(
      toast.success(`${person.name} updated successfully`),
      updateInfoCallback(person)
    )
    .catch(error => toast.error(`ERROR: ${error.message}`));
  }

  const isFormValid = () => {
    let errors = [];

    // name must be present
    if (person.name === "" || !person.name) {
      errors.push("Name cannot be blank");
    }

    // if phone given, make sure it's correct format
    if (person.phone && person.phone !== "") {
      if (!isPhoneValid(person.phone)) {
        // if phone is actually in technically correct format of (425)111-2222, then we'll convert it to correct format of 425-111-2222 for user
        const correctedPhoneNum = convertToValidPhoneNumberIfInParens(person.phone);
        if (correctedPhoneNum) {
          person.phone = correctedPhoneNum;
        } else {
          errors.push(`Phone number format invalid`);
        }
      } else {
        // convert from format of '4251112222' or '14251112222' to 425-111-2222 for readability
        const newReadablePhone = convertToValidPhoneNumberIfAllNums(person.phone);
        person.phone = newReadablePhone;
      }
    }

    // if email given, make sure it's correct format
    if (person.email && person.email !== "") {
      if (!isEmailValid(person.email)) {
        errors.push(`Email invalid`);
      }
    }

    setErrorMsgs(errors);
    return (errors.length === 0 ? true : false);
  }

  const showErrorMsgs = (addOrUpdatedFormMsgs) => {
    const rowsOfMsgs = addOrUpdatedFormMsgs.map( (msg,i) => {
      return (
        <li key={i} className="centered-text">{msg}</li>
      );
    });

    return (
      <ul className="centered-children-per-row_container">{rowsOfMsgs}</ul>
    );
  }

  
  
  return (
      <section>   
        <h1  className="text-centered margin-all-1rem">MY INFO</h1>
        <form>
          <fieldset>
            <section className="form-group margin-all-1rem">
              <label>NAME: {info.name}</label>
              <input type="text" className="form-control" name="name" onChange={onFieldChange} placeholder={"new name here"}/>
              <label className="margin-top-1rem">ADDRESS: {info.address}</label>
              <input type="text" className="form-control" name="address" onChange={onFieldChange} placeholder={"new address here"}/>
              <label className="margin-top-1rem">PHONE: {info.phone}</label>
              <input type="text" className="form-control" name="phone" onChange={onFieldChange} placeholder={"new phone here"}/>
              <label className="margin-top-1rem">EMAIL: {info.email}</label>
              <input type="text" className="form-control" name="email" onChange={onFieldChange} placeholder={"new email here"}/>
            </section>
            <section className="centered-children-per-row_container margin-all-1rem">
              {errorMsgs === [] ? null : showErrorMsgs(errorMsgs)}
              <button onClick={evalFormThenSendApi} className="btn btn-primary">UPDATE</button>
            </section>
          </fieldset>
        </form>
      </section>
    );
  
  

}
export default Info;
