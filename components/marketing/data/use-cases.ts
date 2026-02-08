import type { Locale, UseCase } from './types';

export const useCases: Record<Locale, UseCase[]> = {
  en: [
    {
      title: 'Enterprise Knowledge Copilot',
      description:
        'Deliver trustworthy answers grounded in internal documents, policies, and systems.',
    },
    {
      title: 'Cross-Team Process Automation',
      description:
        'Automate business workflows that mix LLM reasoning, APIs, approval gates, and notifications.',
    },
    {
      title: 'Compliance & Risk Operations',
      description:
        'Standardize contract, policy, and regulatory analysis with auditable AI execution.',
    },
    {
      title: 'Customer Support Intelligence',
      description:
        'Empower support teams with agent-driven triage, retrieval, and guided resolutions.',
    },
  ],
  zh: [
    {
      title: '企业知识问答助手',
      description: '基于内部文档、制度与系统数据提供可追溯、可验证的智能回答。',
    },
    {
      title: '跨团队流程自动化',
      description: '将 LLM 推理、API 调用、审批节点与通知机制整合为可复用业务流程。',
    },
    {
      title: '合规与风控运营',
      description: '对合同、制度与监管文档进行标准化分析，并保留完整审计轨迹。',
    },
    {
      title: '客户支持智能化',
      description: '通过 Agent 进行问题分流、知识检索与解决方案推荐，提升支持效率。',
    },
  ],
};
