import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Row, Col } from 'antd';
import axios from 'axios';

const { Option } = Select;

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [filterTruck, setFilterTruck] = useState('');

  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchText, filterTruck, drivers]);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/drivers');
      setDrivers(response.data);
      setFilteredDrivers(response.data);
    } catch (error) {
      message.error('Error fetching drivers');
    }
    setLoading(false);
  };

  const handleAddDriver = async (values) => {
    try {
      const response = await axios.post('http://localhost:3001/api/drivers', values);
      setDrivers([...drivers, response.data]);
      setModalVisible(false);
      form.resetFields();
      message.success('Driver added successfully');
    } catch (error) {
      message.error('Error adding driver');
    }
  };

  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
    form.setFieldsValue(driver);
    setModalVisible(true);
  };

  const handleUpdateDriver = async (values) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/drivers/${editingDriver.id}`, values);
      setDrivers(drivers.map(driver => driver.id === editingDriver.id ? response.data : driver));
      setModalVisible(false);
      setEditingDriver(null);
      form.resetFields();
      message.success('Driver updated successfully');
    } catch (error) {
      message.error('Error updating driver');
    }
  };

  const handleDeleteDriver = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/drivers/${id}`);
      setDrivers(drivers.filter(driver => driver.id !== id));
      message.success('Driver deleted successfully');
    } catch (error) {
      message.error('Error deleting driver');
    }
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(values => {
        if (editingDriver) {
          handleUpdateDriver(values);
        } else {
          handleAddDriver(values);
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingDriver(null);
    form.resetFields();
  };

  const applyFilters = () => {
    let filtered = drivers;

    if (searchText) {
      filtered = filtered.filter(driver =>
        driver.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterTruck) {
      filtered = filtered.filter(driver => driver.associatedTruck === filterTruck);
    }

    setFilteredDrivers(filtered);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Caminhão Associado', dataIndex: 'associatedTruck', key: 'associatedTruck' },
    { title: 'Entregas Realizadas', dataIndex: 'deliveriesCompleted', key: 'deliveriesCompleted' },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button onClick={() => handleEditDriver(record)} type="primary">Editar</Button>
          <Button onClick={() => handleDeleteDriver(record.id)} type="danger" style={{ marginLeft: 8 }}>Excluir</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Input
            placeholder="Buscar por nome"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </Col>
        <Col span={12}>
          <Select
            placeholder="Filtrar por caminhão associado"
            value={filterTruck}
            onChange={value => setFilterTruck(value)}
            style={{ width: '100%' }}
          >
            <Option value="">Todos os Caminhões</Option>
            {[...new Set(drivers.map(driver => driver.associatedTruck))].map(truck => (
              <Option key={truck} value={truck}>{truck}</Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: 16 }}>
        Adicionar Motorista
      </Button>
      <Table columns={columns} dataSource={filteredDrivers} loading={loading} rowKey="id" />
      <Modal
        title={editingDriver ? "Editar Motorista" : "Adicionar Motorista"}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Nome" rules={[{ required: true, message: 'Por favor insira o nome' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="associatedTruck" label="Caminhão Associado" rules={[{ required: true, message: 'Por favor insira o caminhão associado' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="deliveriesCompleted" label="Entregas Realizadas" rules={[{ required: true, message: 'Por favor insira o número de entregas realizadas' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Drivers;
