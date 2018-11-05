import { Company } from './database';

export const companiesFind = (req, res) => (filter = {}, addFilter) => {
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

export const companyFindAndUpdate = (req, res) => (_id, params) => {
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

export default {
  companiesFind,
  companyFindAndUpdate,
};
