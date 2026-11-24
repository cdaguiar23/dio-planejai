interface GeminiResponse {
    candidates: {
        content: {
            parts: { text: string }[]
        }
    }[]
}

export interface InsightData {
    feasibility: {
        status: 'viable' | 'needs_adjustment' | 'unfeasible'
        content: string
    }
    diagnosis: {
        content: string
    }
    suggestions: {
        items: string[]
    }
    extraIncome: {
        items: string[]
    }
    investiment: {
        items: string[]
    }
    motivation: {
        content: string
    }
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined
const MODEL_NAME = 'gemini-flash-latest'

const callGeminiAPI = async (prompt: string) => {
    if (!API_KEY || API_KEY === 'sua_chave_aqui') {
        throw new Error(
            'VITE_GEMINI_API_KEY não configurada. Crie um arquivo .env com uma chave válida do Google AI Studio.',
        )
    }

    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`

    const response = await fetch(geminiApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
        }),
    })

    if (!response.ok) {
        const body = await response.json().catch(() => null)
        const apiMessage = body?.error?.message as string | undefined

        if (response.status === 402 || body?.error?.status === 'RESOURCE_EXHAUSTED') {
            throw new Error(
                'Créditos da API Gemini esgotados. Adicione créditos ou ative o faturamento em https://ai.studio/projects',
            )
        }

        if (response.status === 400 && body?.error?.status === 'INVALID_ARGUMENT') {
            throw new Error(
                'Chave da API Gemini inválida. Verifique VITE_GEMINI_API_KEY no arquivo .env',
            )
        }

        throw new Error(apiMessage || `Erro na requisição: ${response.status}`)
    }

    return (await response.json()) as GeminiResponse
}

export const getInsight = async (prompt: string) => {
    const response = await callGeminiAPI(prompt)

    const json = response.candidates[0].content.parts[0].text

    return JSON.parse(json) as InsightData
}
