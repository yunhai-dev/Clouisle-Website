import type { CopyData, Locale } from './types';

export const copy: Record<Locale, CopyData> = {
  en: {
    badge: 'V0.2.9 Public Beta',
    releaseAnnouncement: {
      eyebrow: 'V0.2.9 is live',
      title: 'Public beta is now open with unlimited GPT 5.5 access.',
      body:
        'The latest release brings multimodal knowledge assets, import/export packages, admin observability, stronger Agent orchestration context, and a more reliable chat experience into open testing.',
      items: ['Open public testing', 'Unlimited GPT 5.5 supply', 'Knowledge, Agent, and workflow upgrades'],
    },
    title: 'Clouisle',
    titleSub: 'Build the intelligence layer for your business.',
    subtitle:
      'Clouisle combines AI agents, workflow orchestration, and enterprise-grade knowledge retrieval into one production platform.',
    primaryCta: 'Join Public Beta',
    secondaryCta: 'View v0.2.9',
    heroImage: '/images/admin-panel.webp',
    heroImageAlt: 'Clouisle Admin Panel',
    stats: [
      { value: 'V0.2.9', label: 'Public beta release' },
      { value: 'GPT 5.5', label: 'Unlimited beta supply' },
      { value: '15+', label: 'LLM providers' },
    ],
    trustLine: 'Designed for platform teams shipping secure AI at scale',
    whyTitle: 'From fragmented data to executable intelligence',
    whyBody:
      'Enterprise data is scattered across documents, databases, and systems — inaccessible to AI in its raw form. Clouisle bridges that gap through three layers: documents are parsed, chunked, and vector-indexed into a governed knowledge base; that knowledge is bound to agents with tools and model routing; those agents are wired into workflow automations that trigger real business actions. Every step runs under unified permission and audit controls.',
    whyPoints: [
      'Knowledge layer — parse PDFs, DOCX, XLSX and more into vector indexes; dual Naive RAG and Agentic RAG retrieval so agents find the right context for simple lookups and multi-step reasoning alike',
      'Agent layer — bind knowledge, tools, and MCP integrations to each agent; configure model routing, conversation lifecycle, and scoped permissions so every agent operates within defined boundaries',
      'Execution layer — a visual workflow builder with 15+ node types connects agent outputs to approvals, notifications, data writes, and external APIs, closing the gap between AI reasoning and business action',
    ],
    capabilitiesTitle: 'Platform capabilities',
    capabilitiesLead:
      'Each capability is designed to shorten delivery cycles, improve response quality, and reduce operational risk in enterprise AI deployments.',
    memoryEyebrow: 'Memory Layer',
    memoryTitle: 'Global user memory built for agents',
    memoryBody:
      'Clouisle maintains a persistent, permission-aware memory profile for each user. This memory is only used inside agents, helping them inherit context, preferences, and prior actions across sessions without repeated setup.',
    memoryCards: [
      {
        label: 'Persistent Context',
        title: 'Keep user profile and session context inside agents',
        summary:
          'Agents can reuse one durable memory record that carries role, preferences, recent objectives, and accepted outputs across sessions.',
        items: [
          'Role, workspace, and response preferences',
          'Recent conversations, approved drafts, and next actions',
          'Fewer repeated questions during agent handoff',
        ],
      },
      {
        label: 'Governed Recall',
        title: 'Share memory across agents within access boundaries',
        summary:
          'Memory is only available to agents, and every read or write stays scoped by tenant, team, and role policies.',
        items: [
          'Tenant isolation and retention controls',
          'RBAC-aware memory retrieval',
          'Auditable recall, update, and agent handoff events',
        ],
      },
    ],
    ragEyebrow: 'RAG Strategy',
    ragTitle: 'Naive RAG + Agentic RAG',
    ragSubtitle:
      'Use the right retrieval strategy for each business scenario. Clouisle supports both deterministic retrieval and agent-driven reasoning workflows.',
    ragModes: [
      {
        badge: 'Naive RAG',
        title: 'Fast, predictable, retrieval-first responses',
        summary:
          'Best for policy Q&A, documentation lookup, and scenarios where stable grounding and low latency are critical.',
        points: [
          'Single-pass retrieval with explicit citations',
          'Lower execution cost and shorter response path',
          'Easy to standardize and audit in production',
        ],
      },
      {
        badge: 'Agentic RAG',
        title: 'Multi-step reasoning with adaptive retrieval',
        summary:
          'Best for complex tasks requiring decomposition, iterative lookup, tool invocation, and cross-source synthesis.',
        points: [
          'Plans, retrieves, and verifies across multiple steps',
          'Can invoke tools and workflows during reasoning',
          'Delivers stronger outcomes for ambiguous requests',
        ],
      },
    ],
    advantagesTitle: 'Why teams choose Clouisle',
    advantagesSubtitle:
      'Beyond features, Clouisle delivers the operational model required for enterprise AI: governed, measurable, and production-ready.',
    advantagesEyebrow: 'Advantages',
    advantages: [
      {
        title: 'Faster Time to Value',
        description:
          'Launch pilot agents and workflows in weeks, not quarters, with reusable templates and unified orchestration.',
        proof: 'Business-ready pilot window: under 2 weeks',
        metric: '< 2w',
        metricLabel: 'Pilot to production',
      },
      {
        title: 'Production Governance',
        description:
          'Apply RBAC, SSO, audit trails, and scoped API controls across every critical workflow from day one.',
        proof: 'Compliance-friendly by default',
        metric: 'Day 1',
        metricLabel: 'Governance active',
      },
      {
        title: 'Flexible AI Stack',
        description:
          'Switch between 15+ providers and models while keeping consistent execution, observability, and policy controls.',
        proof: 'Avoid provider lock-in',
        metric: '15+',
        metricLabel: 'Model providers',
      },
      {
        title: 'Operational Clarity',
        description:
          'Track quality, latency, cost, and usage in one control plane to make AI operations visible and accountable.',
        proof: 'Runtime + governance telemetry unified',
        metric: '1',
        metricLabel: 'Unified control plane',
      },
    ],
    deliveryTitle: 'Enterprise rollout path',
    deliverySubtitle:
      'A practical delivery sequence that aligns platform teams, business owners, and compliance stakeholders.',
    deliverySteps: [
      {
        title: 'Scope the highest-value workflows',
        detail:
          'Identify 2-3 business-critical scenarios where response quality and execution speed directly impact outcomes.',
        duration: 'Week 1–2',
        outcomes: [
          'Business owner priority sign-off',
          'Integration complexity assessed',
          'Success metrics defined',
        ],
      },
      {
        title: 'Build governed agent pipelines',
        detail:
          'Configure knowledge access, tool permissions, and execution policies, then validate with staged rollout gates.',
        duration: 'Week 2–4',
        outcomes: [
          'Knowledge base and permissions configured',
          'Agent pipelines verified end-to-end',
          'Staged rollout meets compliance gates',
        ],
      },
      {
        title: 'Scale with observability and controls',
        detail:
          'Use unified monitoring to optimize model routing, cost, and reliability while meeting audit and security requirements.',
        duration: 'Week 4+',
        outcomes: [
          'Monitoring dashboards live',
          'Cost and latency baselines established',
          'Multi-scenario horizontal expansion underway',
        ],
      },
    ],
    architectureTitle: 'Production-ready architecture',
    architectureBody:
      'A clean separation between UI, API, and infrastructure gives engineering teams predictable performance and operational control.',
    architectureEyebrow: 'Architecture',
    architectureNodes: [
      {
        key: 'frontend',
        title: 'Frontend Service',
        subtitle: 'Next.js Web Gateway',
        meta: 'Edge-ready UI delivery',
        expansion: 'Auto-scale front-end nodes by traffic and region.',
      },
      {
        key: 'backend',
        title: 'Backend Service',
        subtitle: 'FastAPI Control Plane',
        meta: 'Agent + workflow orchestration',
        expansion: 'Coordinates model routing, policies, and API orchestration.',
      },
      {
        key: 'vector',
        title: 'Vector DB Cluster',
        subtitle: 'Distributed Qdrant',
        meta: 'Shards + replicas for scale',
        expansion: 'Scales retrieval throughput with distributed vector partitions.',
      },
      {
        key: 'pgsql',
        title: 'PostgreSQL',
        subtitle: 'Transactional Metadata Store',
        meta: 'Config, audit, and state',
        expansion: 'Maintains durable transactional state and audit records.',
      },
      {
        key: 'worker',
        title: 'Async Worker Cluster',
        subtitle: 'Distributed Task Runtime',
        meta: 'Horizontally scalable tasks',
        expansion: 'Elastic workers process parsing, indexing, and workflow jobs.',
      },
      {
        key: 'scheduler',
        title: 'Scheduler Service',
        subtitle: 'Cron & Time-based Triggers',
        meta: 'Timed orchestration and jobs',
        expansion: 'Runs periodic jobs and SLA-triggered automations.',
      },
    ],
    architectureScaleNodes: [
      {
        id: 'vector-a',
        target: 'vector',
        title: 'Qdrant Node A',
        detail: 'Primary shard reads/writes',
      },
      {
        id: 'vector-b',
        target: 'vector',
        title: 'Qdrant Node B',
        detail: 'Replica + failover',
      },
      {
        id: 'vector-add',
        target: 'vector',
        title: '+ Add Node',
        detail: 'Auto-join distributed cluster',
        variant: 'add',
      },
      {
        id: 'worker-a',
        target: 'worker',
        title: 'Worker Node A',
        detail: 'Document processing queue',
      },
      {
        id: 'worker-b',
        target: 'worker',
        title: 'Worker Node B',
        detail: 'Workflow execution queue',
      },
      {
        id: 'worker-add',
        target: 'worker',
        title: '+ Add Node',
        detail: 'Elastic worker expansion',
        variant: 'add',
      },
    ],
    securityTitle: 'Enterprise controls & data security by default',
    securityEyebrow: 'Security & Deployment',
    securityItems: [
      'Private deployment: run the full stack in your own VPC or on-premises infrastructure',
      'Data isolation: all business data, vectors, and model interactions stay within your network boundary',
      'Multi-tenancy with team-level resource isolation',
      'SSO with OIDC, OAuth2, SAML 2.0, and CAS',
      'Granular RBAC and scoped API keys',
      'Audit logs with before/after snapshots',
      'No external data transfer: LLM calls can be routed through private endpoints or local models',
      'Encryption at rest and in transit for all stored data and API communications',
    ],
    useCaseTitle: 'Business outcomes',
    useCaseEyebrow: 'Use Cases',
    roadmapTitle: 'Release focus',
    roadmapNow: 'V0.2.9: multimodal knowledge assets, observability',
    roadmapNext: 'V0.2.9: import/export, failed chunk retry, Agent context upgrades',
    finalTitle: 'Get started with Clouisle.',
    finalBody: 'V0.2.9 brings upgrades across multimodal knowledge assets, Agent workflows, import/export, and admin observability.',
    finalPrimary: 'Get Started',
    finalSecondary: 'Contact Us',
    comparison: {
      title: 'What this means for your business',
      eyebrow: 'Side by side',
      subtitle: 'Every row answers one question: when your team runs into this situation, what does Clouisle do that MaxKB and Dify do not?',
      columns: { scenario: 'Your situation', clouisle: 'Clouisle approach', others: 'MaxKB / Dify today' },
      rows: [
        {
          scenario: 'Sales needs an AI assistant that knows the products, contracts, and customer history',
          pain: 'Generic AI gives generic answers — your team spends more time correcting it than using it.',
          clouisle: 'Each Agent is bound to your product docs, contract templates, and CRM. Scoped tools mean it can only answer what it should.',
          others: 'Agent + knowledge base + tools wired together manually; tool permissions are coarse.',
          highlight: true,
          badge: 'recommended',
        },
        {
          scenario: 'Weekly reports, content review, and data consolidation eat hours every week',
          pain: 'Repetitive but multi-step work — hard to delegate, easy to break.',
          clouisle: 'Drag-and-drop workflow with approval, branching, and async steps. Agents run inside the flow; flows trigger Agents.',
          others: 'Visual workflows with core nodes; human-in-the-loop and async workers require extra plugins.',
          highlight: true,
        },
        {
          scenario: 'Your business knowledge lives in PDFs, Word, spreadsheets, and intranet pages',
          pain: 'AI hallucinates because it has not seen your real knowledge.',
          clouisle: 'Upload any format — PDF, Word, Excel, images, audio, video. Auto-split, indexed, and re-tried on failure. Citations on every answer.',
          others: 'PDF and common formats; OCR only on demand; failed chunks are not retried automatically.',
          highlight: true,
        },
        {
          scenario: 'Your users get annoyed repeating preferences, project context, and history to AI every session',
          pain: 'Every conversation starts from zero — the AI never feels like it knows you.',
          clouisle: 'A persistent memory layer follows each user across sessions and across Agents. It remembers style, ongoing projects, and past decisions, with RBAC and audit on every recall.',
          others: 'Memory is conversation-scoped; no shared layer between Agents or users.',
          highlight: true,
          badge: 'recommended',
        },
        {
          scenario: 'You need AI to reach into your internal systems — inventory, CRM, ticketing, internal APIs',
          pain: 'Out-of-the-box AI cannot touch your real business systems.',
          clouisle: 'Connect any MCP server, or wire your own API with flexible parameters. Encapsulate repeatable logic as Skills and share across the team.',
          others: 'MCP supported; custom APIs need per-call configuration; no team-level Skill reuse.',
          highlight: true,
        },
        {
          scenario: 'Long customer chats slow down or lose context halfway through',
          pain: 'Quality drops, users have to repeat themselves, conversations feel forgetful.',
          clouisle: 'Auto-compress history while preserving context. Branch any message and jump back. Drop in images or files mid-chat. Variables collect structured input to guide the flow.',
          others: 'Basic context window; no branching; image/file upload via separate nodes.',
        },
        {
          scenario: 'You need clear roles for admins, builders, and end users across multiple teams',
          pain: 'Without governance, AI quickly becomes a compliance risk.',
          clouisle: 'Workspace + team isolation. Admins configure models and global settings; builders author Agents; end users consume them. Every action is logged.',
          others: 'Workspace RBAC available; audit and per-action history are partial or enterprise-only.',
          highlight: true,
          badge: 'enterprise',
        },
        {
          scenario: 'Procurement and IT require SSO, audit trails, and private deployment',
          pain: 'Open-source tools stall at the security review.',
          clouisle: 'SSO via OIDC, OAuth2, SAML 2.0, CAS. Audit snapshots before/after every change. Deploy in your own VPC or on-prem — no data leaves your network.',
          others: 'SSO and private deployment are enterprise / cloud-tier only on Dify; MaxKB relies on external integrations.',
          highlight: true,
          badge: 'enterprise',
        },
      ],
      note: 'Snapshot based on publicly released capabilities (MaxKB v2, Dify v1.6–v1.13) as of June 2026.',
    },
  },
  zh: {
    badge: 'V0.2.9',
    releaseAnnouncement: {
      eyebrow: 'V0.2.9 已发布',
      title: '云屿全面开放，为企业构建可执行智能中枢。',
      body:
        '本次发布带来多模态知识库资产、配置导入导出、后台可观测性、Agent 编排上下文增强，以及更稳定的对话体验。',
      items: ['知识库、Agent 与工作流能力升级'],
    },
    title: 'Clouisle',
    titleSub: '为业务构建可执行的智能中枢。',
    subtitle:
      '云屿将 AI Agent、工作流编排与企业级知识检索整合到同一平台，帮助团队安全落地生产级 AI。',
    primaryCta: '立即体验',
    secondaryCta: '查看 v0.2.9',
    heroImage: '/images/admin-panel.webp',
    heroImageAlt: '云屿管理面板',
    stats: [
      { value: 'V0.2.9', label: '最新版本' },
      { value: '15+', label: 'LLM 提供商接入' },
    ],
    trustLine: '面向企业平台团队，构建可规模化、可治理的 AI 能力',
    whyTitle: '从数据碎片化到智能可执行',
    whyBody:
      '企业数据分散在文档、数据库与业务系统中，无法被 AI 直接利用。云屿通过三层架构解决这一问题：将多格式文档解析、分块并向量化入库；把知识绑定到配置了工具与模型路由的 Agent 上；再通过工作流引擎将 Agent 的判断转化为审批、通知、数据写入等真实业务动作。全流程在统一的权限与审计体系下运行。',
    whyPoints: [
      '知识层 — 支持 PDF、DOCX、XLSX 等多格式文档的解析与向量索引；Naive RAG 与 Agentic RAG 双路检索，覆盖简单查询与多步推理两种场景',
      'Agent 层 — 为每个 Agent 绑定专属知识库、工具集与 MCP 接口；配置模型路由、会话生命周期与权限范围，确保每个 Agent 在定义边界内执行',
      '执行层 — 可视化工作流编排支持 15+ 节点类型，将 Agent 的输出对接审批流、通知、数据写入与外部 API，打通从智能推理到业务落地的最后一公里',
    ],
    capabilitiesTitle: '核心平台能力',
    capabilitiesLead:
      '每项能力都围绕企业落地设计，目标是缩短交付周期、提升结果质量，并降低上线与运维风险。',
    memoryEyebrow: '记忆层',
    memoryTitle: '面向 Agent 的全局用户记忆',
    memoryBody:
      '云屿为每位用户维护一份持久、权限感知的记忆画像。该记忆仅在 Agent 内使用，让 Agent 能在跨会话过程中继承上下文、偏好与历史动作，不再反复询问同样的问题。',
    memoryCards: [
      {
        label: '持续上下文',
        title: '在 Agent 内持续保留用户画像与会话上下文',
        summary:
          'Agent 可复用同一份持久记忆，统一继承角色、偏好、当前目标和已确认结果。',
        items: [
          '角色、工作空间与回复偏好',
          '最近会话、已确认草稿与下一步动作',
          '减少 Agent 交接时的重复询问',
        ],
      },
      {
        label: '受控召回',
        title: '让多个 Agent 在权限边界内共享记忆',
        summary:
          '记忆仅供 Agent 使用，每次写入与召回都受租户、团队与角色策略约束。',
        items: [
          '租户隔离与保留策略',
          '基于 RBAC 的记忆检索',
          '可审计的召回、更新与 Agent 交接记录',
        ],
      },
    ],
    ragEyebrow: 'RAG 策略',
    ragTitle: 'Naive RAG + Agentic RAG',
    ragSubtitle:
      '针对不同业务复杂度选择不同检索策略。云屿同时支持确定性检索与 Agent 驱动推理两种范式。',
    ragModes: [
      {
        badge: 'Naive RAG',
        title: '低延迟、可预测的检索增强回答',
        summary:
          '适用于制度问答、文档检索、标准化知识查询等强调稳定性与可追溯性的场景。',
        points: [
          '单次检索路径，引用关系清晰',
          '执行链路更短，成本与时延更可控',
          '便于标准化治理与审计',
        ],
      },
      {
        badge: 'Agentic RAG',
        title: '多步推理与自适应检索协同',
        summary:
          '适用于复杂问题拆解、跨源信息综合、工具调用与流程协同等高复杂度任务。',
        points: [
          '支持"规划-检索-验证"的多步执行',
          '可在推理中调用工具与工作流',
          '在复杂任务中获得更高质量输出',
        ],
      },
    ],
    advantagesTitle: '为什么企业团队选择云屿',
    advantagesSubtitle:
      '不只是功能堆叠，云屿提供的是企业 AI 所需的运营体系：可治理、可度量、可持续扩展。',
    advantagesEyebrow: '核心优势',
    advantages: [
      {
        title: '更快业务价值落地',
        description:
          '通过可复用编排能力快速启动试点，从单点验证走向可规模复制的业务场景。',
        proof: '业务试点窗口可控制在 2 周内',
        metric: '< 2周',
        metricLabel: '试点到生产上线',
      },
      {
        title: '生产级治理能力',
        description:
          '把 RBAC、SSO、审计日志、API 权限范围控制前置到流程设计阶段，减少后期返工与风险。',
        proof: '默认支持合规审计链路',
        metric: 'Day 1',
        metricLabel: '治理控制默认生效',
      },
      {
        title: '灵活模型策略',
        description:
          '支持 15+ 模型与提供商灵活切换，在不牺牲治理一致性的前提下优化性能与成本。',
        proof: '避免单一模型或厂商绑定',
        metric: '15+',
        metricLabel: '模型提供商接入',
      },
      {
        title: '可观测可运营',
        description:
          '统一查看质量、时延、成本、调用行为，帮助平台团队建立可持续的 AI 运营机制。',
        proof: '运行与治理指标统一视图',
        metric: '1个',
        metricLabel: '统一运营控制台',
      },
    ],
    deliveryTitle: '企业落地路径',
    deliverySubtitle:
      '围绕平台团队、业务团队与合规团队协同设计的实战交付路径。',
    deliverySteps: [
      {
        title: '明确高价值场景',
        detail: '优先选择 2-3 个对业务结果影响显著、可快速验证价值的关键流程。',
        duration: '第 1–2 周',
        outcomes: [
          '业务负责人确认优先级',
          '集成复杂度评估完成',
          '验证指标与成功标准明确',
        ],
      },
      {
        title: '建设可治理 Agent 流程',
        detail: '配置知识权限、工具权限与执行策略，结合灰度验证机制保障上线质量。',
        duration: '第 2–4 周',
        outcomes: [
          '知识库配置与权限设置完成',
          'Agent 流程端到端验证通过',
          '灰度上线满足合规要求',
        ],
      },
      {
        title: '基于观测持续扩展',
        detail: '通过统一监控优化模型路由、成本与稳定性，并满足审计与安全要求。',
        duration: '第 4 周起',
        outcomes: [
          '监控看板部署完毕',
          '成本与性能基线已建立',
          '多场景横向复制启动',
        ],
      },
    ],
    architectureTitle: '可生产落地的架构设计',
    architectureBody:
      '前端、后端与基础设施清晰解耦，既保证性能，也让运维治理与扩展迭代更可控。',
    architectureEyebrow: '架构设计',
    architectureNodes: [
      {
        key: 'frontend',
        title: '前端服务',
        subtitle: 'Next.js 应用网关',
        meta: '面向边缘的界面交付',
        expansion: '根据流量与地域自动扩展前端服务节点。',
      },
      {
        key: 'backend',
        title: '后端服务',
        subtitle: 'FastAPI 控制平面',
        meta: 'Agent 与流程统一编排',
        expansion: '负责模型路由、策略执行与 API 协调。',
      },
      {
        key: 'vector',
        title: '向量数据库集群',
        subtitle: 'Qdrant 分布式集群',
        meta: '分片 + 副本扩展',
        expansion: '通过分布式向量分区提升检索吞吐与稳定性。',
      },
      {
        key: 'pgsql',
        title: 'PostgreSQL',
        subtitle: '事务元数据存储',
        meta: '配置、审计与状态管理',
        expansion: '提供可靠事务一致性与审计记录存储。',
      },
      {
        key: 'worker',
        title: '异步 Worker 集群',
        subtitle: '分布式任务执行层',
        meta: '任务可横向扩展',
        expansion: '弹性处理解析、索引、流程执行等异步任务。',
      },
      {
        key: 'scheduler',
        title: '定时调度服务',
        subtitle: 'Cron 与时间触发',
        meta: '定时编排与任务触发',
        expansion: '负责周期任务与 SLA 时间窗口触发。',
      },
    ],
    architectureScaleNodes: [
      {
        id: 'vector-a',
        target: 'vector',
        title: '向量节点 A',
        detail: '分片读写主节点',
      },
      {
        id: 'vector-b',
        target: 'vector',
        title: '向量节点 B',
        detail: '副本与容灾切换',
      },
      {
        id: 'vector-add',
        target: 'vector',
        title: '+ 添加节点',
        detail: '自动加入分布式集群',
        variant: 'add',
      },
      {
        id: 'worker-a',
        target: 'worker',
        title: 'Worker 节点 A',
        detail: '文档解析任务队列',
      },
      {
        id: 'worker-b',
        target: 'worker',
        title: 'Worker 节点 B',
        detail: '流程执行任务队列',
      },
      {
        id: 'worker-add',
        target: 'worker',
        title: '+ 添加节点',
        detail: '弹性 Worker 横向扩容',
        variant: 'add',
      },
    ],
    securityTitle: '私有化部署，数据安全可控',
    securityEyebrow: '安全与部署',
    securityItems: [
      '私有化部署：支持在自有 VPC 或本地机房运行完整平台',
      '数据隔离：所有业务数据、向量与模型交互均留在客户网络边界内',
      '多租户架构与团队级资源隔离',
      '支持 OIDC、OAuth2、SAML 2.0、CAS 的 SSO',
      '细粒度 RBAC 与 API Key 权限范围控制',
      '包含前后快照的完整审计日志',
      '无外部数据传输：LLM 调用可通过私有端点或本地模型路由',
      '全链路加密：存储数据与 API 通信均支持静态与传输加密',
    ],
    useCaseTitle: '业务落地场景',
    useCaseEyebrow: '应用场景',
    roadmapTitle: '发布重点',
    roadmapNow: 'V0.2.9：多模态知识库、可观测性',
    roadmapNext: 'V0.2.9：导入导出、失败片段重试、Agent 上下文增强',
    finalTitle: '开始使用云屿。',
    finalBody: 'V0.2.9 已升级知识库、Agent 工作流、导入导出与后台可观测性，立即体验企业级 AI 平台。',
    finalPrimary: '立即体验',
    finalSecondary: '联系我们',
    comparison: {
      title: '对你的业务意味着什么',
      eyebrow: '横向对照',
      subtitle: '每一行回答一个问题：当你的团队遇到这种情况，云屿做到了什么，MaxKB 和 Dify 还没有做到？',
      columns: { scenario: '你的场景', clouisle: '云屿的做法', others: 'MaxKB / Dify 现状' },
      rows: [
        {
          scenario: '销售需要一个懂产品、会查合同、记住客户偏好的 AI 助手',
          pain: '通用 AI 只会给出通用答案——团队花在纠正它身上的时间比用它还多。',
          clouisle: '每个 Agent 绑定产品文档、合同模板与 CRM；工具按作用域授权，只能做它该做的事。',
          others: 'Agent + 知识库 + 工具需手动拼装，工具权限粒度较粗。',
          highlight: true,
          badge: 'recommended',
        },
        {
          scenario: '每周报告、内容审核、数据汇总吃掉了大量人力',
          pain: '重复但步骤多——难委派、易出错。',
          clouisle: '可视化拖拽搭建工作流，支持审批、分支与异步步骤；Agent 可在流内调用，工作流也能触发 Agent。',
          others: '可视化工作流 + 核心节点；人工介入、异步 Worker 需借助额外插件。',
          highlight: true,
        },
        {
          scenario: '业务知识散落在 PDF、Word、Excel、内网页面里',
          pain: 'AI 没看过你的真实知识，只能瞎答。',
          clouisle: '上传任意格式——PDF、Word、Excel、图片、音频、视频。自动拆分、向量化、失败重试。每条答案都带引用。',
          others: '支持 PDF 与常见格式；OCR 按需触发；解析失败不会自动重试。',
          highlight: true,
        },
        {
          scenario: '用户每次开新对话都要重复告诉 AI 自己的偏好、项目和背景',
          pain: '每段对话都从零开始——AI 从来不像认识你。',
          clouisle: '持久的记忆层跨会话、跨 Agent 跟随用户。记住表达风格、进行中的项目、历史决策；每次召回都受 RBAC 约束并可审计。',
          others: '记忆按会话隔离，Agent 与用户之间没有共享层。',
          highlight: true,
          badge: 'recommended',
        },
        {
          scenario: 'AI 需要触达你的真实业务系统——库存、CRM、工单、内部 API',
          pain: '开箱即用的 AI 没法对接业务系统。',
          clouisle: '任意 MCP 服务即接即用，也可以灵活配置自有 API。把重复逻辑封装成 Skill，全团队共享复用。',
          others: '支持 MCP；自定义 API 需逐个配置；没有团队级的 Skill 复用机制。',
          highlight: true,
        },
        {
          scenario: '客户对话很长时质量下降、中途丢上下文',
          pain: 'AI 越聊越糊涂，用户不得不重复自己。',
          clouisle: '自动压缩历史但保留关键上下文；任意消息可分支并跳回；中途可上传图片、文件；变量引导对话收集结构化信息。',
          others: '基础上下文窗口；无分支；图片/文件需通过独立节点上传。',
        },
        {
          scenario: '需要为管理员、搭建者、终端用户划分清晰角色',
          pain: '没有治理，AI 很快变成合规风险。',
          clouisle: '工作区 + 团队隔离。管理员配置模型与全局设置，搭建者创作 Agent，终端用户使用 Agent。所有操作留有记录。',
          others: '支持工作区 RBAC；逐项审计与操作历史多为部分支持或企业版限定。',
          highlight: true,
          badge: 'enterprise',
        },
        {
          scenario: '采购与 IT 要求 SSO、审计与私有化部署',
          pain: '开源工具经常卡在安全评审环节。',
          clouisle: 'SSO 支持 OIDC、OAuth2、SAML 2.0、CAS；每次变更前后保留审计快照；可部署在自有 VPC 或本地机房——数据不出你的网络。',
          others: 'Dify 的 SSO 与私有化部署为企业/云版本独占；MaxKB 依赖外部集成。',
          highlight: true,
          badge: 'enterprise',
        },
      ],
      note: '快照基于 MaxKB v2、Dify v1.6–v1.13 截至 2026 年 6 月公开发布的能力。',
    },
  },
};
