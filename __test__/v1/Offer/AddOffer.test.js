const request = require('supertest');
const app = require('../../../app');
const { Offer, Product, History } = require('../../../app/models');

describe('POST, /api/v1/offer', () => {
  let tokenUser;
  let product;
  let loginBuyer;
  const falseToken = 'abcdef';

  beforeAll(async () => {
    product = await Product.create({
      id_user: 1,
      product_name: 'jam_mehong',
      product_price: 1000000,
      category: 'string',
      description: 'JAM AMAHAL BANGET',
      image: null,
      status: 'available',
    });

    loginBuyer = await request(app).post('/api/v1/login').send({
      email: 'lailla@gmail.com',
      password: '123456',
    });
    tokenUser = loginBuyer.body.token;
  });

  afterAll(async () => {
    await Offer.destroy({ where: { id_product: product.id } });
    await Product.destroy({ where: { id: product.id } });
    await History.destroy({ where: { id_product: product.id } });
  });

  it('Add offer with status code 200', async () => request(app)
    .post('/api/v1/offer')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${tokenUser}`)
    .send({
      id_user: loginBuyer.id,
      id_product: product.id,
      bid_price: 19000,
      id_seller: product.id_user,
    })
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: expect.any(String),
        message: expect.any(String),
      });
    }));

  it('Add offer with status code 401', async () => request(app)
    .post('/api/v1/offer')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${falseToken}`)
    .send({
      id_user: loginBuyer.id,
      id_product: product.id,
      bid_price: 19000,
      id_seller: product.id_user,
    })
    .then((res) => {
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({
        error: expect.any(String),
        message: expect.any(String),
      });
    }));
});
