import ServiceSummary from './ServiceSummary';
import ProviderServiceRate from './ProviderServiceRate';

export default class ServiceProvidedCharge {
  serviceProvidedChargeId?: number | null;
  service?: ServiceSummary | null;
  rate?: ProviderServiceRate | null;
  aDPCode?: string | null;
  calculatedPayout?: number | null;
  adjustedPayout?: number | null;
  adjustmentExplanation?: string | null;
  flags?: string[];
  isApproved?: boolean | null;

  public constructor(params: ServiceProvidedCharge = {} as ServiceProvidedCharge) {
    let {
      serviceProvidedChargeId = 0,
      service = new ServiceSummary(),
      rate = new ProviderServiceRate(),
      aDPCode = "",
      calculatedPayout = 0,
      adjustedPayout = 0,
      adjustmentExplanation = "",
      flags = new Array<string>(),
      isApproved = null,
    } = params;

    this.serviceProvidedChargeId = serviceProvidedChargeId;
    this.service = service;
    this.rate = rate;
    this.aDPCode = aDPCode;
    this.calculatedPayout = calculatedPayout;
    this.adjustedPayout = adjustedPayout;
    this.adjustmentExplanation = adjustmentExplanation;
    this.flags = flags;
    this.isApproved = isApproved;
  }
}