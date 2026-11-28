import type {
  RecordPreview9LabelsOverride,
  RecordPreview9Record,
} from '@tc96/ui/blocks/application/record-preview/record-preview-9'

export const publicationPreviewLabels: RecordPreview9LabelsOverride = {
  actions: {
    createDeadline: 'Criar prazo',
    createLawsuit: 'Cadastrar processo',
    createTask: 'Criar tarefa',
    discard: 'Descartar',
    linkDeadline: 'Vincular a prazo',
    linkLawsuit: 'Vincular a um processo',
    more: 'Outras ações',
    noDeadline: 'Sem prazo',
  },
  close: 'Fechar publicação',
  decisions: 'Decidir a publicação',
  expand: 'Abrir em tela completa',
  fallbackTitle: 'Publicação',
  fields: {
    availableOn: 'Disponibilizada em',
    caseNumber: 'Número CNJ',
    lawsuit: 'Processo',
    lawyers: 'Advogados',
  },
  groups: { publication: 'Publicação', text: 'Texto completo' },
  noCaseNumber: 'Sem número CNJ',
  noDate: 'Sem data',
  notRegistered: 'Não cadastrado',
  openLawsuit: 'Abrir processo',
  status: {
    errorDescription: 'Feche os detalhes e tente de novo.',
    errorTitle: 'Não foi possível carregar a publicação',
    loading: 'Carregando a publicação',
    notFoundDescription:
      'Ela pode ter saído da fila. Feche os detalhes e confira os filtros.',
    notFoundTitle: 'Publicação não encontrada',
    retry: 'Tentar de novo',
  },
  title: (kind, tribunal) => `${kind} · ${tribunal}`,
}

export const publicationText = [
  'PODER JUDICIÁRIO DO ESTADO DE SÃO PAULO',
  'COMARCA DE SÃO PAULO - FORO CENTRAL CÍVEL',
  '',
  'Processo nº 1002345-67.2026.8.26.0100',
  'Ação de cobrança - Acme Construções x Beta Materiais Ltda.',
  '',
  'Vistos. Intime-se a parte requerida, na pessoa de seu advogado, para que apresente contestação no prazo legal de quinze dias úteis, sob pena de revelia.',
  '',
  'Intime-se. Cumpra-se.',
  'São Paulo, 7 de dezembro de 2026.',
  '',
  'Último parágrafo: a secretaria certificará o decurso do prazo.',
].join('\n')

export const publicationRecord: RecordPreview9Record = {
  availableOn: '2026-12-07',
  caseNumber: '1002345-67.2026.8.26.0100',
  id: 'publication_0418',
  kind: 'Intimação',
  lawsuit: {
    caseNumber: '1002345-67.2026.8.26.0100',
    title: 'Ação de cobrança',
  },
  lawyers: ['Ana Lima (OAB 123456/SP)', 'Bruno Reis (OAB 654321/SP)'],
  text: publicationText,
  tribunal: 'TJSP',
}

export const unlinkedPublicationRecord: RecordPreview9Record = {
  ...publicationRecord,
  id: 'publication_0419',
  lawsuit: null,
}
