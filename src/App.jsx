import React, {  useState } from "react";



const App = () => {

  const [show, setShow]=useState(false)
 

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col">
          <button className="btn btn-success" onClick={()=>setShow(!show)}>
            Abrir chat
          </button>
        </div>
      </div>
    {/* mostrar componente chat  */}
     
    </div>
  );
};

export default App;
