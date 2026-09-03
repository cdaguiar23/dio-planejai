import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { SimulationFormPage } from './components/pages/SimulationFormPage'
import { SimulationResultsPages } from './components/pages/SimulationResultsPages'

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: (
                    <>
                        <SimulationFormPage />
                    </>
                )
            },
            {
                path: '/resultado/:id',
                element: <SimulationResultsPages />
            },
            {
                path: '/historico',
                element: <h1>Histórico de Simulação</h1>
            }
        ]
    }
])