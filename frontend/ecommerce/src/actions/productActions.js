import axios from 'axios';
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_SUCCESS } from "../constants/productConstants";

const listProducts = () => async (dispatch) => {
    try { 
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get("http://localhost:8080/registers/getAllProducts");
        

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data }); 
    }   
    catch(error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}

const saveProduct = (product) => async (dispatch) => {
    const bodyFormData = new FormData();  
    const file = document.querySelector('#file')

    bodyFormData.append('file', file.files[0])
    bodyFormData.append('document', JSON.stringify(product))

    try {
      dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
      if (!product._id) {
        
        const { data } = await axios.post('http://localhost:8080/registers/registerProduct', bodyFormData);
        
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      } else {

        const { data } = await axios.put('http://localhost:8080/registers/updateProduct', bodyFormData);
        
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      }
    } catch (error) { 
      dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
    }
  }

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
        
        const { data } = await axios.get("http://localhost:8080/registers/getProduct/" + productId);
        
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message});
    }
}

const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
      const { data } = await axios.delete("http://localhost:8080/registers/deleteProduct/" + productId);
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
    }
}
export { listProducts, detailsProduct, saveProduct, deleteProduct }


