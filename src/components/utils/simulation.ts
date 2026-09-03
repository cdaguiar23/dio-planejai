import type { SimulationFormData } from "../data/simulation";
import { parseCurrency } from "./currency";

export function calcMonthlySavings(data: SimulationFormData) {
    // Backwards-compatibility: some saved records used the typo 'icome'
    const incomeValue = (data as any).income ?? (data as any).icome ?? ''
    return (
        parseCurrency(incomeValue) - parseCurrency((data as any).expenses) - parseCurrency((data as any).debts)
    )
}