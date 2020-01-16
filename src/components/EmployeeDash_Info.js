import React, {useState } from 'react';

const Info = ({info, updateCallback}) => {
  const[readOrUpdate, setReadOrUpdate] = useState("READ");


  const showReadOrUpdate = () => {
    return (
      <section>   
        <form>
          <fieldset>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" placeholder={info.name}/>
              <label>Address</label>
              <input type="text" className="form-control" placeholder={info.address}/>
              <label>Phone</label>
              <input type="text" className="form-control" placeholder={info.phone}/>
              <label>Email</label>
              <input type="text" className="form-control" placeholder={info.email}/>
            </div>
            <button onClick={updateCallback} className="btn btn-primary">READ ONLY FOR NOW (updates planned for future release)</button>
          </fieldset>
        </form>
      </section>
    );
    
  }
  
  return(
    showReadOrUpdate()
  );
  

}
export default Info;
