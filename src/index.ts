import express from 'express';

import { authenticateCredentials } from './authenticate-credentials';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/status', (req, res) => { res.status(200).end(); });
app.head('/status', (req, res) => { res.status(200).end(); });

const basicAuthHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  const authHeader = req.headers['authorization'] || '';

  if (!authHeader) {
    res.set('WWW-Authenticate', 'Basic realm="tech-test-3"')
    return res.status(401).send('Authentication required')

  }



  let [authType, base64EncdodedValue] = authHeader.split(':');

  if (!authType || authType !== 'Basic') {
    return sendErrorResponse(res);
  }

  if (!base64EncdodedValue) {
    return sendErrorResponse(res);
  }

  base64EncdodedValue = base64EncdodedValue.trim();


  if (authenticateCredentials(base64EncdodedValue)) {
    return next();
  }

  return sendErrorResponse(res);

}

app.get('/basic-auth', basicAuthHandler, (req: express.Request, res: express.Response) => {
  res.status(200).end();
})

const sendErrorResponse = (res) => {
  res.set('WWW-Authenticate', 'Basic realm="tech-test-3"')
  return res.status(401).send('Authentication required')
}

export const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})