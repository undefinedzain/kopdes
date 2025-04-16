import { callApi, getAPIEndpoint } from '@/utils/endpoint';
import { fetchData } from '@/utils/fetch';

const getNPAKByProvince = (provinceCode) =>
    fetchData(`/npak/by-province-code/${provinceCode}`);
const getNotary = ((notaryName, provinceCode) => 
    fetchData(`npak/search/${provinceCode}/${notaryName}`));
const validityCheck = ((notaryId, districtCode) => 
    fetchData(`npak/validity-check/${notaryId}/${districtCode}`));

const updateNPAK = async (body) => {
    const endpoint = getAPIEndpoint('npak/update', 'PATCH');
    
    try {
        const response = await callApi(endpoint, body);
        console.log(response);
        return response
    } catch (error) {
        console.error('updateNPAK call error:', error);
        throw error;
    }
}

const getNPAKByProvinceId = (provinceId) => fetchData(`/npak/province/${provinceId}`);
const getNPAKById = (id) => fetchData(`/npak/${id}`);

export {
    getNPAKByProvince,
    getNotary,
    validityCheck,
    updateNPAK,
    getNPAKByProvinceId,
    getNPAKById,
};