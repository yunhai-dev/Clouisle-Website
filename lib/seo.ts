export const SITE_URL = 'https://clouisle.asia';
export const SITE_DOMAIN = 'clouisle.asia';

export const DEFAULT_OG_IMAGE = '/images/admin-panel.png';
export const DEFAULT_OG_IMAGE_ALT = 'Clouisle enterprise AI platform interface';
export const DEFAULT_OG_IMAGE_WIDTH = 2528;
export const DEFAULT_OG_IMAGE_HEIGHT = 1682;

export function isZh(lang: string): boolean {
  return lang === 'zh';
}

export function getAlternateLang(lang: string): 'en' | 'zh' {
  return isZh(lang) ? 'en' : 'zh';
}

export function getSiteName(lang: string): string {
  return isZh(lang) ? '云屿' : 'Clouisle';
}

export function getLocale(lang: string): string {
  return isZh(lang) ? 'zh_CN' : 'en_US';
}

export function getLanguageTag(lang: string): string {
  return isZh(lang) ? 'zh-CN' : 'en-US';
}

export function getHomeSeoCopy(lang: string): {
  title: string;
  description: string;
  keywords: string[];
} {
  if (isZh(lang)) {
    return {
      title: '云屿 - 企业级 AI 平台 V0.2.9 公测',
      description: '云屿 V0.2.9 全面开放公测，将 AI Agent、工作流编排与企业级知识检索整合到同一平台',
      keywords: [
        '企业级AI平台',
        '企业AI平台',
        'AI Agent',
        'AI智能体平台',
        'AI智能体开发平台',
        '多智能体编排',
        '智能体工作流',
        'AI工作流',
        '工作流编排',
        '工作流自动化',
        '企业知识库',
        '企业AI知识库',
        '知识库问答',
        '知识库检索',
        '检索增强生成',
        'RAG',
        'Agentic RAG',
        '私有化部署',
        '企业AI解决方案',
        '云屿',
        'Clouisle',
      ],
    };
  }

  return {
    title: 'Clouisle - Enterprise AI Platform V0.2.9 Public Beta',
    description:
      'Clouisle V0.2.9 is in public beta, combining AI agents, workflow orchestration, and enterprise-grade knowledge retrieval into one platform',
    keywords: [
      'enterprise AI platform',
      'AI agents',
      'agent platform',
      'multi-agent orchestration',
      'AI workflow',
      'workflow orchestration',
      'workflow automation',
      'enterprise knowledge base',
      'AI knowledge base',
      'knowledge base software',
      'knowledge retrieval',
      'retrieval augmented generation',
      'RAG',
      'agentic RAG',
      'private deployment',
      'enterprise AI solution',
      'Clouisle',
    ],
  };
}

const DOC_BASE_KEYWORDS_ZH = [
  '企业级AI文档',
  'AI平台文档',
  'AI Agent',
  '工作流编排',
  '企业知识库',
  'RAG',
  '私有化部署',
  '云屿',
  'Clouisle',
];

const DOC_BASE_KEYWORDS_EN = [
  'enterprise AI docs',
  'AI platform documentation',
  'AI agents',
  'workflow orchestration',
  'enterprise knowledge base',
  'RAG',
  'private deployment',
  'Clouisle',
];

const DOC_KEYWORD_RULES = [
  {
    match: /knowledge-base|知识库/i,
    zh: ['企业AI知识库', '知识库问答', '知识库检索', '向量数据库', '语义检索', '混合检索'],
    en: [
      'AI knowledge base',
      'knowledge base for AI agents',
      'vector database',
      'semantic search',
      'hybrid retrieval',
    ],
  },
  {
    match: /workflow|workflows|工作流/i,
    zh: ['AI工作流', '智能体工作流', '工作流自动化', '工作流引擎', '流程编排'],
    en: ['AI workflow', 'agent workflow', 'workflow automation', 'workflow engine', 'flow orchestration'],
  },
  {
    match: /rag|检索/i,
    zh: ['检索增强生成', 'Agentic RAG', '向量检索', '重排序'],
    en: ['retrieval augmented generation', 'agentic RAG', 'vector retrieval', 'reranking'],
  },
  {
    match: /agent|agents|智能体/i,
    zh: ['AI智能体', '企业智能体平台', '多智能体系统'],
    en: ['AI agents', 'enterprise agent platform', 'multi-agent systems'],
  },
];

export function getDocKeywords(lang: string, pageUrl?: string, title?: string): string[] {
  const zh = isZh(lang);
  const base = zh ? DOC_BASE_KEYWORDS_ZH : DOC_BASE_KEYWORDS_EN;
  const text = `${pageUrl ?? ''} ${title ?? ''}`;

  const matchedKeywords = DOC_KEYWORD_RULES.flatMap((rule) => {
    if (!rule.match.test(text)) return [];
    return zh ? rule.zh : rule.en;
  });

  return Array.from(
    new Set([
      ...base,
      ...matchedKeywords,
      getSiteName(lang),
      'Clouisle',
    ]),
  );
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
