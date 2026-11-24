"use strict";

const readline = require("node:readline");

const INITIAL_BALANCE_CENTS = 100000;
const MAX_BALANCE_CENTS = 99999999;

function parseAmount(value) {
  if (typeof value === "number") {
    if (!Number.isFinite(value) || value < 0) return null;
    const text = String(value);
    if (!/^(?:\d+)(?:\.\d{1,2})?$/.test(text)) return null;
  } else if (typeof value === "string") {
    if (!/^\d+(?:\.\d{1,2})?$/.test(value.trim())) return null;
  } else {
    return null;
  }

  const text = String(value).trim();
  const [whole, fraction = ""] = text.split(".");
  const cents = Number(whole) * 100 + Number((fraction + "00").slice(0, 2));
  if (!Number.isSafeInteger(cents) || cents > MAX_BALANCE_CENTS) return null;
  return cents;
}

function formatMoney(cents) {
  const whole = Math.floor(cents / 100);
  const fraction = String(cents % 100).padStart(2, "0");
  return `${whole}.${fraction}`;
}

class Account {
  constructor(initialBalanceCents = INITIAL_BALANCE_CENTS) {
    if (!Number.isSafeInteger(initialBalanceCents) ||
        initialBalanceCents < 0 ||
        initialBalanceCents > MAX_BALANCE_CENTS) {
      throw new RangeError("Initial balance is outside the supported amount range.");
    }
    this.balanceCents = initialBalanceCents;
  }

  read() {
    return this.balanceCents;
  }

  credit(amount) {
    const cents = parseAmount(amount);
    if (cents === null) {
      return { success: false, balanceCents: this.balanceCents,
        message: "Invalid amount." };
    }
    if (this.balanceCents + cents > MAX_BALANCE_CENTS) {
      return { success: false, balanceCents: this.balanceCents,
        message: "Credit exceeds the maximum supported account balance." };
    }
    this.balanceCents += cents;
    return { success: true, balanceCents: this.balanceCents,
      message: `Amount credited. New balance: ${formatMoney(this.balanceCents)}` };
  }

  debit(amount) {
    const cents = parseAmount(amount);
    if (cents === null) {
      return { success: false, balanceCents: this.balanceCents,
        message: "Invalid amount." };
    }
    if (cents > this.balanceCents) {
      return { success: false, balanceCents: this.balanceCents,
        message: "Insufficient funds for this debit." };
    }
    this.balanceCents -= cents;
    return { success: true, balanceCents: this.balanceCents,
      message: `Amount debited. New balance: ${formatMoney(this.balanceCents)}` };
  }
}

const defaultAccount = new Account();

function readBalance() {
  return defaultAccount.read();
}

function creditAccount(amount) {
  return defaultAccount.credit(amount);
}

function debitAccount(amount) {
  return defaultAccount.debit(amount);
}

function printMenu() {
  console.log("--------------------------------");
  console.log("Account Management System");
  console.log("1. View Balance");
  console.log("2. Credit Account");
  console.log("3. Debit Account");
  console.log("4. Exit");
  console.log("--------------------------------");
}

async function runMenu(account = defaultAccount, input = process.stdin, output = process.stdout) {
  const rl = readline.createInterface({ input, output });
  const pendingLines = [];
  const waiters = [];
  rl.on("line", (line) => {
    const resolve = waiters.shift();
    if (resolve) {
      resolve(line);
    } else {
      pendingLines.push(line);
    }
  });
  const ask = (question) => {
    rl.setPrompt(question);
    rl.prompt();
    if (pendingLines.length > 0) return Promise.resolve(pendingLines.shift());
    return new Promise((resolve) => waiters.push(resolve));
  };

  try {
    while (true) {
      printMenu();
      const choice = (await ask("Enter your choice (1-4): ")).trim();

      if (choice === "1") {
        console.log(`Current balance: ${formatMoney(account.read())}`);
      } else if (choice === "2") {
        const amount = await ask("Enter credit amount: ");
        const result = account.credit(amount.trim());
        console.log(result.message);
      } else if (choice === "3") {
        const amount = await ask("Enter debit amount: ");
        const result = account.debit(amount.trim());
        console.log(result.message);
      } else if (choice === "4") {
        console.log("Exiting the program. Goodbye!");
        return;
      } else {
        console.log("Invalid choice, please select 1-4.");
      }
    }
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  runMenu().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = {
  Account,
  INITIAL_BALANCE_CENTS,
  MAX_BALANCE_CENTS,
  parseAmount,
  formatMoney,
  readBalance,
  creditAccount,
  debitAccount,
  runMenu,
};
