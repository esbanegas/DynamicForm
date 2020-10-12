import { toast } from 'react-toastify';
import { isArray, isString, isNumber } from 'lodash';
import { utils } from './../utils';

const getUrl = () => {
  const env = window.location.host;

   if (env === 'production') {
    return 'http://0.0.0.0:4001/api/v1';
  } 
  return 'http://localhost:5001';
};

export const getRequestUserInfo = () =>
  sessionStorage.requestUserInfo
    ? JSON.parse(sessionStorage.requestUserInfo)
    : null;

export const objectParametize = (obj, q, parent) => {
  const str = [];
  const delimeter = '&';
  let objKey;
  const a = Object.keys(obj);
  a.forEach(key => {
    switch (typeof obj[key]) {
      case 'object':
        if (obj[key]) {
          if (isArray(obj[key])) {
            obj[key].forEach(arrObject => {
              if (parent) {
                objKey = `${parent}.${key}`;
              } else {
                objKey = key;
              }
              if (isString(arrObject) || isNumber(arrObject)) {
                if (parent) {
                  str[str.length] = `${parent}.${key}=${arrObject}`;
                }
                str[str.length] = `${key}=${arrObject}`;
              } else if (!isString(arrObject)) {
                str[str.length] = objectParametize(arrObject, false, objKey);
              }
            });
          } else if (isArray(obj[key])) {
            str[str.length] = `${parent}.${key}=${obj[key]}`;
          } else {
            if (parent) {
              objKey = `${parent}.${key}`;
            } else {
              objKey = key;
            }
            str[str.length] = objectParametize(obj[key], false, objKey);
          }
        }
        break;
      default: {
        if (obj[key]) {
          if (parent) {
            str[str.length] = `${parent}.${key}=${obj[key]}`;
          } else {
            str[str.length] = `${key}=${obj[key]}`;
          }
        }
      }
    }
  });

  return (q === true ? '?' : '') + str.join(delimeter);
};

const urlBase = getUrl();

const showValidationMessage = response => {
  utils.hiddenWait();
  if (response) {
    if (response.exceptionMessage) {
      toast.error(response.exceptionMessage);
    } else if (response.validationErrorMessage) {
      toast.warn(response.validationErrorMessage);
    } else if (response.mensajeValidacion) {
      toast.warn(response.mensajeValidacion);
    } else if (response.mensajeError) {
      toast.warn(response.mensajeError);
    }

    return response;
  }
  return response;
};

const returnResponse = response => {
  return response.json()
}

export class restClient {
  static httpGet = (
    url,
    obj,
    useWaitControl = true,
    isEvaluateMessage = true,
  ) => {
    if (useWaitControl) {
      utils.showWait();
    }

    const request = {
      ...obj,
      RequestUserInfo: getRequestUserInfo(),
    };
    let urlparam;

    if (request) {
      urlparam = `&${objectParametize(request, false)}`;
    }
<<<<<<< HEAD

=======
>>>>>>> c70c0671b881e1d0c6a7e63234560556a7ee3d35
    const paramUrl = `${url}?accept: application/json${urlparam}`;
    return fetch(`${urlBase}${paramUrl}`)
      .catch(error => {
        
        if (useWaitControl) {
          utils.hiddenWait();
        }
        toast.error(error.message);
        return error;
      })
      .then(response => {

        if (response && response.status && response.status === 404) {
          return response;
        }
        return !response.message && response.json();
      })
      .then(response => {
        
        if (response && response.status && response.status === 404) {
          if (useWaitControl) {
            
            utils.hiddenWait();
          }
          toast.error(response.statusText);
          return response;
        }

        return isEvaluateMessage ? showValidationMessage(response) : response;
      });
  };

  static httpPost = (url, obj, useWaitControl = true) => {
    
    if (useWaitControl) {
      utils.showWait();
    }
    const request = {
      ...obj
    };
    const uriFinal = `${urlBase}${url}`;
    const bodyString = JSON.stringify(request);
    
    return fetch(uriFinal, {
      method: 'POST',
      body: bodyString,
      headers: { 'Content-type': 'application/json'},
    })
      .catch(error => {
        if (useWaitControl) {
        }
        toast.error(error.message);
      })
      
      .then(response => returnResponse(response))
      .then(response => showValidationMessage(response));
  };


  static httpPut = (url, obj, useWaitControl = true) => {
    if (useWaitControl) {
      utils.showWait();
    }
    const request = {
      ...obj,
      RequestUserInfo: getRequestUserInfo(),
    };
    return fetch(`${urlBase}${url}`, {
      method: 'PUT',
      body: JSON.stringify(request),
      headers: { 'Content-type': 'application/json' },
    })
      .catch(error => {
        if (useWaitControl) {
          
          utils.hiddenWait();
        }
        toast.error(error.message);
      })
      .then(response => response.json())
      .then(response => showValidationMessage(response));
  };

  static httpDelete = (url, obj, useWaitControl = true) => {
    if (useWaitControl) {
      
      utils.showWait();
    }
    const request = {
      ...obj,
      RequestUserInfo: getRequestUserInfo(),
    };
    return fetch(`${urlBase}${url}`, {
      method: 'DELETE',
      body: JSON.stringify(request),
      headers: { 'Content-type': 'application/json' },
    })
      .catch(error => {
        if (useWaitControl) {
          utils.hiddenWait();
        }
        toast.error(error.message);
      })
      .then(response => response.json())
      .then(response => showValidationMessage(response));
  };

  /**
   * @param {data} array<Object>
   * @param {headers} object
   * @param {sheetName} string
   * @param {documentNameXml} string
   * @param {xmlData} string
   * @param {amountDecimals} number
   */
  static ExportToExcel = (
    data,
    headers,
    sheetName,
    documentNameXml,
    xmlData,
    amountDecimals = 2,
  ) => {
    const request = { data, headers, sheetName, xmlData, amountDecimals };

    return restClient.httpPost('/common/export-excel-file', request, false);
  };
}
