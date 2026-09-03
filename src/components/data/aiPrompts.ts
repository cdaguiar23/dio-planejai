import { parseCurrency } from "../utils/currency";
import { calcMonthlySavings } from "../utils/simulation";
import type { SimulationRecord } from "./simulation";

const RESPONSE_SCHEMA = `{
    "feasibility": {
        "status": "viable" | "needs_adjustement" | "unfeseable",
        "content": "<Análise objetiva se a meta é atingível no prazo com o valor disponível. mencione os números relevantes.>",
    },
    "diagnosis": {
        "contewnt": "<Diagnóstico focado no comprometimento do orçamento: quanto % das renda está comprometida com gastos e dívidas>"
    },
    "suggestions": {
        "items": ["<Sugestão prática e concreta para reduzor gastos ou reorganizar o orçamento>"]
    },
    "extraIncome": {
        "items": ["<Idéia prática para gerar renda extra compatível com a realidade brasileira>"]
    },
    "investiment": {
        "items:" ["<Sugestão de investimento acessível para o perfil apresentado, com foco em atingir a meta>"]
    },
    "motivation": {
        "content": "<Mensagem final motivacional e personalizada, citando a meta pelo nome.>"
    }
}

export function buildAIPrompt(simulation: SimulationRecord) {

    const {income, expenses, debts, goalName, goalAmount, goalDeadline} = simulation

    const monthlySavings = calcMonthlySavings(simulation)
    const monthlySavingsNeeded = parseCurrency(goalAmount) / parseCurrency(goalDeadline)

    return `Você é um educador financiero em finanças pessoais.
        Analise os dados baixo e gere um diagnóstico financeiro personalizado com linguagem clara, didática e encorajadora,
        voltado para pessoas sem conheicmento financeiro. O diagnóstico será exibido diretamente ao usuário no app,
        fale sempre em segunda pessoa ("você te...", "suam meta...").
        
        Dados da simulação:
        - Renda mensal bruta: ${income}
        - Custos fixos essenciais: ${expenses}
        - Dívidas e parcelas mensais: ${debts}
        - Valor dispoonível por mês: ${monthlySavings} reais
        - Meta: ${goalName}
        - Custo da meta: ${goalAmount}
        - Prazo desejado: ${goalDeadline} meses
        - Economia mensal necessária para atingir a meta no prazo: ${monthlySavingsNeeded} reais
        - Saldo após reserva para a meta: ${monthlySavings - monthlySavingsNeeded} reais
        
        Retorne apenas um JSON válido, sem texto adicional, sem blocos de código, netse formato exato:
        
        ${RESPONSE_SCHEMA}

        Regras:
        - Todos os textos em português do BrAsil
        - Máximo de 4 items por lista
        - Se ja específico ao citar valores calculados
        - Não repita informaçãoes sobre sessões
        - Nunca use markdown dentro dos valores de JSON
        - Para o campo "feasibility.status" use os seguintes critérios:
            - "viable": saldo após reserva para a meta é maior ou igual a 0
            - "needs_adjustement": saldo negativo de até 20% do valor da economia mensal necessária
            - "unfeseable": saldo negativo superior a 20% do vlaor da economia mensal necessária
        `
}
