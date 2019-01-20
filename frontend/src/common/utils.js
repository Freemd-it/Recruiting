// date, api util 등등

const newLineSymbol = '\n';

class Utils {
  static lineBreak(message) {
    let customMessage = '';

    if (message.indexOf(newLineSymbol) !== -1) {
      message.split(newLineSymbol).forEach(line => {
        customMessage += `${line}<br/>`;
      });
      return customMessage;
    } else {
      return message;
    }
  }
}

export default Utils;
