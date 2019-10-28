import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { token, master } from '../../services/passport';
import { create, index, show, update, destroy } from './controller';
import { schema } from './model';

import Products, { schema } from './model';
// export

const router = new Router();

const { name, title, description, thumb_image, images, is_available, available_count } = schema.tree;

/**
 * @api {post} /products Create products
 * @apiName CreateProducts
 * @apiGroup Products
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Products's name.
 * @apiParam title Products's title.
 * @apiParam description Products's description.
 * @apiParam thumb_image Products's thumb_image.
 * @apiParam images Products's images.
 * @apiParam is_available Products's is_available.
 * @apiParam available_count Products's available_count.
 * @apiSuccess {Object} products Products's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Products not found.
 * @apiError 401 admin access only.
 */
router.post(
  '/',
  token({ required: true, roles: ['admin'] }),
  body({ name, title, description, thumb_image, images, is_available, available_count }),
  create
);

/**
 * @api {get} /products Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Products
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of products.
 * @apiSuccess {Object[]} rows List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */

router.get('/', master(), query(), index);

/**
 * @api {get} /products/:id Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Products
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} products Products's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Products not found.
 * @apiError 401 master access only.
 */
router.get('/:id', master(), show);

/**
 * @api {put} /products/:id Update products
 * @apiName UpdateProducts
 * @apiGroup Products
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Products's name.
 * @apiParam title Products's title.
 * @apiParam description Products's description.
 * @apiParam thumb_image Products's thumb_image.
 * @apiParam images Products's images.
 * @apiParam is_available Products's is_available.
 * @apiParam available_count Products's available_count.
 * @apiSuccess {Object} products Products's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Products not found.
 * @apiError 401 admin access only.
 */
router.put(
  '/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, title, description, thumb_image, images, is_available, available_count }),
  update
);

/**
 * @api {delete} /products/:id Delete products
 * @apiName DeleteProducts
 * @apiGroup Products
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Products not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id', token({ required: true, roles: ['admin'] }), destroy);

export default router;
