const request = require("supertest");
const app = require("../../../app");
const { Offer, Product, History } = require("../../../app/models");

describe("POST, /api/v1/history", () => {
  let tokenUser;
  let falseToken = "abcdef";
  let product;
  let offer;
  let loginBuyer;

  beforeAll(async () => {
    offer = await Offer.create({
      id_product: 2,
      id_buyer: 3,
      id_offer: 29,
      bid_price: 12323,
    });

    product = await Product.create({
      id_user: 1,
      product_name: "jam_mehong",
      product_price: 1000000,
      category: "string",
      description: "JAM AMAHAL BANGET",
      image: null,
      status: "available",
    });

    loginBuyer = await request(app).post("/api/v1/login").send({
      email: "lailla@gmail.com",
      password: "123456",
    });
    tokenUser = loginBuyer.body.token;
    // console.log()
  });

  afterAll(async () => {
    await Offer.destroy({ where: { id_product: product.id } });
    await Product.destroy({ where: { id: product.id } });
    await History.destroy({ where: { id_product: product.id } });
  });

  // create product + upload file + create history

  it("Add history with status code 201", async () =>
    request(app)
      .post("/api/v1/history")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${tokenUser}`)
      .send({
        id_user: loginBuyer.id,
        id_product: product.id,
        bid_price: 19000,
        id_seller: product.id_user,
      })
      // .send({
      //   id_seller: loginUser.body.id,
      //   id_product: 'Jam Test',
      //   id_offer: null,
      //   id_buyer: null,
      //   status: 'created'
      // })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
          status: expect.any(String),
          data: expect.any(Object),
        });
      }));
});
