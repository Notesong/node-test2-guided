const supertest = require("supertest");
// our server won't actually start when it's required in,
// due to the if statement in index.js
const server = require("../index");
const db = require("../data/config");

// reseeds the database before each run of tests
beforeEach(async () => {
  await db.seed.run();
});
// closes database connection when testing ends
afterAll(async () => {
  await db.destroy();
});

describe("hobbits integration tests", () => {
  it("GET /hobbits", async () => {
    const res = await supertest(server).get("/hobbits");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toHaveLength(4);
    expect(res.body[0].name).toBe("sam");
  });

  it("GET /hobbits/id", async () => {
    const res = await supertest(server).get("/hobbits/2");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.name).toBe("frodo");
  });

  it("GET /hobbits/id", async () => {
    const res = await supertest(server).get("/hobbits/50");
    expect(res.statusCode).toBe(404);
  });

  it("POST /hobbits", async () => {
    const data = { name: "bilbo" };
    const res = await supertest(server).post("/hobbits").send(data);
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.name).toBe("bilbo");
  });
});
