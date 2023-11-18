import { FC, useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Table,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { http } from '../../lib/server/http';

interface IData {
  date: string;
  humidity: string;
  temp: string;
  notes: string;
}

export const ArchivePage: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [data, setData] = useState<IData>();

  const getData = async () => {
    const response = await http.get('/events/');
    setData(response.data);
  };

  const postEvent = async () => {
    const fields = form.getFieldsValue(true);
    console.log(fields);
  };

  useEffect(() => {
    getData();
  }, []);

  // const data = [
  //   {
  //     date: '2022-05-22',
  //     humidity: '80',
  //     temp: '+20',
  //     notes: 'Обработка от клещей ядом',
  //   },
  //   {
  //     date: '2022-05-21',
  //     humidity: '80',
  //     temp: '+25',
  //     notes: 'Обработка от клещей ядом',
  //   },
  //   {
  //     date: '2022-05-20',
  //     humidity: '80',
  //     temp: '+24',
  //     notes: 'Обработка от клещей ядом',
  //   },
  //   {
  //     date: '2022-05-19',
  //     humidity: '80',
  //     temp: '+17',
  //     notes: 'Обработка от клещей ядом',
  //   },
  // ];

  const columns: ColumnsType<any> = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      sorter: false,
    },
    {
      title: 'Температура',
      dataIndex: 'temp',
      key: 'temp',
      sorter: false,
    },
    {
      title: 'Отн. влажность',
      dataIndex: 'humidity',
      key: 'humidity',
      sorter: false,
    },
    {
      title: 'Проведенные мероприятия',
      dataIndex: 'notes',
      key: 'notes',
      sorter: false,
    },
  ];

  return (
    <div>
      <Modal
        title='Добавить событие'
        destroyOnClose
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={postEvent}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 800 }}
          form={form}
          onFinish={console.log}
          autoComplete='off'
        >
          <Form.Item label='Дата' labelCol={{ span: 24 }} name='date'>
            <DatePicker format={'DD-MM-YYYY'} />
          </Form.Item>
          <Form.Item label='Температура' name='temp' labelCol={{ span: 24 }}>
            <InputNumber />
          </Form.Item>
          <Form.Item
            label='Относительная влажность'
            name='humidity'
            labelCol={{ span: 24 }}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label='Проведенные мероприятия'
            name='notes'
            labelCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={() => setOpen(true)} style={{ margin: '20px 100px' }}>
        Добавить событие
      </Button>
      <div style={{ margin: '0px 100px' }}>
        <Table rowKey={'id'} dataSource={data} columns={columns} />
      </div>
    </div>
  );
};
