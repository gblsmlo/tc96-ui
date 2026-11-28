import type {
  RecordPreview5LabelsOverride,
  RecordPreview5Person,
  RecordPreview5Record,
  RecordPreview5TypeColors,
} from '@tc96/ui/blocks/application/record-preview/record-preview-5'
import { ptBRPropertyLabels } from '../../../../patterns/properties/properties-labels.ts'

export const documentsPreviewLabels: RecordPreview5LabelsOverride = {
  close: 'Fechar detalhes',
  copyAddress: 'Copiar endereço',
  copyId: 'Copiar ID',
  download: 'Baixar',
  expand: 'Abrir em tela completa',
  fields: {
    address: 'Endereço',
    createdAt: 'Criado em',
    location: 'Vinculado a',
    name: 'Nome',
    owner: 'Responsável',
    pinned: 'Fixado',
    size: 'Tamanho',
    type: 'Tipo',
    updatedAt: 'Atualizado em',
  },
  groups: { properties: 'Propriedades', record: 'Registro' },
  noAddress: 'Sem endereço',
  more: 'Mais ações',
  noLocation: 'Sem vínculo',
  noName: 'Sem nome',
  noOwner: 'Sem responsável',
  noSize: 'Sem tamanho',
  openRecord: 'Abrir',
  pinned: { no: 'Não', yes: 'Sim' },
  select: ptBRPropertyLabels.select,
  text: ptBRPropertyLabels.text,
  types: {
    audio: 'Áudio',
    document: 'Documento',
    image: 'Imagem',
    link: 'Link',
    note: 'Nota',
    video: 'Vídeo',
  },
}

export const documentsTypeColors: RecordPreview5TypeColors = {
  audio: '#0891b2',
  document: '#2563eb',
  image: '#db2777',
  link: '#059669',
  note: '#d97706',
  video: '#7c3aed',
}

export const documentsPeople: readonly RecordPreview5Person[] = [
  { fallback: 'BN', label: 'Beatriz Nogueira', value: 'beatriz' },
  { fallback: 'RA', label: 'Rafael Antunes', value: 'rafael' },
]

const preview = (from: string, to: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 90"><defs><linearGradient id="g" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="160" height="90" fill="url(#g)"/></svg>`,
  )}`

export const documentRecord: RecordPreview5Record = {
  createdAt: '2026-10-14T12:00:00.000Z',
  description: 'Contrato de fornecimento com vigência de 24 meses.',
  id: 'doc-201',
  kind: 'file',
  location: 'Contrato de fornecimento da Moinho Santa Clara',
  name: 'Contrato de fornecimento assinado.pdf',
  ownerId: 'rafael',
  pinned: true,
  size: '2,4 MB',
  type: 'document',
  updatedAt: '2026-11-25T11:05:00.000Z',
}

export const imageRecord: RecordPreview5Record = {
  createdAt: '2026-11-20T12:00:00.000Z',
  id: 'doc-204',
  kind: 'file',
  name: 'Foto da fachada do imóvel.jpg',
  ownerId: 'beatriz',
  pinned: false,
  previewUrl: preview('#f9a8d4', '#be185d'),
  size: '3,1 MB',
  type: 'image',
  updatedAt: '2026-11-23T16:30:00.000Z',
}

export const linkRecord: RecordPreview5Record = {
  createdAt: '2026-11-02T12:00:00.000Z',
  id: 'doc-203',
  kind: 'link',
  name: 'Consulta processual do TJSP',
  ownerId: 'beatriz',
  pinned: false,
  type: 'link',
  updatedAt: '2026-11-22T10:15:00.000Z',
  url: 'https://esaj.tjsp.jus.br/cpopg/open.do',
}

export const DOCUMENTS_TIME_ZONE = 'America/Sao_Paulo'
