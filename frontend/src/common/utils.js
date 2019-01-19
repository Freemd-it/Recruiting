// date, api util 등등
import React from 'react';

const newLineSymbol = '\n';

class Utils {
  static lineBreak(message) {
    let customMessage = '';

    if (message.indexOf(newLineSymbol) !== -1) {
      message.split(newLineSymbol).forEach((line, idx) => {
        customMessage += `${line}<br/>`;
      });
      return customMessage;
    } else {
      return message;
    }
  }
}

export default Utils;
