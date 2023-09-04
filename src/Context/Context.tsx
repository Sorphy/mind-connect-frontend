
import React from 'react';

const MyContext = React.createContext('default value');



const MyComponent = () => {
  return (
    <MyContext.Provider value="Hello World">
      
    </MyContext.Provider>
  );
}


export default MyComponent;










