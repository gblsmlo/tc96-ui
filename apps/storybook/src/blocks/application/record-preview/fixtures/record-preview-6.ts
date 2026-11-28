import type {
  RecordPreview6Category,
  RecordPreview6LabelsOverride,
  RecordPreview6Person,
  RecordPreview6Record,
} from '@tc96/ui/blocks/application/record-preview/record-preview-6'
import type { PropertyOption } from '@tc96/ui/patterns/properties/core'
import { ptBRPropertyLabels } from '../../../../patterns/properties/properties-labels.ts'

export const entryPreviewLabels: RecordPreview6LabelsOverride = {
  close: 'Fechar detalhes',
  date: ptBRPropertyLabels.date,
  expand: 'Abrir em tela completa',
  fallbackTitle: 'Lançamento',
  fields: {
    account: 'Conta',
    amount: 'Valor',
    category: 'Categoria',
    contract: 'Contrato',
    costCenter: 'Centro de custo',
    due: 'Vencimento',
    installment: 'Parcela',
    payer: 'Pagador',
    responsible: 'Responsável',
    situation: 'Situação',
    target: 'Caso ou processo',
    type: 'Tipo',
  },
  groups: {
    classification: 'Classificação',
    origin: 'Origem',
    summary: 'Resumo',
  },
  installmentOf: (number, count) => `${number} de ${count}`,
  more: 'Mais ações',
  kinds: {
    client_money_in: 'Valor do cliente',
    client_money_out: 'Repasse ao cliente',
    expense: 'Despesa',
    expense_reimbursement: 'Reembolso de despesa',
    fee: 'Receita',
    other_income: 'Receita',
    transfer: 'Transferência',
  },
  noAccount: 'Sem conta',
  noCategory: 'Sem categoria',
  noCostCenter: 'Sem centro de custo',
  noPayer: 'Sem pagador',
  noResponsible: 'Sem responsável',
  noTarget: 'Sem caso ou processo',
  select: { emptyOption: 'Sem categoria', fallback: '—' },
  settle: 'Quitar',
  situations: {
    canceled: 'Cancelado',
    open: 'Em aberto',
    overdue: 'Vencido',
    renegotiated: 'Renegociado',
    settled: 'Quitado',
  },
  status: {
    errorDescription: 'Feche os detalhes e tente de novo.',
    errorTitle: 'Não foi possível carregar o lançamento',
    loading: 'Carregando o lançamento',
    notFoundDescription: 'Ele pode ter sido excluído ou estar em outra página.',
    notFoundTitle: 'Lançamento não encontrado',
    retry: 'Tentar de novo',
  },
  transferAccounts: (from, to) => `${from} → ${to}`,
}

export const entryAccounts: readonly PropertyOption[] = [
  { label: 'Itaú Empresas', value: 'acc-itau' },
  { label: 'Caixa interno', value: 'acc-cash' },
]

export const entryCategories: readonly RecordPreview6Category[] = [
  { direction: 'income', label: 'Honorários contratuais', value: 'cat-fees' },
  { direction: 'income', label: 'Honorários de êxito', value: 'cat-success' },
  { direction: 'expense', label: 'Aluguel', value: 'cat-rent' },
  { direction: 'expense', label: 'Custas judiciais', value: 'cat-court-fees' },
]

export const entryCostCenters: readonly PropertyOption[] = [
  { label: 'Contencioso cível', value: 'cc-civil' },
  { label: 'Trabalhista', value: 'cc-labor' },
]

export const entryMembers: readonly RecordPreview6Person[] = [
  { fallback: 'AL', label: 'Ana Lima', value: 'ana' },
  { fallback: 'BR', label: 'Bruno Reis', value: 'bruno' },
]

export const entryRecord: RecordPreview6Record = {
  accountId: 'acc-itau',
  amountCents: 450_000,
  canEdit: true,
  canSettle: true,
  categoryId: 'cat-fees',
  contractTitle: 'Honorários 2026/014',
  costCenterId: 'cc-civil',
  dueOn: '2026-12-10',
  id: 'entry_0318',
  installmentCount: 6,
  installmentNumber: 3,
  kind: 'fee',
  payer: 'Acme Construções',
  responsibleId: 'ana',
  situation: 'open',
  target: 'Ação de cobrança · 0001000-21.2026.8.26.0100',
  title: 'Honorários, parcela 3 de 6',
}
