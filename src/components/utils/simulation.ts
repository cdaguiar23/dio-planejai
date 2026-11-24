import type { SimulationFormData } from "../data/simulation";
import { parseCurrency } from "./currency";

type SimulationFormDataWithLegacy = SimulationFormData & { icome?: string }

export function calcMonthlySavings(data: SimulationFormData) {
    // Backwards-compatibility: some saved records used the typo 'icome'
    const { income, icome, expenses, debts } = data as SimulationFormDataWithLegacy
    const incomeValue = income ?? icome ?? ''
    return (
        parseCurrency(incomeValue) - parseCurrency(expenses) - parseCurrency(debts)
    )
}
