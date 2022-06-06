import { Router } from "worktop";
import { listen } from "worktop/cache"

const routes = new Router();

routes.add('GET', 'consultar/:cod', async (req, res) => {
  const { cod } = req.params;

  const result = async (codigo: string) => {

    const data = "<rastroObjeto>\n" +
      "<usuario>{}</usuario>\n" +
      "<senha>{}</senha>\n" +
      "<tipo>L</tipo>\n" +
      "<resultado>T</resultado>\n" +
      "<objetos>" + codigo + "</objetos>\n" +
      "<lingua>101</lingua>\n" +
      "<token>{}</token>\n" +
      "</rastroObjeto>";

    const response = await fetch("http://webservice.correios.com.br/service/rest/rastro/rastroMobile", {
      method: "POST",
      headers: { "Content-Type": "application/xml; charset=UTF-8" },
      body: data
    })
    .then((data) => { return data.json() })
    .catch(err => { 
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