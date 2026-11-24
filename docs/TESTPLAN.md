# COBOL Student Account Test Plan

## TC-001: View the Initial Account Balance

| Test Plan Field | Value |
|---|---|
| **Test Case ID** | TC-001 |
| **Test Case Description** | View the initial account balance |
| **Pre-conditions** | Start the application; no credit or debit has been made |
| **Test Steps** | 1. Start the application.<br>2. Select menu option `1` (View Balance). |
| **Expected Result** | The application displays the initial balance of `1000.00`. |
| **Actual Result** | |
| **Status (Pass/Fail)** | |
| **Comments** | |

## TC-002: Credit the Account

| Test Plan Field | Value |
|---|---|
| **Test Case ID** | TC-002 |
| **Test Case Description** | Credit the account with a valid amount |
| **Pre-conditions** | Start with a balance of `1000.00` |
| **Test Steps** | 1. Select menu option `2` (Credit Account).<br>2. Enter `250.00`.<br>3. Select option `1` to verify the balance. |
| **Expected Result** | The account is credited by `250.00` and displays `1250.00`. |
| **Actual Result** | |
| **Status (Pass/Fail)** | |
| **Comments** | |

## TC-003: Credit Zero

| Test Plan Field | Value |
|---|---|
| **Test Case ID** | TC-003 |
| **Test Case Description** | Credit the account with a zero amount |
| **Pre-conditions** | Start with a balance of `1000.00` |
| **Test Steps** | 1. Select menu option `2`.<br>2. Enter `0.00`.<br>3. Select option `1` to verify the balance. |
| **Expected Result** | The balance remains `1000.00`. |
| **Actual Result** | |
| **Status (Pass/Fail)** | |
| **Comments** | |

## TC-004: Debit a Valid Amount

| Test Plan Field | Value |
|---|---|
| **Test Case ID** | TC-004 |
| **Test Case Description** | Debit the account with an amount below the balance |
| **Pre-conditions** | Start with a balance of `1000.00` |
| **Test Steps** | 1. Select menu option `3` (Debit Account).<br>2. Enter `250.00`.<br>3. Select option `1` to verify the balance. |
| **Expected Result** | The account displays `750.00` and stores the updated balance. |
| **Actual Result** | |
| **Status (Pass/Fail)** | |
| **Comments** | |

## TC-005: Debit the Entire Balance

| Test Plan Field | Value |
|---|---|
| **Test Case ID** | TC-005 |
| **Test Case Description** | Debit the entire account balance |
| **Pre-conditions** | Start with a balance of `1000.00` |
| **Test Steps** | 1. Select menu option `3`.<br>2. Enter `1000.00`.<br>3. Select option `1` to verify the balance. |
| **Expected Result** | The debit is accepted and the new balance is `0.00`. |
| **Actual Result** | |
| **Status (Pass/Fail)** | |
| **Comments** | |

## TC-006: Reject an Insufficient-Funds Debit

| Test Plan Field | Value |
|---|---|
| **Test Case ID** | TC-006 |
| **Test Case Description** | Reject a debit greater than the account balance |
| **Pre-conditions** | Start with a balance of `1000.00` |
| **Test Steps** | 1. Select menu option `3`.<br>2. Enter `1000.01`.<br>3. Select option `1` to verify the balance. |
| **Expected Result** | The application displays `Insufficient funds for this debit.` and the balance remains `1000.00`. |
| **Actual Result** | |
| **Status (Pass/Fail)** | |
| **Comments** | |

## TC-007: Reject a Debit After Prior Transactions

| Test Plan Field | Value |
|---|---|
| **Test Case ID** | TC-007 |
| **Test Case Description** | Reject a debit after prior credits and debits |
| **Pre-conditions** | Complete a `250.00` credit and a `100.00` debit |
| **Test Steps** | 1. Verify the balance is `1150.00`.<br>2. Select menu option `3`.<br>3. Enter `1150.01`.<br>4. Select option `1` to verify the balance. |
| **Expected Result** | The debit is rejected and the balance remains `1150.00`. |
| **Actual Result** | |
| **Status (Pass/Fail)** | |
| **Comments** | |

## TC-008: Debit Zero

| Test Plan Field | Value |
|---|---|
| **Test Case ID** | TC-008 |
| **Test Case Description** | Debit the account with a zero amount |
| **Pre-conditions** | Start with a balance of `1000.00` |
| **Test Steps** | 1. Select menu option `3`.<br>2. Enter `0.00`.<br>3. Select option `1` to verify the balance. |
| **Expected Result** | The balance remains `1000.00`. |
| **Actual Result** | |
| **Status (Pass/Fail)** | |
| **Comments** | |

## TC-009: Exit the Application

| Test Plan Field | Value |
|---|---|
| **Test Case ID** | TC-009 |
| **Test Case Description** | Exit the application using menu option `4` |
| **Pre-conditions** | Start the application |
| **Test Steps** | 1. Select menu option `4` (Exit). |
| **Expected Result** | The application displays `Exiting the program. Goodbye!` and terminates. |
| **Actual Result** | |
| **Status (Pass/Fail)** | |
| **Comments** | |

## TC-010: Invalid Menu Choices

| Test Plan Field | Value |
|---|---|
| **Test Case ID** | TC-010 |
| **Test Case Description** | Enter unsupported menu choices |
| **Pre-conditions** | Start the application |
| **Test Steps** | 1. Enter `0`.<br>2. Enter `5`.<br>3. Enter a non-digit value if supported.<br>4. Enter a valid menu option. |
| **Expected Result** | Unsupported choices display `Invalid choice, please select 1-4.` and the menu remains usable. |
| **Actual Result** | |
| **Status (Pass/Fail)** | |
| **Comments** | |

## TC-011: Sequential Account Operations

| Test Plan Field | Value |
|---|---|
| **Test Case ID** | TC-011 |
| **Test Case Description** | Apply sequential account operations |
| **Pre-conditions** | Start with a balance of `1000.00` |
| **Test Steps** | 1. Credit `125.50`.<br>2. View the balance.<br>3. Debit `75.25`.<br>4. View the balance.<br>5. Attempt to debit `1050.00`.<br>6. View the balance. |
| **Expected Result** | The balances are `1125.50`, `1050.25`, and remain `1050.25` after the rejected debit. |
| **Actual Result** | |
| **Status (Pass/Fail)** | |
| **Comments** | |

## TC-012: Numeric Precision

| Test Plan Field | Value |
|---|---|
| **Test Case ID** | TC-012 |
| **Test Case Description** | Verify fixed two-decimal-place precision |
| **Pre-conditions** | Start with a balance of `1000.00` |
| **Test Steps** | 1. Credit `12.34`.<br>2. Debit `2.10`.<br>3. View the balance. |
| **Expected Result** | The final balance is `1010.24`. |
| **Actual Result** | |
| **Status (Pass/Fail)** | |
| **Comments** | |

## TC-013: Maximum Supported Balance

| Test Plan Field | Value |
|---|---|
| **Test Case ID** | TC-013 |
| **Test Case Description** | Verify the maximum supported account amount |
| **Pre-conditions** | Set or reach a balance of `999999.99` |
| **Test Steps** | 1. View the balance.<br>2. Debit `999999.99`.<br>3. View the balance. |
| **Expected Result** | The full balance debit produces `0.00`. |
| **Actual Result** | |
| **Status (Pass/Fail)** | |
| **Comments** | |

## TC-014: Credit Overflow

| Test Plan Field | Value |
|---|---|
| **Test Case ID** | TC-014 |
| **Test Case Description** | Verify behavior when a credit exceeds the numeric field capacity |
| **Pre-conditions** | Set or reach a balance of `999999.99` |
| **Test Steps** | 1. Attempt to credit a positive amount.<br>2. View the balance. |
| **Expected Result** | The implementation rejects or clearly reports overflow without producing a negative, truncated, or incorrect balance. |
| **Actual Result** | |
| **Status (Pass/Fail)** | |
| **Comments** | This legacy COBOL field cannot represent an integer part above six digits. |
