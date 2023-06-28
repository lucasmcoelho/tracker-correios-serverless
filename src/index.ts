import { Router } from "worktop";
import { listen } from "worktop/cache"

const routes = new Router();

routes.add('GET', 'consultar/:cod', async (req, res) => {
  const { cod } = req.params;

  const result = async (codigo: string) => {

    const response = await fetch("https://api.linketrack.com/track/json?user=" + USER + "&token=" + TOKEN + "&codigo=" + codigo, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      }

    }).then((data) => {
      return data.json()

    }).catch(err => {
      return null;
    });

    return await response;
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