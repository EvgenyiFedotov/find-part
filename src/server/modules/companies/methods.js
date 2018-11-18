import { Company } from './database';

const companiesFind = (req, res) => (filter = {}, addFilter) => {
  let query = Company.find(filter).sort({ _id: -1 });

  if (addFilter instanceof Function) {
    query = addFilter(query);
  }

  query.exec((err, result) => {
    if (!err) {
      res.send({
        success: true,
        items: result,
      });
    } else {
      res.send({
        success: false,
      });
    }
  });
};

const companyFindAndUpdate = (req, res) => (_id, params) => {
  if (_id) {
    Company.findByIdAndUpdate(_id, params, (err) => {
      if (!err) {
        res.send({
          success: true,
          _id,
        });
      } else {
        res.send({
          success: false,
        });
      }
    });
  } else {
    res.send({
      success: false,
    });
  }
};

const findByNameChunks = (req, res) => (chunks) => {
  const { currentSession } = req;

  if (chunks && chunks.length) {
    if (currentSession) {
      const { userId } = currentSession;

      companiesFind(req, res)({
        $and: chunks.reduce((result, value) => {
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
      res.sendStatus(404);
    }
  } else {
    res.send({
      success: true,
      items: [],
    });
  }
};

export default {
  companiesFind,
  companyFindAndUpdate,
  findByNameChunks,
};
