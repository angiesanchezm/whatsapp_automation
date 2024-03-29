import { message,doc_file,doc_image,name_doc_image } from './constants'
const wppconnect = require('@wppconnect-team/wppconnect');
const readXlsxFile = require('read-excel-file/node')


wppconnect
  .create()
  .then((client) => {
    SenderFunc(client)
  })
  .catch((erro) => {
    console.log(erro);
  });


const SenderFunc = async (client) => {
    
        readXlsxFile(doc_file).then( async (rows) => {
            rows.forEach(async (element,i) => {
                setTimeout( async() => {
                    const name = element[0];
                    const number_contact = element[1];

                    textContent = `Hola ${name} 🤩 \n\n` 
                    textContent += {message}
                    await client
                        .sendText(`${number_contact}@c.us`, textContent)
                        .then((result) => {
                            console.log('Message sent succesfully'); //return object success
                        })
                        .catch((erro) => {
                            console.error('Error when sending: ', erro); //return object error
                        });

                    await client
                        .sendImage(`${number_contact}@c.us`, doc_image, name_doc_image)
                        .then((result) => {
                            console.log('<Image sent succesfully>'); //return object success
                        })
                        .catch((erro) => {
                            console.error('Error when sending: ', erro); //return object error
                        });
                   
                },i*2000);
                
            });
        })


}