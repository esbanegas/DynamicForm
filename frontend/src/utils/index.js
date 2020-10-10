import React, { useRef } from 'react';
import { isArray, isString } from 'lodash';

export class utils {

  static showWait = () => {
    // const id = document.getElementById('spinner-love');
    // id.className = 'container-love love-show';
  }

  static hiddenWait = () => {
    const id = document.getElementById('spinner-love');
    if(id){
      id.className = 'container-love love-hide';
    }
  }

  static FormatDate = value => {
    let date = null;

    if (isString(value) && value) {
      date = value.split('/');
      const filter = date.filter(d => d === 'NaN');

      date = filter.length > 0 ? null : new Date(value);
    } else {
      date = value;
    }

    return date
      ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      : '';
  };

  static FormatDateTime = value => {
    let date = null;

    if (isString(value) && value) {
      date = value.split('/');
      const filter = date.filter(d => d === 'NaN');

      date = filter.length > 0 ? null : new Date(value);
    } else {
      date = value;
    }

    return date
      ? `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      : '';
  };

  static getCurrentLocation = () => {
    let location = null;
    const onSucccess = position => {
      location = position;
    }

    const onError = () => {
      location = null;
    }

    if (!!navigator.geolocation) {
      var config = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
      };

      navigator.geolocation.getCurrentPosition(onSucccess, onError, config);
    }

    if (!location) {
      return null;
    }

    return location;
  }


  static descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  static getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => utils.descendingComparator(a, b, orderBy)
      : (a, b) => -utils.descendingComparator(a, b, orderBy);
  }

  static stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  static copyOf = items => {
    if (items === undefined || items === null) {
      return {};
    }

    const copy = JSON.parse(JSON.stringify(items));

    return copy;
  };

  static evaluateObject = obj => {
    if (Array.isArray(obj)) {
      return false;
    }

    const result = !!(obj && Object.keys(obj).length);

    return result;
  };

  static evaluateArray = array => {
    if (!array || !isArray(array)) {
      return false;
    }

    const result = !!(array && array.length);
    return result;
  };

  static hasErrorResponse = response => {
    const fieldErrors = [
      'exceptionMessage',
      'erroresValidacion',
      'validationErrorMessage',
      'mensajeValidacion',
      'mensajeError',
      'message',
    ];

    if (!response) {
      return false;
    }

    const hasErrors = fieldErrors.some(field => {
      if (typeof response[field] === 'object') {
        const isError = utils.evaluateObject(response[field]);

        if (isError) return isError;
      }

      if (typeof response[field] === 'string') {
        if (response[field]) {
          return true;
        }
      }

      return false;
    });

    return hasErrors;
  };

  static getValueString = (prop, obj) => {
    if (utils.evaluateObject(obj)) {
      return obj[prop];
    }

    return '';
  }

static getValueDate = (prop, obj) => {
    if (utils.evaluateObject(obj)) {
      const valueProp = obj[prop] ? new Date(obj[prop]) : null;

      return valueProp;
    }

    return null;
  }
}