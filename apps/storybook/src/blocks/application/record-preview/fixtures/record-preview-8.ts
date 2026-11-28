import type {
  RecordPreview8LabelsOverride,
  RecordPreview8Person,
  RecordPreview8Record,
} from '@tc96/ui/blocks/application/record-preview/record-preview-8'
import type { PropertyOption } from '@tc96/ui/patterns/properties/core'

export const deadlinePreviewLabels: RecordPreview8LabelsOverride = {
  close: 'Fechar detalhes',
  confirm: 'Confirmar',
  decisions: 'Decidir sobre a proposta',
  expand: 'Abrir em tela completa',
  fallbackTitle: 'Prazo',
  fields: {
    client: 'Cliente',
    daysLeft: 'Faltam',
    fatalDate: 'Data fatal',
    internalDate: 'Data interna',
    kind: 'Tipo',
    label: 'Prazo',
    lawsuit: 'Processo',
    responsible: 'Responsável',
    status: 'Status',
  },
  groups: { properties: 'Propriedades' },
  noClient: 'Sem cliente',
  noDate: 'Sem data',
  noDaysLeft: 'Não contado',
  noKind: 'Sem tipo',
  noLawsuit: 'Sem processo',
  noResponsible: 'Sem responsável',
  reject: 'Rejeitar',
  status: {
    errorDescription: 'Feche os detalhes e tente de novo.',
    errorTitle: 'Não foi possível carregar o prazo',
    loading: 'Carregando o prazo',
    notFoundDescription:
      'Ele pode ter saído desta fila. Feche os detalhes e confira os filtros.',
    notFoundTitle: 'Prazo não encontrado',
    retry: 'Tentar de novo',
  },
  statuses: {
    cancelled: 'Cancelado',
    done: 'Concluído',
    drafting: 'Em elaboração',
    filed: 'Protocolado',
    missed: 'Perdido',
    no_action: 'Sem providência',
    open: 'Aberto',
    proposed: 'Proposto',
  },
}

export const deadlineKinds: readonly PropertyOption[] = [
  { label: 'Contestação', value: 'answer' },
  { label: 'Recurso de apelação', value: 'appeal' },
  { label: 'Personalizado', value: 'custom' },
]

export const deadlinePeople: readonly RecordPreview8Person[] = [
  { fallback: 'AL', label: 'Ana Lima', value: 'ana' },
  { fallback: 'BR', label: 'Bruno Reis', value: 'bruno' },
]

export const deadlineRecord: RecordPreview8Record = {
  clientNames: ['Acme Construções', 'Ada Lovelace'],
  daysLeft: '3 dias úteis',
  deadlineStatus: 'open',
  fatalDate: '2026-12-14',
  id: 'deadline_0031',
  internalDate: '2026-12-09',
  kind: 'answer',
  label: 'Contestação ao pedido de tutela',
  lawsuitTitle: 'Ação de cobrança',
  responsibleId: 'ana',
}

export const proposedDeadlineRecord: RecordPreview8Record = {
  ...deadlineRecord,
  deadlineStatus: 'proposed',
  id: 'deadline_0032',
  label: 'Recurso contra a sentença',
  kind: 'appeal',
}

export const DEADLINE_TIME_ZONE = 'America/Sao_Paulo'
