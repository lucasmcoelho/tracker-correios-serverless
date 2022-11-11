import { Router } from "worktop";
import { listen } from "worktop/cache"

const routes = new Router();

routes.add('GET', 'consultar/:cod', async (req, res) => {
  const { cod } = req.params;

  const result = async (codigo: string) => {

    const app_token: any = await fetch("https://proxyapp.correios.com.br/v1/app-validation", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json;",
        "user-agent": "Dart/2.18 (dart:io)",
      },
      body: JSON.stringify({ "requestToken": "YW5kcm9pZDtici5jb20uY29ycmVpb3MucHJlYXRlbmRpbWVudG87RjMyRTI5OTc2NzA5MzU5ODU5RTBCOTdGNkY4QTQ4M0I5Qjk1MzU3OA" })

    }).then((data) => { 
      return data.json(); 

    }).catch(err => {  
      return null; 
    });

    if(app_token == null){
      return res.send(404, {"Error": "Tracker info ERROR. Try again later"});
    }

    const response = await fetch("https://proxyapp.correios.com.br/v1/sro-rastro/"+codigo, {
      method: "GET",
      headers: { 
        "content-type": "application/json",
        "user-agent": "Dart/2.18 (dart:io)",
        "app-check-token": app_token['token'],
      }

    }).then((data) => { 
      return data.json() 
    
    }).catch(err => { 
      return null;
    });

    return await response;
  }
  const rr = await result(cod);
  if(rr != null){
    return res.send(200, rr);
  }

  return res.send(404, {"Error": "Tracker info ERROR. Try again later"});
});

routes.add('POST', '/post', async (req, res) => {

  return res.send(200, { message: "POST" });
});

listen(routes.run);