class CalculatorServiceApi {
  private static baseURL = `${import.meta.env.VITE_SERVER_URL}/api/v1`;

  private static async fetch(url: string, fetchOptions: RequestInit) {
    const checkStatus = (response: Response): Promise<Response> => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        console.error("Looks like there was a problem");
        return Promise.reject(new Error(response.statusText));
      }
    };

    const convertToJSON = (response: Response): Promise<object> =>
      response.json();

    return fetch(url, fetchOptions).then(checkStatus).then(convertToJSON);
  }

  static async calculateMortage(formData: object) {
    const url = `${this.baseURL}/calculate-mortgage`;
    const options: RequestInit = {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    };
    return this.fetch(url, options);
  }
}

export default CalculatorServiceApi;
