import React from "react";
import { CircleLoader } from 'react-spinners';

const  Loading = () => {
 
  return (
    <div className="bg-black flex flex-col justify-center items-center sm:mt-10">
     
        <div className="flex items-center justify-center h-screen">
          <CircleLoader  color="#ec8832" />
        </div>     
        </div>

        
  );
};

export default Loading;