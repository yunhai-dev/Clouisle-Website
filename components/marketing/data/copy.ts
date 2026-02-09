import type { CopyData, Locale } from './types';

export const copy: Record<Locale, CopyData> = {
  en: {
    badge: 'Enterprise AI Platform',
    title: 'Clouisle',
    titleSub: 'Build the intelligence layer for your business.',
    subtitle:
      'Clouisle combines AI agents, workflow orchestration, and enterprise-grade knowledge retrieval into one production platform.',
    primaryCta: 'Try Beta',
    secondaryCta: 'Apply for Beta',
    heroImage: '/images/admin-panel.webp',
    heroImageAlt: 'Clouisle Admin Panel',
    stats: [
      { value: '15+', label: 'LLM providers' },
      { value: '99.9%', label: 'Target service uptime' },
      { value: '< 2 weeks', label: 'Pilot launch window' },
    ],
    trustLine: 'Designed for platform teams shipping secure AI at scale',
    whyTitle: 'From fragmented data to executable intelligence',
    whyBody:
      'Clouisle turns static enterprise knowledge into agent-driven execution. Teams can retrieve context, reason across systems, and trigger workflows without losing security or governance.',
    whyPoints: [
      'Unify agent operations, knowledge retrieval, and workflow automation in one platform',
      'Balance AI velocity with enterprise governance and compliance controls',
      'Move from prototype chatbots to production-grade business execution',
    ],
    capabilitiesTitle: 'Platform capabilities',
    capabilitiesLead:
      'Each capability is designed to shorten delivery cycles, improve response quality, and reduce operational risk in enterprise AI deployments.',
    ragEyebrow: 'RAG Strategy',
    ragTitle: 'Traditional RAG + Agentic RAG',
    ragSubtitle:
      'Use the right retrieval strategy for each business scenario. Clouisle supports both deterministic retrieval and agent-driven reasoning workflows.',
    ragModes: [
      {
        badge: 'Traditional RAG',
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
      },
      {
        title: 'Production Governance',
        description:
          'Apply RBAC, SSO, audit trails, and scoped API controls across every critical workflow from day one.',
        proof: 'Compliance-friendly by default',
      },
      {
        title: 'Flexible AI Stack',
        description:
          'Switch between 15+ providers and models while keeping consistent execution, observability, and policy controls.',
        proof: 'Avoid provider lock-in',
      },
      {
        title: 'Operational Clarity',
        description:
          'Track quality, latency, cost, and usage in one control plane to make AI operations visible and accountable.',
        proof: 'Runtime + governance telemetry unified',
      },
    ],
    deliveryTitle: 'Enterprise rollout path',
    deliverySubtitle:
      'A practical delivery sequence that aligns platform teams, business owners, and compliance stakeholders.',
    deliverySteps: [
      {
        title: '1. Scope the highest-value workflows',
        detail:
          'Identify 2-3 business-critical scenarios where response quality and execution speed directly impact outcomes.',
      },
      {
        title: '2. Build governed agent pipelines',
        detail:
          'Configure knowledge access, tool permissions, and execution policies, then validate with staged rollout gates.',
      },
      {
        title: '3. Scale with observability and controls',
        detail:
          'Use unified monitoring to optimize model routing, cost, and reliability while meeting audit and security requirements.',
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
    roadmapTitle: 'Roadmap focus',
    roadmapNow: 'Now: AI agents, workflows, RAG, SSO, notifications, audit logging',
    roadmapNext: 'Next: industry templates, analytics workspace, plugin marketplace, mobile apps',
    finalTitle: 'Ready to launch enterprise AI with confidence?',
    finalBody: 'The platform is currently in closed beta. Try it out or get in touch with us.',
    finalPrimary: 'Try Beta',
    finalSecondary: 'Contact Us',
  },
  zh: {
    badge: '企业级 AI 平台',
    title: 'Clouisle',
    titleSub: '为业务构建可执行的智能中枢。',
    subtitle:
      '云屿将 AI Agent、工作流编排与企业级知识检索整合到同一平台，帮助团队安全落地生产级 AI。',
    primaryCta: '开始体验',
    secondaryCta: '申请内测',
    heroImage: '/images/admin-panel.webp',
    heroImageAlt: '云屿管理面板',
    stats: [
      { value: '15+', label: 'LLM 提供商接入' },
      { value: '99.9%', label: '目标服务可用性' },
      { value: '< 2 周', label: '试点上线周期' },
    ],
    trustLine: '面向企业平台团队，构建可规模化、可治理的 AI 能力',
    whyTitle: '从数据碎片化到智能可执行',
    whyBody:
      '云屿把静态企业知识升级为可执行的 Agent 能力。团队可以在合规与治理前提下完成检索、推理与流程触发。',
    whyPoints: [
      '在同一平台统一 Agent、知识检索与流程自动化',
      '在保证治理与合规前提下提升 AI 交付速度',
      '从 PoC 聊天机器人升级到生产级业务执行体系',
    ],
    capabilitiesTitle: '核心平台能力',
    capabilitiesLead:
      '每项能力都围绕企业落地设计，目标是缩短交付周期、提升结果质量，并降低上线与运维风险。',
    ragEyebrow: 'RAG 策略',
    ragTitle: 'Traditional RAG + Agentic RAG',
    ragSubtitle:
      '针对不同业务复杂度选择不同检索策略。云屿同时支持确定性检索与 Agent 驱动推理两种范式。',
    ragModes: [
      {
        badge: 'Traditional RAG',
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
      },
      {
        title: '生产级治理能力',
        description:
          '把 RBAC、SSO、审计日志、API 权限范围控制前置到流程设计阶段，减少后期返工与风险。',
        proof: '默认支持合规审计链路',
      },
      {
        title: '灵活模型策略',
        description:
          '支持 15+ 模型与提供商灵活切换，在不牺牲治理一致性的前提下优化性能与成本。',
        proof: '避免单一模型或厂商绑定',
      },
      {
        title: '可观测可运营',
        description:
          '统一查看质量、时延、成本、调用行为，帮助平台团队建立可持续的 AI 运营机制。',
        proof: '运行与治理指标统一视图',
      },
    ],
    deliveryTitle: '企业落地路径',
    deliverySubtitle:
      '围绕平台团队、业务团队与合规团队协同设计的实战交付路径。',
    deliverySteps: [
      {
        title: '1. 明确高价值场景',
        detail: '优先选择 2-3 个对业务结果影响显著、可快速验证价值的关键流程。',
      },
      {
        title: '2. 建设可治理 Agent 流程',
        detail:
          '配置知识权限、工具权限与执行策略，结合灰度验证机制保障上线质量。',
      },
      {
        title: '3. 基于观测持续扩展',
        detail:
          '通过统一监控优化模型路由、成本与稳定性，并满足审计与安全要求。',
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
    roadmapTitle: '产品路线图',
    roadmapNow: '当前：Agent、工作流、RAG、SSO、通知体系、审计日志',
    roadmapNext: '下一步：行业模板、分析工作台、插件市场、移动端应用',
    finalTitle: '准备好体验企业级 AI 平台了吗？',
    finalBody: '平台目前处于内测阶段，欢迎试用或联系我们了解更多。',
    finalPrimary: '进入内测',
    finalSecondary: '联系我们',
  },
};
