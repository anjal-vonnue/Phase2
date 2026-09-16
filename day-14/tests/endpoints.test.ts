import { afterEach, beforeEach, describe, expect, test } from "vitest";
import request from "supertest";
import { Ticket } from "../src/types/ticket.js";
import { log } from "node:console";

const url = "http://localhost:3000";

describe("<-- endpoints test -->", () => {
  let ticket: Partial<Ticket>;

  beforeEach(async () => {
    const response = await request(url).post("/tickets").send({
      title: "test data from vitest",
      description: "test data from vitest",
      priority: "low",
      customer_id: 1,
      category_id: 1,
    });

    expect(response.status).toBe(201);
    expect(response.body.ticket).toBeDefined();
    // console.log(response.body);

    ticket = response.body.ticket;
  });

  afterEach(async () => {
    if (ticket?.id) {
      await request(url).delete(`/tickets/${ticket.id}`);
    }
  });
  // endpoint: 1
  test("-- post  /tickets", async () => {
    expect(ticket.title).toEqual("test data from vitest");
  });
  // endpoint: 2
  test("-- get   /tickets/:id", async () => {
    const response = await request(url).get(`/tickets/${ticket.id}`);
    expect(response.body.ticket.id).toEqual(ticket.id);
  });
  // endpoint: 3
  test("-- patch /ticket/:id/status", async () => {
    const response = await request(url)
      .patch(`/tickets/${ticket.id}/status`)
      .send({
        status: "in_progress",
      });
    expect(response.body.ticket.status).toEqual("in_progress");
  });

  // endpoint: 4
  test("-- patch /tickets/:id/assignee", async () => {
    const response = await request(url)
      .patch(`/tickets/${ticket.id}/assignee`)
      .send({
        assignee: "Anjal",
      });

    expect(response.body.ticket.ticketId).toEqual(ticket.id);
  });

  // endpoint: 5
  test("-- get   /tickets/:id invalid ticket id", async () => {
    const response = await request(url).get(`/tickets/-9999`);
    expect(response.body.message).toEqual("ticket not found");
    expect(response.status).toEqual(404);
  });

  // endpoint: 6
  test("-- patch /tickets/:id/status invalid status", async () => {
    const response = await request(url)
      .patch(`/tickets/${ticket.id}/status`)
      .send({
        status: "urgent",
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toEqual("invalid status");
  });

  // endpoint: 7
  test("-- get   /tickets?status=open", async () => {
    const response = await request(url).get("/tickets?status=open");
    expect(response.body.data[0].status).toBe("open");
  });

  // endpoint: 8
  test("-- get   /tickets?page=2", async () => {
    const response = await request(url).get("/tickets?page=2");
    expect(response.body.pagination.page).toBe(2);
  });

  // endpoint: 9
  test("-- get   /tickets?page=-100 invalid page", async () => {
    const response = await request(url).get("/tickets?page=-100");
    expect(response.body.error[0]).toBe("page must be a positive integer");
  });

  // endpoint: 10
  test("-- get   /tickets?assignee=2", async () => {
    const response = await request(url).get("/tickets?assignee=-100");
    expect(response.body.error[0]).toEqual(
      "assigne value must be a postive integer",
    );
  });
});
