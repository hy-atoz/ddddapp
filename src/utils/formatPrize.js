import 'intl';
import 'intl/locale-data/jsonp/en';

const formatPrize = (currency, prefix, prize) => {
  return `${prefix} ${new Intl.NumberFormat(currency).format(prize)}`;
};

export default formatPrize;
