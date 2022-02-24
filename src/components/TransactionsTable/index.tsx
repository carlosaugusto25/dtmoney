import {
    Container
} from './styles';
import { api } from '../../service/api';
import { useEffect, useState } from 'react';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

export function TransactionsTable() {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('/transactions').then(res => {
            setTransactions(res.data.transactions)
        })
    }, [])

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((item: Transaction) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td className={item.type}>
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(item.amount)}
                                </td>
                                <td>{item.category}</td>
                                <td>
                                    {new Intl.DateTimeFormat('pt-BR').format(new Date(item.createdAt))}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Container>
    );
}