import { success, notFound } from '../../services/response/';
import { Products } from '.';

export const create = ({ bodymen: { body } }, res, next) => {
  console.log('body => ', body, '\n \n \n');
  Products.create(body)
    .then(products => products.view(true))
    .then(success(res.json(), 201))
    .catch(next);
};

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Products.countDocuments(query)
    .then(count =>
      Products.find(query, select, cursor).then(products => ({
        count,
        rows: products.map(products => products.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Products.findById(params.id)
    .then(notFound(res))
    .then(products => (products ? products.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Products.findById(params.id)
    .then(notFound(res))
    .then(products => (products ? Object.assign(products, body).save() : null))
    .then(products => (products ? products.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Products.findById(params.id)
    .then(notFound(res))
    .then(products => (products ? products.remove() : null))
    .then(success(res, 204))
    .catch(next);
