import React, { useEffect, useState } from 'react';
import { Input, Select, Upload, Button, Form, Divider, Checkbox, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Stepper from '@/components/Stepper';
import { useRouter } from 'next/router';
import {
  fetchDistrict,
  fetchProvince,
  fetchSubDistrict,
  fetchVillage,
  fetchVillageDuplicate,
} from '@/services/region';
import {
  getCooperativeTypes,
  registerNewCooperative,
} from '@/services/cooperative';
import { getNPAKByProvince } from '@/services/notary';
const { TextArea } = Input;

const { Dragger } = Upload;
const { Option, OptGroup } = Select;

const props = {
  name: 'file',
  multiple: false,
  maxCount: 1,
  accept: '.pdf',
  beforeUpload: (file) => {
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error('Hanya file PDF yang diperbolehkan!');
    }

    const isLt25MB = file.size / 1024 / 1024 < 25;
    if (!isLt25MB) {
      message.error('Ukuran file harus kurang dari 2 MB!');
    }

    return isPDF && isLt25MB ? true : Upload.LIST_IGNORE;
  },
};

export default function RegistrationNew() {
  const [form] = Form.useForm();
  const router = useRouter();

  const [agreementStatus, setAgreementStatus] = useState({
    agreement_1: false,
    agreement_2: false,
  });

  const handleCheckboxChange = (e, name) => {
    setAgreementStatus((prev) => ({
      ...prev,
      [name]: e.target.checked,
    }));
  };

  const [loadingForm, setLoadingForm] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [provinceCode, setProvinceCode] = useState();
  const [districts, setDistricts] = useState([]);
  const [districtCode, setDistrictCode] = useState();
  const [subDistricts, setSubDistricts] = useState([]);
  const [subDistrictCode, setSubDistrictCode] = useState();
  const [villages, setVillages] = useState([]);
  const [cooperativeTypes, setCooperativeTypes] = useState();
  const [notaryNumbers, setNotaryNumbers] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showNotaryField, setShowNotaryField] = useState(false);

  useEffect(() => {
    fetchProvince().then(setProvinces);
    getCooperativeTypes().then(setCooperativeTypes);
  }, []);

  useEffect(() => {
    if (provinceCode) {
      fetchDistrict(provinceCode).then(setDistricts);
      getNPAKByProvince(provinceCode).then(setNotaryNumbers);
    }
  }, [provinceCode]);

  useEffect(() => {
    fetchSubDistrict(districtCode).then(setSubDistricts);
  }, [districtCode]);

  useEffect(() => {
    fetchVillage(subDistrictCode).then(setVillages);
  }, [subDistrictCode]);

  const onFinish = (val) => {
    setLoadingForm(true);
    const registerInput = {
      ...val,
      klu_ids: val.klu_ids?.join(','),
      bamd: val.bamd.file.originFileObj,
      bara: val.bara.file.originFileObj,
      subdomain: val.subdomain + '.kop.id',
      cooperative_name:
        `KOPERASI ${selectedDistrict} MERAH PUTIH ` + val.cooperative_name,
      phone: '62' + val.phone,
      registration_type: 'Pendaftaran Baru',
    };

    registerNewCooperative(registerInput)
    .then(val => {
      if (val) {
        router.push('/daftar/sukses')
        setLoadingForm(false);
      }
    })
    .catch(err => {
      message.error({
        content: 'Periksa kembali data koperasi anda dan silahkan ulangi kembali',
        duration: 3,
      });
      setLoadingForm(false);
    });

  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Sidebar */}
      <Stepper activeIndex={1} />

      {/* Main Content */}
      <div className="md:w-[70%] w-full px-6 py-10">
        <h2 className="text-2xl font-semibold text-[#003B49] mb-1">
          Informasi Data Koperasi
        </h2>
        <p className="text-[#7CAF3C] mb-6">Membangun Koperasi Baru</p>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Divider>Kedudukan</Divider>

          <Form.Item
            label="Provinsi"
            name="province_code"
            className="mb-4"
            rules={[{ required: true, message: 'Provinsi wajib dipilih.' }]}
          >
            <Select
              placeholder="Pilih Provinsi"
              options={provinces.map((province) => ({
                label: province.name,
                value: province.code,
              }))}
              showSearch
              filterOption={(input, option) =>
                option?.label?.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => {
                setProvinceCode(value);
                form.setFieldsValue({
                  district_code: null,
                  subdistrict_code: null,
                  village_code: null,
                  npak_id: null,
                });
              }}
            />
          </Form.Item>

          <Form.Item
            label="Kabupaten/Kota"
            name="district_code"
            className="mb-4"
            rules={[
              { required: true, message: 'Kabupaten/Kota wajib dipilih.' },
            ]}
          >
            <Select
              placeholder="Pilih Kabupaten/Kota"
              options={districts?.map((district) => ({
                label: district.name,
                value: district.code,
              }))}
              showSearch
              filterOption={(input, option) =>
                option?.label?.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => {
                setDistrictCode(value);
                form.setFieldsValue({
                  subdistrict_code: null,
                  village_code: null,
                });
                const selectedCode = districts.find(
                  (district) => district.code === value
                );
                if (selectedCode.name.toUpperCase().includes('KOTA')) {
                  setSelectedDistrict('KELURAHAN');
                } else if (selectedCode.name.toUpperCase().includes('KAB')) {
                  setSelectedDistrict('DESA');
                }
              }}
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Form.Item
              label="Kecamatan"
              name="subdistrict_code"
              rules={[{ required: true, message: 'Kecamatan wajib dipilih.' }]}
            >
              <Select
                placeholder="Pilih Kecamatan"
                options={subDistricts?.map((val) => ({
                  label: val.name,
                  value: val.code,
                }))}
                showSearch
                filterOption={(input, option) =>
                  option?.label?.toLowerCase().includes(input.toLowerCase())
                }
                onChange={(val) => {
                  setSubDistrictCode(val);
                  form.setFieldsValue({
                    village_code: null,
                  });
                }}
              />
            </Form.Item>

            <Form.Item
              label="Desa / Kelurahan"
              name="village_code"
              rules={[
                { required: true, message: 'Desa/Kelurahan wajib dipilih.' },
              ]}
            >
              <Select
                placeholder="Pilih Desa / Kelurahan"
                options={villages?.map((val) => ({
                  label: val.name,
                  value: val.code,
                }))}
                onChange={(val) => {
                  const selectedVillage = villages.find(
                    (village) => village.code === val
                  );

                  let villageName = selectedVillage?.name;
                  fetchVillageDuplicate(val).then((val) => {
                    if (val.is_duplicate) {
                      const subdistrict = subDistricts.find(
                        (val) => val.code === subDistrictCode
                      )?.name;
                      villageName = `${villageName} KECAMATAN ${subdistrict}`;
                    } else {
                      villageName;
                    }

                    form.setFieldsValue({
                      cooperative_name: villageName.toUpperCase(),
                      subdomain: villageName.toLowerCase().replace(/\s+/g, ''),
                    });
                  });
                }}
                showSearch
                filterOption={(input, option) =>
                  option?.label?.toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Nama Koperasi Baru"
            name="cooperative_name"
            className="mb-4"
            rules={[
              { required: true, message: 'Nama koperasi wajib diisi.' },
            ]}
          >
            <Input
              addonBefore={`KOPERASI ${selectedDistrict} MERAH PUTIH`}
              onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
              onChange={(val) => {
                form.setFieldsValue({
                  subdomain: val.target.value?.toLowerCase().replace(/\s+/g, ''),
                });
              }}
            />
          </Form.Item>

          <Form.Item
            label="Notaris Pembuat Akta Koperasi"
            name="npak_id"
            className="mb-4"
            rules={[{ required: true, message: 'Notaris wajib dipilih.' }]}
          >
            <Select
              placeholder="Pilih Notaris"
              options={notaryNumbers?.map((notary) => ({
                label: notary.name,
                value: notary.notary_id,
              }))}
              showSearch
              filterOption={(input, option) =>
                option?.label?.toLowerCase().includes(input.toLowerCase())
              }
              defaultActiveFirstOption={true}
              onChange={(val) => setShowNotaryField(val === 1)}
            />
          </Form.Item>
          
          {showNotaryField && (
            <>
              <Form.Item
                label="Nama Notaris"
                name="npak_name"
                rules={[
                  { required: showNotaryField, message: 'Nama notaris wajib diisi' },
                ]}
              >
                <Input placeholder="Masukan nama notaris" />
              </Form.Item>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label="Alamat Email"
                  name="npak_email"
                  rules={[
                    {
                      required: showNotaryField,
                      type: 'email',
                      message: 'Alamat email tidak valid atau kosong.',
                    },
                  ]}
                >
                  <Input placeholder="Masukan email notaris" />
                </Form.Item>

                <Form.Item
                  label="Nomor HP"
                  name="npak_phone"
                  rules={[
                    { required: showNotaryField, message: 'Nomor HP wajib diisi.' },
                    { min: 8, message: 'Nomor HP harus terdiri dari minimal 8 digit.' },
                  ]}
                >
                  <Input addonBefore="+62" placeholder="812345678" type="number" />
                </Form.Item>
              </div>
              <Form.Item
                label="Alamat Notaris"
                name="npak_address"
                rules={[
                  { required: showNotaryField, message: 'Alamat notaris wajib diisi' },
                ]}
              >
                <TextArea
                  placeholder="Masukan alamat notaris"
                  maxLength={256}
                  rows={2}
                />
              </Form.Item>
            </>
          )}

          <Form.Item
            label={
              <div className="flex flex-col gap-1">
                <span className="font-medium">
                  Berita Acara Musyawarah Desa Khusus (Max 25 MB)
                </span>
                {/* <Button
                  type="link"
                  size="small"
                  className="text-blue-600 p-0 self-start text-wrap text-left"
                  onClick={() => {
                    window.open(
                      '/docs/Template_Berita_Acara_Musyawarah_Desa.docx',
                      '_blank'
                    );
                  }}
                >
                  Unduh Template Berita Acara Musyawarah Desa Khusus
                </Button> */}
              </div>
            }
            name="bamd"
            rules={[
              {
                required: true,
                message: 'Dokumen Musyawarah Desa wajib diunggah.',
              },
            ]}
          >
            <Dragger
              className="!bg-white"
              {...props}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Unggah atau tarik dokumen Berita Acara Musyawarah Desa Khusus ke
                sini
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item
            label={
              <div className="flex flex-col gap-1">
                <span className="font-medium">Berita Acara Rapat Anggota (Max 25 MB)</span>
                {/* <Button
                  type="link"
                  size="small"
                  className="text-blue-600 p-0 self-start text-wrap text-left"
                  onClick={() => {
                    window.open(
                      '/docs/Template_Berita_Acara_Rapat_Anggota.docx',
                      '_blank'
                    );
                  }}
                >
                  Unduh Template Berita Acara Rapat Anggota
                </Button> */}
              </div>
            }
            name="bara"
            rules={[
              {
                required: true,
                message: 'Dokumen Rapat Anggota wajib diunggah.',
              },
            ]}
          >
            <Dragger
              className="!bg-white"
              {...props}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Unggah atau tarik dokumen Berita Acara Rapat Anggota ke sini
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item
            label="Jenis Usaha Koperasi"
            name="klu_ids"
            className="mb-4 w-full"
            rules={[
              {
                required: true,
                message: 'Jenis Usaha Koperasi wajib dipilih.',
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Pilih Jenis Usaha"
              className="w-full"
              popupMatchSelectWidth={true}
            >
              {cooperativeTypes?.map((type) => (
                <OptGroup key={type.cooperative_type_id} label={type.name}>
                  {type.klus.map((option) => (
                    <Option key={option.klu_id} value={option.klu_id}>
                      <span className="whitespace-normal break-words">{`${option.code_kbli} - ${option.name}`}</span>
                    </Option>
                  ))}
                </OptGroup>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Pendaftaran Nama Domain"
            name="subdomain"
            className="mb-6"
            rules={[
              { required: true, message: 'Nama domain koperasi wajib diisi.' },
            ]}
          >
            <Input
              onInput={(e) => (e.target.value = e.target.value.toLowerCase())}
              addonAfter=".kop.id"
              placeholder="contoh: durentiga"
            />
          </Form.Item>

          <Divider>Kuasa Penghadap Notaris</Divider>
          <Form.Item
            label="Nama Kuasa Penghadap Notaris"
            name="name"
            rules={[
              { required: true, message: 'Nama kuasa penghadap notaris wajib diisi.' },
            ]}
          >
            <Input
              onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
              placeholder="Masukan nama kuasa penghadap notaris atau ketua koperasi"
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Alamat Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Alamat email tidak valid atau kosong.',
                },
              ]}
            >
              <Input placeholder="Masukan email koperasi" />
            </Form.Item>

            <Form.Item
              label="Nomor HP"
              name="phone"
              rules={[
                { required: true, message: 'Nomor HP wajib diisi.' },
                {
                  validator: (_, value) => {
                    if (!value || value.length < 8) {
                      return Promise.reject('Nomor HP harus terdiri dari minimal 8 digit.');
                    }
                    if (!/^8\d*$/.test(value)) {
                      return Promise.reject('Nomor HP harus diawali dengan angka 8.');
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input addonBefore="+62" placeholder="812345678" maxLength={15} type="tel" />
            </Form.Item>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Buat Kata Sandi"
              name="password"
              rules={[
                { required: true, message: 'Kata sandi wajib diisi.' },
                { min: 8, message: 'Kata sandi minimal 8 karakter.' },
              ]}
            >
              <Input.Password placeholder="Masukan kata sandi" />
            </Form.Item>

            <Form.Item
              label="Ulangi Kata Sandi"
              name="password_confirmation"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Konfirmasi kata sandi wajib diisi.',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Kata sandi tidak cocok');
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Masukan ulang kata sandi" />
            </Form.Item>
          </div>

          <Form.Item
            name="agreement_1"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject('Harus menyetujui pernyataan'),
              },
            ]}
          >
            <Checkbox onChange={(e) => handleCheckboxChange(e, 'agreement_1')}>
              Saya menyatakan data yang saya berikan adalah benar, jika
              dikemudian hari ternyata terdapat ketidaksesuaian atau kekeliruan,
              saya bersedia menerima segala konsekuensi hukum serta sanksi
              administratif yang berlaku.
            </Checkbox>
          </Form.Item>
          <Form.Item
            name="agreement_2"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject('Harus menyetujui pernyataan'),
              },
            ]}
          >
            <Checkbox onChange={(e) => handleCheckboxChange(e, 'agreement_2')}>
              Saya menyatakan bahwa seluruh anggota koperasi berdomisili
              di wilayah yang sama.
            </Checkbox>
          </Form.Item>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <Button
              onClick={() => router.back()}
              type="default"
              block
              className="md:w-1/2"
            >
              Kembali
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loadingForm}
              disabled={
                agreementStatus.agreement_1 && agreementStatus.agreement_2
                  ? false
                  : true
              }
              className="md:w-1/2 bg-teal-800 hover:bg-teal-900"
            >
              Daftar Sekarang
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
