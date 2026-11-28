import type {
  RecordPreview11LabelsOverride,
  RecordPreview11Record,
} from '@tc96/ui/blocks/application/record-preview/record-preview-11'

export const RUN_TIME_ZONE = 'America/Sao_Paulo'

export const runPreviewLabels: RecordPreview11LabelsOverride = {
  close: 'Fechar detalhes',
  fallbackTitle: 'Execução',
  fields: {
    createdAt: 'Na fila desde',
    duration: 'Duração',
    error: 'Último erro',
    failure: 'Falha',
    finishedAt: 'Fim',
    kind: 'Tipo',
    movements: 'Andamentos',
    publications: 'Publicações',
    startedAt: 'Início',
    state: 'Situação',
  },
  groups: { properties: 'Propriedades', result: 'Resultado' },
  kinds: {
    'court-sweep': 'Varredura do DJEN',
    'lawsuit-import': 'Importação',
    'oab-lookup': 'Busca por OAB',
  },
  noDate: 'Sem data',
  noError: 'Sem erro',
  noValue: '—',
  openFailure: 'Ver falha',
  simulated: 'Simulado',
  states: {
    dead: 'Falhou',
    done: 'Concluída',
    failed: 'Falhou, vai tentar de novo',
    queued: 'Na fila',
    running: 'Rodando',
  },
  status: {
    errorDescription: 'Feche os detalhes e tente de novo.',
    errorTitle: 'Não foi possível carregar a execução',
    loading: 'Carregando a execução',
    notFoundDescription:
      'Ela pode ter saído das últimas 30 execuções. Feche os detalhes e confira a lista.',
    notFoundTitle: 'Execução não encontrada',
    retry: 'Tentar de novo',
  },
}

export const failedRunRecord: RecordPreview11Record = {
  createdAt: '2026-12-09T13:00:00.000Z',
  duration: '2 min 5 s',
  error:
    'O DJEN não respondeu a tempo. A próxima tentativa fica para a varredura das 8h.',
  errorSimulated: true,
  failureId: '88',
  finishedAt: '2026-12-09T13:03:10.000Z',
  id: 'run_502',
  kind: 'court-sweep',
  movements: null,
  publications: 0,
  startedAt: '2026-12-09T13:01:05.000Z',
  state: 'dead',
}

export const doneRunRecord: RecordPreview11Record = {
  createdAt: '2026-12-08T13:00:00.000Z',
  duration: '48 s',
  error: null,
  failureId: null,
  finishedAt: '2026-12-08T13:00:53.000Z',
  id: 'run_501',
  kind: 'oab-lookup',
  movements: 12,
  publications: 4,
  startedAt: '2026-12-08T13:00:05.000Z',
  state: 'done',
}
