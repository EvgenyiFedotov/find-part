/* automatically created */

import { Router } from 'express';

import companies from '../companies';

const router = new Router();
const api = new Router();

router.use('/api/partners', api);

api.get('/find', (req, res) => {
  const { currentSession } = req;

  if (currentSession) {
    const { userId } = currentSession;
    let { filter } = req.query;

    if (filter instanceof Array) {
      filter = Object.keys(filter.reduce((result, key) => {
        return {
          ...result,
          [key]: true,
        };
      }, {}));

      companies.common.companiesFind(req, res)({
        $and: filter.reduce((result, value) => {
          result.push({
            name: new RegExp(value),
          });
          return result;
        }, []),
        userId: {
          $ne: userId,
        },
        isPublic: true,
        isDelete: false,
      });
    } else {
      res.send({
        success: true,
        items: [],
      });
    }
  } else {
    res.sendStatus(404);
  }
});

export default router;
