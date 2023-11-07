import moment from 'moment';// add this 1 of 4
export default class Utils {

  formatDateToString( date: Date  | undefined) {
    if (date)
      return moment(date).format('DD/MM/YYYY');

    return '';
  }

  removeSlash(text: string) {
    return text.replace(/\\/g,'');
  }

  validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  
  dynamicSort = (property: string) => {
    // eslint-disable-next-line func-names
    return function(itema: any, itemb: any) {
        return (itema[property] < itemb[property]) ? -1 : (itema[property] > itemb[property]) ? 1 : 0;
    }
 }

}
