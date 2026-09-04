import { useCallback, useEffect, useState } from "react"
import { getInsight, type InsightData } from "../services/aiService"
import { useSimulationStorage } from "./useSimulationStorage"
import { buildAIPrompt } from "../components/data/aiPrompts"

export const useInsight = (id: string) => {
    const [insight, setInsight] = useState<InsightData | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { getFormData } = useSimulationStorage()

    // Necessáio o uso do useCallback pois temso que colocar essa função como array de depeendẽncias do useEffect
    const fetchInsight = useCallback(async (simulationId: string) => {
        const simulation = getFormData(simulationId)

        if (!simulation) {
            setError('Simulação não encontrada')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const prompt = buildAIPrompt(simulation)
            const data = await getInsight(prompt)
            setInsight(data)
        } catch (err) {
            setError('Erro ao gerar o diagnóstico. tente novamente')
        } finally {
            setIsLoading(false)
        }
    }, [getFormData])

    useEffect(() => {
        // Evita loop infinito de requisições para a API do Gemini
        if (insight || isLoading || error) {
            return 
        }

        fetchInsight(id)
        
    }, [id, insight, isLoading, error, fetchInsight])

    return { insight, isLoading, error , fetchInsight}
}