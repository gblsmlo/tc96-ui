import { mergeRecordPreviewLabels } from '../shared/merge-labels'
import type {
  RecordPreview6Labels,
  RecordPreview6LabelsOverride,
} from './types'

export const defaultRecordPreview6Labels: RecordPreview6Labels = {
  close: 'Close details',
  date: {},
  expand: 'Open full screen',
  fallbackTitle: 'Entry',
  fields: {
    account: 'Account',
    amount: 'Amount',
    category: 'Category',
    contract: 'Contract',
    costCenter: 'Cost center',
    due: 'Due date',
    installment: 'Installment',
    payer: 'Payer',
    responsible: 'Owner',
    situation: 'Situation',
    target: 'Case or lawsuit',
    type: 'Type',
  },
  groups: {
    classification: 'Classification',
    origin: 'Origin',
    summary: 'Summary',
  },
  installmentOf: (number, count) => `${number} of ${count}`,
  kinds: {
    client_money_in: 'Client money',
    client_money_out: 'Client payout',
    expense: 'Expense',
    expense_reimbursement: 'Expense reimbursement',
    fee: 'Income',
    other_income: 'Income',
    transfer: 'Transfer',
  },
  more: 'More actions',
  noAccount: 'No account',
  noCategory: 'No category',
  noCostCenter: 'No cost center',
  noPayer: 'No payer',
  noResponsible: 'No owner',
  noTarget: 'No case or lawsuit',
  select: {},
  settle: 'Settle',
  situations: {
    canceled: 'Canceled',
    open: 'Open',
    overdue: 'Overdue',
    renegotiated: 'Renegotiated',
    settled: 'Settled',
  },
  status: {
    errorDescription: 'Close the details and try again.',
    errorTitle: 'The entry could not be loaded',
    loading: 'Loading the entry',
    notFoundDescription: 'It may have been deleted or moved to another page.',
    notFoundTitle: 'Entry not found',
    retry: 'Try again',
  },
  transferAccounts: (from, to) => `${from} → ${to}`,
}

export function resolveRecordPreview6Labels(
  labels?: RecordPreview6LabelsOverride,
): RecordPreview6Labels {
  return mergeRecordPreviewLabels(defaultRecordPreview6Labels, labels, [
    'fields',
    'groups',
    'kinds',
    'situations',
    'status',
  ])
}
