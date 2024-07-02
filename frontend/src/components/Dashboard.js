import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, Grid } from '@mui/material';

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [financialSummary, setFinancialSummary] = useState({});
  const [alerts, setAlerts] = useState({});

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/dashboard/summary');
        setSummary(response.data);
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };

    const fetchFinancialSummary = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/dashboard/financial-summary');
        setFinancialSummary(response.data);
      } catch (error) {
        console.error('Error fetching financial summary:', error);
      }
    };

    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/dashboard/alerts');
        setAlerts(response.data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchSummary();
    fetchFinancialSummary();
    fetchAlerts();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <Typography variant="h5" component="h2">
            Resumo da Frota
          </Typography>
          <Typography variant="body2" component="p">
            Total de Caminhões: {summary.totalTrucks}
          </Typography>
          <Typography variant="body2" component="p">
            Entregas em Andamento: {summary.totalPendingDeliveries}
          </Typography>
          <Typography variant="body2" component="p">
            Entregas Concluídas: {summary.totalCompletedDeliveries}
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <Typography variant="h5" component="h2">
            Resumo Financeiro
          </Typography>
          <Typography variant="body2" component="p">
            Valor das Entregas Hoje: {financialSummary.totalValueToday}
          </Typography>
          <Typography variant="body2" component="p">
            Valor das Entregas da Semana: {financialSummary.totalValueWeek}
          </Typography>
          <Typography variant="body2" component="p">
            Valor das Entregas do Mês: {financialSummary.totalValueMonth}
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <Typography variant="h5" component="h2">
            Alertas e Indicadores
          </Typography>
          <Typography variant="body2" component="p">
            Entregas Valiosas: {alerts.valuableDeliveries?.length || 0}
          </Typography>
          <Typography variant="body2" component="p">
            Eletrônicos Sem Seguro: {alerts.electronicsWithoutInsurance?.length || 0}
          </Typography>
          <Typography variant="body2" component="p">
            Entregas Perigosas: {alerts.dangerousDeliveries?.length || 0}
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
