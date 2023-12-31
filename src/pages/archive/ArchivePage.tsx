import { FC, useEffect, useState } from 'react';
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
import { useStore } from 'effector-react';
import {
  dashboard,
  formatTemplate,
  maxDate,
  minDate,
} from '../../store/dataStore';

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
  const regions = useStore(dashboard.regionsDropdownStore.$selectedFilter);

  const getData = async () => {
    const response = await http.get('/events/');
    setData(response.data);
  };

  const postEvent = async () => {
    const fields = form.getFieldsValue(true);
    await http.post('/events/', {
      ...fields,
      date: fields.date.toISOString().split('T')[0],
      region_id: regions,
    });
    await getData();
    setOpen(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [open]);

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
            <DatePicker
              format={formatTemplate}
              disabledDate={(date) => {
                return !(
                  date.diff(minDate, 'day') > 0 && date.diff(maxDate, 'day') < 0
                );
              }}
            />
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
        <Table
          rowKey={'id'}
          dataSource={data}
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  );
};
