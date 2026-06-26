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
      title: '云屿 - 企业级 AI 平台',
      description: '云屿将 AI Agent、工作流编排与企业级知识检索整合到同一平台，帮助团队安全落地生产级 AI',
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

export interface ContactCopy {
  title: string;
  description: string;
  keywords: string[];
  jsonLd: {
    name: string;
    description: string;
  };
  form: {
    appellationLabel: string;
    appellationPlaceholder: string;
    contentLabel: string;
    contentPlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    successHint: string;
    cooldown: string;
    sendAnother: string;
    errorPrefix: string;
    errorNetwork: string;
    errorGeneric: string;
  };
}

export function getContactCopy(lang: string): ContactCopy {
  if (isZh(lang)) {
    return {
      title: '联系我们 - 云屿',
      description:
        '留下您的联系方式与咨询内容，云屿团队将在 1 个工作日内与您取得联系，介绍企业级 AI 平台部署方案。',
      keywords: [
        '云屿联系方式',
        '云屿咨询',
        '企业AI咨询',
        'AI平台咨询',
        '私有化部署咨询',
        '云屿',
        'Clouisle',
      ],
      jsonLd: {
        name: '联系云屿',
        description:
          '留下您的联系方式与咨询内容，云屿团队将在 1 个工作日内与您取得联系。',
      },
      form: {
        appellationLabel: '称呼',
        appellationPlaceholder: '请输入您的称呼',
        contentLabel: '咨询内容',
        contentPlaceholder: '请简要描述您的需求或想了解的内容',
        contactLabel: '手机号或微信号',
        contactPlaceholder: '请填写 11 位手机号或 6 位以上微信号',
        companyLabel: '公司名称',
        companyPlaceholder: '请输入您的公司名称',
        submit: '提交咨询',
        submitting: '正在提交…',
        success: '提交成功，感谢您的关注！',
        successHint: '我们将在 1 个工作日内通过您留下的联系方式与您取得联系。',
        cooldown: '（{seconds} 秒后可再次提交）',
        sendAnother: '再次提交',
        errorPrefix: '提交失败：',
        errorNetwork: '网络异常，请稍后重试',
        errorGeneric: '请稍后重试，如问题持续请联系管理员',
      },
    };
  }

  return {
    title: 'Contact - Clouisle',
    description:
      'Get in touch with the Clouisle team. Share your contact details and we will reach out within one business day to discuss enterprise AI deployment.',
    keywords: [
      'contact Clouisle',
      'enterprise AI consultation',
      'AI platform inquiry',
      'private deployment',
      'Clouisle',
    ],
    jsonLd: {
      name: 'Contact Clouisle',
      description:
        'Get in touch with the Clouisle team to discuss enterprise AI deployment.',
    },
    form: {
      appellationLabel: 'Name',
      appellationPlaceholder: 'Your name',
      contentLabel: 'How can we help?',
      contentPlaceholder: 'Briefly describe what you would like to discuss',
      contactLabel: 'Phone or WeChat ID',
      contactPlaceholder:
        '11-digit phone (1[3-9]xxxxxxxxx) or 6+ character WeChat ID',
      companyLabel: 'Company',
      companyPlaceholder: 'Your company name',
      submit: 'Send inquiry',
      submitting: 'Sending…',
      success: 'Thanks! Your inquiry has been received.',
      successHint: 'We will reach out within one business day using the contact you provided.',
      cooldown: '(you can submit again in {seconds}s)',
      sendAnother: 'Send another',
      errorPrefix: 'Submission failed: ',
      errorNetwork: 'Network error, please try again',
      errorGeneric: 'Please try again later, or contact support if the issue persists',
    },
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
