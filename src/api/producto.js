import {ENV} from "../utils";
import Axios from "axios";
export class Producto{

    baseApi=ENV.BASE_API;

    async createProduct(formData){
        try {
            const response = await Axios({
                method: "POST",
                url: `${this.baseApi}/${ENV.API_ROUTES.CREATEPRODUCTO}`,
                data: formData
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, formData) {
        try {
            const response = await Axios({
                method: "PATCH",
                url: `${this.baseApi}${ENV.API_ROUTES.EDIPRODUCTO}/${id}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
}
//frontend