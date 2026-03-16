import type { ElementType } from 'react';
import {
  Anthropic,
  Azure,
  DeepSeek,
  Google,
  LangGraph,
  Ollama,
  OpenAI,
  Qwen,
  Vercel,
  XAI,
} from '@lobehub/icons';
import { Database, ServerCog } from 'lucide-react';

export interface ProviderItem {
  icon: ElementType;
  name: string;
}

export const providers: ProviderItem[] = [
  { name: 'OpenAI', icon: OpenAI },
  { name: 'Anthropic', icon: Anthropic },
  { name: 'Google', icon: Google },
  { name: 'Azure OpenAI', icon: Azure },
  { name: 'xAI', icon: XAI },
  { name: 'DeepSeek', icon: DeepSeek },
  { name: 'Qwen', icon: Qwen },
  { name: 'Ollama', icon: Ollama },
  { name: 'Qdrant', icon: Database },
  { name: 'FastAPI', icon: ServerCog },
  { name: 'LangGraph', icon: LangGraph },
  { name: 'Next.js', icon: Vercel },
];
