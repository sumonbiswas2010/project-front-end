import React from 'react';
import Card from '../Component/Cards'
import Sdata from '../Component/Sdata'


function ncard(value){
   console.log(value);
   return(
      <Card 
      imgsrc={value.imgsrc}
      title={value.title}
      link={value.link}
   />
   );
}
const Services = () => { 
   

    return(
        <>
   <h1 className="heading">Emergency Services. Hi {"X"}</h1>
    {Sdata.map(ncard)}
    </>
    );
 }


export default Services;