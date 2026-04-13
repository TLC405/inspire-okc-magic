

# Switch Admin Chat to Together AI (Open-Source Models)

## What Changes

Replace the Lovable AI Gateway in `admin-chat/index.ts` with Together AI's OpenAI-compatible API. Together AI runs open-source models like **Meta Llama 4 Scout 17B** and **DeepSeek R1** with a free trial tier.

Together AI's API is OpenAI-compatible, so the change is minimal — swap the URL, API key, and model name.

---

## Steps

### 1. Add Together AI API Key
- Use the `add_secret` tool to request your Together AI API key
- Get a free key at [together.ai](https://api.together.ai) — sign up, go to Settings → API Keys

### 2. Update `supabase/functions/admin-chat/index.ts`
- Change API URL from `https://ai.gateway.lovable.dev/v1/chat/completions` → `https://api.together.xyz/v1/chat/completions`
- Change auth from `LOVABLE_API_KEY` → `TOGETHER_API_KEY`
- Change model from `google/gemini-3.1-pro-preview` → `meta-llama/Llama-4-Scout-17B-16E-Instruct` (free tier, 16k context, strong reasoning)
- Remove 402 credit-exhausted handling (not applicable)
- Keep all existing admin auth verification, system prompt, and streaming logic unchanged

### 3. Deploy the edge function

No database changes. No frontend changes — the SSE streaming format is identical.

---

## Model Options on Together AI (all open-source)

| Model | Speed | Quality | Free Tier |
|---|---|---|---|
| `meta-llama/Llama-4-Scout-17B-16E-Instruct` | Fast | Strong | Yes |
| `deepseek-ai/DeepSeek-R1` | Slower | Excellent reasoning | Yes |
| `Qwen/Qwen2.5-72B-Instruct-Turbo` | Medium | Very strong | Yes |

Default: Llama 4 Scout (best speed/quality balance).

