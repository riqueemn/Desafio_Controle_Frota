import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, Alert, message } from 'antd';

const { Option } = Select;

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    truckId: '',
    driver: '',
    cargoType: '',
    value: '',
    destination: '',
    status: 'Pendente'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDeliveries();
    fetchTrucks();
    fetchDrivers();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/deliveries');
      setDeliveries(response.data);
    } catch (error) {
      message.error('Erro ao buscar entregas.');
    }
  };

  const fetchTrucks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/trucks');
      setTrucks(response.data);
    } catch (error) {
      message.error('Erro ao buscar caminhões.');
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/drivers');
      setDrivers(response.data);
    } catch (error) {
      message.error('Erro ao buscar motoristas.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setError('');
    try {
      await axios.post('http://localhost:3001/api/deliveries', formData);
      fetchDeliveries();
      setShowModal(false);
      message.success('Entrega adicionada com sucesso.');
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao adicionar entrega.');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Caminhão',
      dataIndex: 'truckId',
      key: 'truckId',
    },
    {
      title: 'Motorista',
      dataIndex: 'driver',
      key: 'driver',
    },
    {
      title: 'Tipo de Carga',
      dataIndex: 'cargoType',
      key: 'cargoType',
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Destino',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Editar</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Excluir</Button>
        </>
      ),
    },
  ];

  const handleEdit = (record) => {
    setFormData(record);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/deliveries/${id}`);
      fetchDeliveries();
      message.success('Entrega excluída com sucesso.');
    } catch (error) {
      message.error('Erro ao excluir entrega.');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setShowModal(true)}>Adicionar Entrega</Button>
      <Table dataSource={deliveries} columns={columns} rowKey="id" />

      <Modal
        title="Adicionar Entrega"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleSubmit}
      >
        {error && <Alert message={error} type="error" />}
        <Form layout="vertical">
          <Form.Item label="ID do Caminhão">
            <Select
              name="truckId"
              value={formData.truckId}
              onChange={(value) => handleSelectChange(value, 'truckId')}
              required
            >
              {trucks.map((truck) => (
                <Option key={truck.id} value={truck.id}>
                  {truck.id} - {truck.model}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Motorista">
            <Select
              name="driver"
              value={formData.driver}
              onChange={(value) => handleSelectChange(value, 'driver')}
              required
            >
              {drivers.map((driver) => (
                <Option key={driver.id} value={driver.name}>
                  {driver.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Tipo de Carga">
            <Input
              type="text"
              name="cargoType"
              value={formData.cargoType}
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Valor">
            <Input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Destino">
            <Input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              required
            />
          </Form.Item>
          <Form.Item label="Status">
            <Select
              name="status"
              value={formData.status}
              onChange={(value) => handleSelectChange(value, 'status')}
              required
            >
              <Option value="Pendente">Pendente</Option>
              <Option value="Concluída">Concluída</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Deliveries;
