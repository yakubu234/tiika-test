const handleResponse = (res:any, data:any, status = 200) => {
    return res.status(status).json(data);
};
  
export default handleResponse;