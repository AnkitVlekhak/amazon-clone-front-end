import axios from "axios";
const instance = axios.create({
    baseURL: "https://amazon-clone-payment-server.onrender.com"
})
export const paymentStripe = (data) => instance.post(`/payments/create?total=${data}`)
export default instance;