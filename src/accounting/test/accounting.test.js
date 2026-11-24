"use strict";

const {
  Account,
  parseAmount,
  formatMoney,
  INITIAL_BALANCE_CENTS,
  MAX_BALANCE_CENTS,
} = require("../index");

describe("accounting application", () => {
  test("starts with a $1000.00 balance", () => {
    const account = new Account();
    expect(account.read()).toBe(INITIAL_BALANCE_CENTS);
    expect(formatMoney(account.read())).toBe("1000.00");
  });

  test("credits the account", () => {
    const account = new Account();
    const result = account.credit("250.00");
    expect(result.success).toBe(true);
    expect(formatMoney(account.read())).toBe("1250.00");
  });

  test("zero credit leaves the balance unchanged", () => {
    const account = new Account();
    account.credit("0.00");
    expect(formatMoney(account.read())).toBe("1000.00");
  });

  test("valid debit updates the balance", () => {
    const account = new Account();
    account.debit("250.00");
    expect(formatMoney(account.read())).toBe("750.00");
  });

  test("debiting the full balance produces zero", () => {
    const account = new Account();
    account.debit("1000.00");
    expect(formatMoney(account.read())).toBe("0.00");
  });

  test("insufficient funds rejects the debit", () => {
    const account = new Account();
    const result = account.debit("1000.01");
    expect(result.success).toBe(false);
    expect(result.message).toBe("Insufficient funds for this debit.");
    expect(formatMoney(account.read())).toBe("1000.00");
  });

  test("zero debit leaves the balance unchanged", () => {
    const account = new Account();
    account.debit("0.00");
    expect(formatMoney(account.read())).toBe("1000.00");
  });

  test("supports sequential operations and fixed precision", () => {
    const account = new Account();
    account.credit("125.50");
    expect(formatMoney(account.read())).toBe("1125.50");
    account.debit("75.25");
    expect(formatMoney(account.read())).toBe("1050.25");
    const rejected = account.debit("1050.26");
    expect(rejected.success).toBe(false);
    expect(formatMoney(account.read())).toBe("1050.25");

    const precise = new Account();
    precise.credit("12.34");
    precise.debit("2.10");
    expect(formatMoney(precise.read())).toBe("1010.24");
  });

  test("supports the maximum balance and rejects overflow", () => {
    const account = new Account(MAX_BALANCE_CENTS);
    account.debit("999999.99");
    expect(formatMoney(account.read())).toBe("0.00");

    account.credit("1.00");
    expect(formatMoney(account.read())).toBe("1.00");
  });

  test("credit overflow does not change the balance", () => {
    const account = new Account(MAX_BALANCE_CENTS);
    const result = account.credit("0.01");
    expect(result.success).toBe(false);
    expect(formatMoney(account.read())).toBe("999999.99");
  });

  test("invalid and fractional precision amounts are rejected", () => {
    const account = new Account();
    expect(account.credit("-1").success).toBe(false);
    expect(account.credit("abc").success).toBe(false);
    expect(account.credit("1.001").success).toBe(false);
    expect(parseAmount("999999.99")).toBe(MAX_BALANCE_CENTS);
  });
});
