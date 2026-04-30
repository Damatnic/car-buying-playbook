export const WI_TAX_RATE = 0.055;
export const MONTHLY_CAP_DEFAULT = 500;

export interface PaymentInputs {
  stickerPrice: number;
  downPayment: number;
  aprPercent: number;
  termMonths: number;
  taxRate?: number;
}

export interface PaymentResult {
  otdPrice: number;
  financed: number;
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
}

export function calcPayment(inputs: PaymentInputs): PaymentResult {
  const taxRate = inputs.taxRate ?? WI_TAX_RATE;
  const otdPrice = inputs.stickerPrice * (1 + taxRate);
  const financed = Math.max(0, otdPrice - inputs.downPayment);
  const monthlyRate = inputs.aprPercent / 100 / 12;
  const n = inputs.termMonths;
  const monthlyPayment = monthlyRate === 0
    ? financed / n
    : (financed * (monthlyRate * Math.pow(1 + monthlyRate, n))) / (Math.pow(1 + monthlyRate, n) - 1);
  const totalPaid = monthlyPayment * n;
  const totalInterest = totalPaid - financed;
  return { otdPrice, financed, monthlyPayment, totalPaid, totalInterest };
}

export function isOverBudget(monthly: number, cap = MONTHLY_CAP_DEFAULT): boolean {
  return monthly > cap;
}

export function buildSearchUrls(make: string, model: string, zip: string, distance = 100, maxPrice = 28000) {
  const ms = make.toLowerCase();
  const md = model.toLowerCase().replace(/\s+/g, '-');
  return {
    cargurus: `https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?zip=${zip}&distance=${distance}&searchPriceMax=${maxPrice}&inventorySearchWidgetType=AUTO&entitySelectingHelper.selectedEntity=&showNegotiable=true&sortDir=ASC&sourceContext=carGurusHomePageModel&sortType=DEAL_SCORE`,
    carsCom: `https://www.cars.com/shopping/results/?stock_type=cpo&makes[]=${ms}&models[]=${ms}-${md}&list_price_max=${maxPrice}&maximum_distance=${distance}&zip=${zip}&year_min=2022`,
    autotrader: `https://www.autotrader.com/cars-for-sale/all-cars/${ms}/${md}/${zip}?searchRadius=${distance}&maxPrice=${maxPrice}&minYear=2022&listingTypes=CERTIFIED`,
    truecar: `https://www.truecar.com/used-cars-for-sale/listings/${ms}/${md}/location-${zip}/?searchRadius=${distance}&listPriceMax=${maxPrice}`,
    carmax: `https://www.carmax.com/cars/${ms}/${md}?zip=${zip}&distance=100&priceMax=${maxPrice}`
  };
}
