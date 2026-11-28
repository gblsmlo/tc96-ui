import type {
  RecordPreview10LabelsOverride,
  RecordPreview10Record,
} from '@tc96/ui/blocks/application/record-preview/record-preview-10'

export const FAILURE_TIME_ZONE = 'America/Sao_Paulo'

export const failurePreviewLabels: RecordPreview10LabelsOverride = {
  checkedOf: (day, found) =>
    `Conferido em ${day}: ${found === 1 ? '1 publicação encontrada' : `${found} publicações encontradas`}.`,
  close: 'Fechar falha',
  copied: 'Detalhes copiados.',
  copy: 'Copiar detalhes para o suporte',
  copyFailed: 'Não foi possível copiar. Tente de novo.',
  dismiss: 'Fechar',
  expand: 'Abrir em Falhas',
  fallbackTitle: 'Falha',
  groups: {
    publication: 'Publicação sem proposta',
    resolution: 'Resolução',
    runs: 'Execuções da captura',
    views: 'Quem viu',
    window: 'Janela que pode estar sem publicações',
  },
  holderOf: (name) => `Titular: ${name}`,
  kinds: {
    capture_stopped: 'Captura parada',
    oab_silent: 'OAB sem publicações',
    proposal_failed: 'Proposta de prazo não gerada',
  },
  lastPublishedOn: (day) => `Última publicação em ${day}.`,
  noViews: 'Ninguém abriu esta falha ainda.',
  openLawsuit: 'Ver no Processo',
  openRuns: 'Ver execuções',
  origins: {
    external: 'Fonte externa',
    registration: 'Cadastro',
    system: 'Sistema',
  },
  resolutions: {
    checked_by_hand: 'Conferido à mão',
    false_alarm: 'Falso alarme',
    no_publication: 'Sem publicação mesmo',
    registration_fixed: 'Cadastro corrigido',
    system: 'Resolvida pelo sistema',
  },
  resolve: 'Resolver',
  resolvedBy: (name, when) => `Por ${name} em ${when}`,
  runKinds: {
    'court-sweep': 'Varredura do DJEN',
    'lawsuit-import': 'Importação',
    'oab-lookup': 'Busca por OAB',
  },
  runStates: {
    dead: 'Falhou',
    done: 'Concluída',
    failed: 'Falhou, vai tentar de novo',
    queued: 'Na fila',
    running: 'Rodando',
  },
  seenBy: (name, when) => `${name} em ${when}`,
  silenceOf: (oab, count, limit) =>
    `OAB ${oab}: ${count} dias úteis sem publicações, acima do maior intervalo de ${limit} dias.`,
  simulated: 'Simulado',
  states: { open: 'Aberta', resolved: 'Resolvida' },
  status: {
    errorDescription: 'Feche os detalhes e tente de novo.',
    errorTitle: 'Não foi possível carregar a falha',
    loading: 'Carregando a falha',
    notFoundDescription: 'Ela pode ter sido resolvida há mais de 90 dias.',
    notFoundTitle: 'Falha não encontrada',
    retry: 'Tentar de novo',
  },
  unresolved: 'Aberta, aguardando resolução.',
  windowOf: (oab, from, to) => `OAB ${oab}: ${from} a ${to}`,
}

export const openFailureRecord: RecordPreview10Record = {
  id: 'failure_0021',
  kind: 'oab_silent',
  origin: 'system',
  publicationHasLawsuit: true,
  resolution: null,
  resolutionNote: null,
  resolvedBy: null,
  runs: [
    {
      id: 'run_501',
      kind: 'court-sweep',
      startedAt: '2026-12-08T11:00:00.000Z',
      state: 'done',
    },
    {
      id: 'run_502',
      kind: 'oab-lookup',
      startedAt: '2026-12-09T11:00:00.000Z',
      state: 'dead',
    },
  ],
  silence: {
    count: 14,
    holderName: 'Ana Lima',
    lastPublishedOn: '2026-11-19',
    limit: 9,
    oab: '123456/SP',
  },
  state: 'open',
  supportText: '{"failure":21,"kind":"oab_silent","occurrences":3}',
  views: [{ name: 'Bruno Reis', seenAt: '2026-12-09T14:30:00.000Z' }],
  windows: [{ from: '2026-11-20', oab: '123456/SP', to: '2026-12-09' }],
}

export const resolvedFailureRecord: RecordPreview10Record = {
  ...openFailureRecord,
  id: 'failure_0022',
  kind: 'capture_stopped',
  origin: 'external',
  publicationHasLawsuit: false,
  resolution: 'checked_by_hand',
  resolutionNote: { checkedOn: '2026-12-09', found: 2 },
  resolvedBy: { at: '2026-12-09T15:10:00.000Z', name: 'Ana Lima' },
  silence: null,
  state: 'resolved',
  windows: [],
}
