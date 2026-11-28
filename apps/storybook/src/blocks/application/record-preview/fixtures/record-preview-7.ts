import type {
  RecordPreview7LabelsOverride,
  RecordPreview7Person,
  RecordPreview7Record,
} from '@tc96/ui/blocks/application/record-preview/record-preview-7'
import type { PropertyOption } from '@tc96/ui/patterns/properties/core'
import { ptBRPropertyLabels } from '../../../../patterns/properties/properties-labels.ts'

export const matterPreviewLabels: RecordPreview7LabelsOverride = {
  close: 'Fechar detalhes',
  copyId: 'Copiar ID',
  expand: 'Abrir em tela completa',
  fallbackTitle: 'Caso',
  fields: {
    contract: 'Contrato',
    createdAt: 'Criado em',
    id: 'ID',
    number: 'Número',
    phase: 'Fase',
    responsible: 'Responsável',
    tags: 'Tags',
    updatedAt: 'Atualizado em',
  },
  groups: { properties: 'Propriedades', record: 'Registros' },
  noContract: 'Sem contrato',
  noNumber: 'sem número',
  noPhase: 'Sem fase',
  noResponsible: 'Sem responsável',
  select: ptBRPropertyLabels.select,
  status: {
    errorDescription: 'Feche os detalhes e tente de novo.',
    errorTitle: 'Não foi possível carregar o caso',
    loading: 'Carregando o caso',
    notFoundDescription:
      'Ele pode ter sido excluído ou você não tem mais acesso.',
    notFoundTitle: 'Caso não encontrado',
    retry: 'Tentar de novo',
  },
  tagPicker: ptBRPropertyLabels.tags,
  tagsPlaceholder: 'Adicionar uma tag',
  text: ptBRPropertyLabels.text,
}

export const matterPhases: readonly PropertyOption[] = [
  { label: 'Análise inicial', value: 'analysis' },
  { label: 'Negociação', value: 'negotiation' },
  { label: 'Aguardando cliente', value: 'waiting-client' },
  { label: 'Concluído', value: 'done' },
]

export const matterContracts: readonly PropertyOption[] = [
  { label: 'Honorários 2026/014', value: 'contract-14' },
  { label: 'Êxito 2026/021', value: 'contract-21' },
]

export const matterTags: readonly PropertyOption[] = [
  { label: 'Urgente', tone: 'danger', value: 'urgent' },
  { label: 'Cliente', tone: 'info', value: 'client' },
  { label: 'Prazo', tone: 'warning', value: 'deadline' },
]

export const matterPeople: readonly RecordPreview7Person[] = [
  { fallback: 'AL', label: 'Ana Lima', value: 'ana' },
  { fallback: 'BR', label: 'Bruno Reis', value: 'bruno' },
]

export const matterRecord: RecordPreview7Record = {
  contractId: 'contract-14',
  createdAt: '2026-10-01T12:00:00.000Z',
  description: 'Consulta sobre a rescisão do contrato de empreitada.',
  id: 'matter_0017',
  phaseId: 'analysis',
  responsibleId: 'ana',
  tagIds: ['urgent'],
  title: 'Rescisão de contrato de empreitada',
  updatedAt: '2026-11-01T12:00:00.000Z',
}

export const MATTER_TIME_ZONE = 'America/Sao_Paulo'
