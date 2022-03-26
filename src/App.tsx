import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { createServer, Model } from "miragejs";
import Modal from 'react-modal';
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2022-02-12 09:00:00')
        },
        {
          id: 2,
          title: 'Aluguel de cadeiras',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2020-03-22 22:22:22')
        },
        {
          id: 3,
          title: 'Revisão do Carr0',
          type: 'withdraw',
          category: 'Carro',
          amount: 2000,
          createdAt: new Date('1990-03-19 09:00:00')
        },
        {
          id: 4,
          title: 'Ração dos peixes',
          type: 'withdraw',
          category: 'Pet',
          amount: 100,
          createdAt: new Date('2022-02-12 09:00:00')
        },
        {
          id: 5,
          title: 'Venda de som automotivo',
          type: 'deposit',
          category: 'Venda',
          amount: 700,
          createdAt: new Date('2022-01-22 09:00:00')
        }
      ]
    })
  },
  
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema,request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })
  }
})

Modal.setAppElement('#root'); //joga o modal dentro da div root;

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);

  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <Dashboard />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
