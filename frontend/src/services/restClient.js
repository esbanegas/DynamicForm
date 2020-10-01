const getUrl = () => {
  const env = window.location.host;

   if (env === 'test') {
    return 'http://localhost:44317/api/v1'; //TEst
  } else if (env === 'production') {//production
    return 'http://localhost:44317/api/v1';
  } 
  
  return 'http://localhost:44317/api/v1';
};

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
  // waitControlHide();
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

export class restClient {
  static httpGet = (
    url,
    obj,
    useWaitControl = true,
    isEvaluateMessage = true,
  ) => {
    if (useWaitControl) {
      // waitControlShow();
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

    const paramUrl = `${url}?format=json${urlparam}`;
    console.log(`${urlBase}${paramUrl}`);
    return fetch(`${urlBase}${paramUrl}`)
      .catch(error => {
        
        if (useWaitControl) {
          // waitControlHide();
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
            // waitControlHide();
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
      // waitControlShow();
      utils.showWait();
    }

    const requestUserInfo = getRequestUserInfo();

    const request = {
      ...obj,
      requestUserInfo,
    };
    return fetch(`${urlBase}${url}`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: { 'Content-type': 'application/json' },
    })
      .catch(error => {
        if (useWaitControl) {
          //waitControlHide();
        }
        toast.error(error.message);
      })
      .then(response => response.json())
      .then(response => showValidationMessage(response));
  };

  static httpPut = (url, obj, useWaitControl = true) => {
    if (useWaitControl) {
      // waitControlShow();
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
          // waitControlHide();
          utils.hiddenWait();
        }
        toast.error(error.message);
      })
      .then(response => response.json())
      .then(response => showValidationMessage(response));
  };

  static httpDelete = (url, obj, useWaitControl = true) => {
    if (useWaitControl) {
      // waitControlShow();
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
          // waitControlHide();
          utils.hiddenWait();
        }
        toast.error(error.message);
      })
      .then(response => response.json())
      .then(response => showValidationMessage(response));
  };