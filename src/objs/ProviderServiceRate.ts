export default class ProviderServiceRate {
providerServiceRateId?: number | null;
providerId?: number | null;
effectiveDate?: Date | null;
dollarAmount?: number | null;
discipline?: string | null;
service?: string | null;
program?: string | null;
taxStatus?: string | null;
isGroup?: boolean | null;
groupSize?: number | null;
isBilingual?: boolean | null;
languages?: string[];
unitType?: string | null;

  public constructor(params: ProviderServiceRate = {} as ProviderServiceRate) {
    let {
      providerServiceRateId = 0,
      providerId = 0,
      effectiveDate = null,
      dollarAmount = 0,
      discipline = "",
      service = "",
      program = "",
      taxStatus = "",
      isGroup = null,
      groupSize = 0,
      isBilingual = null,
      languages = new Array<string>(),
      unitType = ""
    } = params;
    
    this.providerServiceRateId = providerServiceRateId;
    this.providerId = providerId;
    this.effectiveDate = effectiveDate;
    this.dollarAmount = dollarAmount;
    this.discipline = discipline;
    this.service = service;
    this.program = program;
    this.taxStatus = taxStatus;
    this.isGroup = isGroup;
    this.groupSize = groupSize;
    this.isBilingual = isBilingual;
    this.languages = languages;
    this.unitType = unitType;
  }
}