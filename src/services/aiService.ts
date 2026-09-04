interface GeminiRespobse {
    candidates: {
        content: {
            parts: {text: string}
        }
    }[]
}

export interface InsightData {
    feasibility:{
        status: 'viable' | 'needs_adjustment' | 'unfeasible'
        content: string
    }
    diagbnosis: {
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

const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY)
const MODEL_NAME = 'gemini-flash-latest'
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateText?key=${API_KEY}'

const callGeminiAPI = async (prompt: string) => {
    const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{parts: [{text: prompt}]}],
        }),
    })

    if (!response.ok) {
        throw new Error(`Erro na reiquisção: ${response.status}`)
    }

    return (await response.json()) as GeminiRespobse
}

export const getInsight = async (prompt: string) => {
    const response = await callGeminiAPI(prompt)

    const json = response.candidates[0].content.parts[0].text

    return JSON.parse(json) as InsightData
}
