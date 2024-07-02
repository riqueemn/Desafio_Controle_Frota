import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [destinations, setDestination] = useState([]);
  const [cargas, setCarga] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentDelivery, setCurrentDelivery] = useState(null);

  useEffect(() => {
    fetchDeliveries();
    fetchTrucks();
    fetchDrivers();
    fetchAddresses();
    fetchCargas();
  }, []);

  const fetchDeliveries = async () => {
    const result = await axios.get('http://localhost:3001/api/deliveries');
    setDeliveries(result.data);
  };

  const fetchTrucks = async () => {
    const result = await axios.get('http://localhost:3001/api/trucks');
    setTrucks(result.data);
  };

  const fetchDrivers = async () => {
    const result = await axios.get('http://localhost:3001/api/drivers');
    setDrivers(result.data);
  };

  const fetchAddresses = async () => {
    const result = await axios.get('http://localhost:3001/api/addresses');
    setDestination(result.data);
  };

  const fetchCargas = async () => {
    const result = await axios.get('http://localhost:3001/api/cargas');
    setCarga(result.data);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setCurrentDelivery(null);
  };

  const handleSubmit = async (values) => {
    try {
      if (isEditMode && currentDelivery) {
        await axios.put(`http://localhost:3001/api/deliveries/${currentDelivery.id}`, values);
        message.success('Entrega atualizada com sucesso');
      } else {
        await axios.post('http://localhost:3001/api/deliveries', values);
        message.success('Entrega adicionada com sucesso');
      }
      fetchDeliveries();
      handleCancel();
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const handleEdit = (record) => {
    setCurrentDelivery(record);
    setIsEditMode(true);
    showModal();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/api/deliveries/${id}`);
    fetchDeliveries();
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Caminhão', dataIndex: 'truckId', key: 'truckId' },
    { title: 'Motorista', dataIndex: 'driver', key: 'driver' },
    
    {
      title: 'Tipo de Carga',
      dataIndex: 'cargoType',
      key: 'cargoType',
      render: (cargoType, record) => {
        const hasInsurance = record.hasInsurance;
        return (
          <>
            {cargoType}
            {cargoType === 'Eletrônicos' && (
              <span style={{ marginLeft: 8 }}>
                {hasInsurance ? (
                  <span style={{ color: 'green', fontWeight: 'bold' }}>(Segurado)</span>
                ) : (
                  <span style={{ color: 'orange', fontWeight: 'bold' }}>(Não Segurado)</span>
                )}
              </span>
            )}

            {cargoType === 'Combustível' && (
              <span style={{ marginLeft: 8 }}>
                <span style={{ color: 'red', fontWeight: 'bold' }}>(Perigoso)</span>
              </span>
            )}
          </>
        );
      },
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
      render: (value) => {
        const isValuable = value > 30000;
        return (
          <>
            R$ {value}
            {isValuable && <span style={{ color: 'gold', fontWeight: 'bold' }}> (Valiosa)</span>}
          </>
        );
      },
    },
    { title: 'Destino', dataIndex: 'destination', key: 'destination' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Ações', key: 'action', render: (text, record) => (
      <>
        <Button onClick={() => handleEdit(record)}>Editar</Button>
        <Button onClick={() => handleDelete(record.id)} danger>Excluir</Button>
      </>
    ) },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal}>Adicionar Entrega</Button>
      <Table columns={columns} dataSource={deliveries} rowKey="id" />
      <Modal
        title={isEditMode ? 'Editar Entrega' : 'Adicionar Entrega'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={currentDelivery}
          onFinish={handleSubmit}
        >
          <Form.Item name="truckId" label="Caminhão" rules={[{ required: true }]}>
            <Select>
              {trucks.map(truck => (
                <Option key={truck.id} value={truck.id}>{truck.model}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="driver" label="Motorista" rules={[{ required: true }]}>
            <Select>
              {drivers.map(driver => (
                <Option key={driver.id} value={driver.name}>{driver.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="cargoType" label="Tipo de Carga" rules={[{ required: true }]}>
          <Select>
              {cargas.map(carga => (
                <Option key={carga.id} value={carga.tipo}>{carga.tipo}</Option>
              ))}
          </Select>
          </Form.Item>
          <Form.Item name="value" label="Valor" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="destination" label="Destino" rules={[{ required: true }]}>
            <Select>
              {destinations.map(destination => (
                <Option key={destination.id} value={destination.local}>{destination.local}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="hasInsurance" label="Tem Seguro" rules={[{ required: true }]}>
            <Select>
              <Option value={true}>Sim</Option>
              <Option value={false}>Não</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Pendente">Pendente</Option>
              <Option value="Concluída">Concluída</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditMode ? 'Atualizar' : 'Adicionar'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Deliveries;
