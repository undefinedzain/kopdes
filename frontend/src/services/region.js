import { fetchData } from '@/utils/fetch';

const fetchProvince = () => fetchData('/provinces');
const fetchDistrict = (provinceCode) =>
  fetchData(`/districts/by-province-code/${provinceCode}`);
const fetchSubDistrict = (districtCode) =>
  fetchData(`/sub-districts/by-district-code/${districtCode}`);
const fetchVillage = (subDistrictCode) =>
  fetchData(`/villages/by-sub-district-code/${subDistrictCode}`);
const fetchVillageDuplicate = (villageCode) =>
  fetchData(`/villages/duplicate-check/${villageCode}`);
const getProvinceById = (provinceId) =>
  fetchData(`/province/${provinceId}`);
const getDistrictById = (districtId) =>
  fetchData(`/district/${districtId}`);
const getSubdistrictById = (subdistrictId) =>
  fetchData(`/subdistrict/${subdistrictId}`);
const getVillageById = (villageId) =>
  fetchData(`/village/${villageId}`);

export {
  fetchProvince,
  fetchDistrict,
  fetchSubDistrict,
  fetchVillage,
  fetchVillageDuplicate,
  getProvinceById,
  getDistrictById,
  getSubdistrictById,
  getVillageById,
};
