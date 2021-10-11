
// * EXEMPLO DE API

// Criando uma api.
// Como estamos utilizando o typeScript, iremos tipar essas duas variáveis
import {NextApiRequest, NextApiResponse} from 'next';

// Exportando como uma função anônima
export default (request: NextApiRequest, response: NextApiResponse) => {
   const users = [
      {key:'1', nome:'Renan'},
      {key:'2', nome:'Alana'},
      {key:'3', nome:'Bonassa'},
   ];

   return response.json(users);
}