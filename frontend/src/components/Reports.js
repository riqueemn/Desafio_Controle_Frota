import React, { useState, useEffect } from 'react';
import { Table, Select, DatePicker, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { Bar, Line, Pie } from 'react-chartjs-2';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState([]);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filterPeriod, filterType, reports]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/reports');
      setReports(response.data);
      setFilteredReports(response.data);
    } catch (error) {
      console.error('Error fetching reports', error);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = reports;

    if (filterPeriod.length) {
      filtered = filtered.filter(report => {
        const reportDate = moment(report.date);
        return reportDate.isBetween(filterPeriod[0], filterPeriod[1], undefined, '[]');
      });
    }

    if (filterType) {
      filtered = filtered.filter(report => report.type === filterType);
    }

    setFilteredReports(filtered);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tipo', dataIndex: 'type', key: 'type' },
    { title: 'Data', dataIndex: 'date', key: 'date' },
    { title: 'Detalhes', dataIndex: 'details', key: 'details' },
  ];

  const chartData = {
    labels: filteredReports.map(report => report.date),
    datasets: [
      {
        label: 'Valores',
        data: filteredReports.map(report => report.value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <RangePicker
            style={{ width: '100%' }}
            onChange={dates => setFilterPeriod(dates)}
          />
        </Col>
        <Col span={8}>
          <Select
            placeholder="Filtrar por tipo de relatório"
            value={filterType}
            onChange={value => setFilterType(value)}
            style={{ width: '100%' }}
          >
            <Option value="">Todos os Tipos</Option>
            <Option value="Financeiro">Financeiro</Option>
            <Option value="Operacional">Operacional</Option>
          </Select>
        </Col>
      </Row>
      <Table columns={columns} dataSource={filteredReports} loading={loading} rowKey="id" />
      <Bar data={chartData} />
      <Line data={chartData} />
      <Pie data={chartData} />
    </div>
  );
};

export default Reports;
