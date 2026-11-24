import { useInsight } from "../../../hooks/useInsight"

interface AIInsightCardProps {
    simulationID: string
}

export function AIInsightCard({ simulationID }: AIInsightCardProps) {   
    const { insight, isLoading, error } = useInsight(simulationID)

    return (
        <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
            {isLoading && <p>Gerando diagnóstico...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && insight && (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Painel de Insights</h2>
                    <p>{insight.feasibility.content}</p>
                    <p>{insight.diagnosis.content}</p>
                </div>
            )}
            {!isLoading && !error && !insight && <p>Painel de Insights</p>}
        </div>
    )
}
    