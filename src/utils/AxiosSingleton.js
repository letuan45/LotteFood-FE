import axios from "axios";

class AxiosSingleton {
  constructor() {
    if (!AxiosSingleton.instance) {
      this.axiosInstance = axios.create({
        // Cấu hình Axios ở đây, ví dụ: base URL, headers, interceptors, ...
        baseURL: "http://localhost:8080/api",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          'Access-Control-Allow-Origin': "true"
        },
      });

      AxiosSingleton.instance = this;
    }

    return AxiosSingleton.instance;
  }

  getAxiosInstance() {
    return this.axiosInstance;
  }
}

const instance = new AxiosSingleton();
Object.freeze(instance);

export default instance.getAxiosInstance();