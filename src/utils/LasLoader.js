import {LASLoader} from '@loaders.gl/las';
import {load} from '@loaders.gl/core';


const LAS_URL = '/peque.las';



export default async function LasLoader() {
  const response = await fetch(LAS_URL)
  console.log('response',response)
  const buffer=response.arrayBuffer()
  console.log('buffer',buffer)
  const data = await load(buffer,LASLoader);
  console.log(data)
  return data.attributes.POSITION.value;
}


