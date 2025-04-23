import { Router } from "worktop";
import { listen } from "worktop/cache"

const routes = new Router();

interface IResponse {
  "json": string,
  "carrier": string,
}

routes.add('GET', 'consultar/:cod', async (req, res) => {
  const { cod } = req.params;

  const result = async (codigo: string) => {

    const response = await fetch('https://api-labs.wonca.com.br/wonca.labs.v1.LabsService/Track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Apikey ${TOKEN}`
      },
      body: JSON.stringify({"code": codigo})
    }).then((data) => {
      return data.json() as Promise<IResponse>;

    }).catch(err => {
      return null;
    });

    var n = await response;
    var res = n?.json;

    return res;
  }
  const rr = await result(cod);
  if (rr != null) {
    return res.send(200, rr);
  }

  return res.send(404, { "Error": "Tracker info ERROR. Try again later" });
});

routes.add('POST', '/post', async (req, res) => {

  return res.send(200, { message: "POST" });
});

listen(routes.run);