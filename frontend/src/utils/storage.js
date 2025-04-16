const token = () => `Bearer ${localStorage.getItem('TOKEN_MERAHPUTIH')}`;
const userDetail = () => JSON.parse(localStorage.getItem("USERDETAIL_MERAHPUTIH"));

export {
    token,
    userDetail,
}