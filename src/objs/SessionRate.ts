
import Language from './Language'

export default class Provider {
    sessionRateId?: number | null;
    providerId?: number | null;
    effectiveDate?: Date | null;
    isInEffect?: boolean | null;
    dollarAmount?: number | null;
    taxStatusId?: number | null;
    isGroup?: boolean | null;
    groupSize?: number | null;
    groupSizeMin?: number | null;
    groupSizeMax?: number | null;
    isBilingual?: boolean | null;
    programId?: number | null;
    rateUnitTypeId?: number | null;
    serviceId?: number | null;
    sessionLocationCategory?: string | null;
    sessionLocationId?: number | null;
    canModify?: boolean | null;
    providerCorporationId?: number | null;
    providerCorporation?: string | null;
    languages?: Language[] | null;

  public constructor(params: Provider = {} as Provider) {
    let {
        sessionRateId = 0,
        providerId = 0,
        effectiveDate = null,
        isInEffect = false,
        dollarAmount = 0,
        taxStatusId = null,
        isGroup = false,
        groupSize = 0,
        groupSizeMin = 0,
        groupSizeMax = 0,
        isBilingual = false,
        programId = null,
        rateUnitTypeId = null,
        serviceId = null,
        sessionLocationCategory = "",
        sessionLocationId = null,
        canModify = false,
        providerCorporationId = null,
        providerCorporation = "",
        languages = Array<Language>(),
    } = params;
        this.sessionRateId = sessionRateId
        this.providerId = providerId
        this.effectiveDate = effectiveDate
        this.isInEffect = isInEffect
        this.dollarAmount = dollarAmount
        this.taxStatusId = taxStatusId
        this.isGroup = isGroup
        this.groupSize = groupSize
        this.groupSizeMin = groupSizeMin
        this.groupSizeMax = groupSizeMax
        this.isBilingual = isBilingual
        this.programId = programId
        this.rateUnitTypeId = rateUnitTypeId
        this.serviceId = serviceId
        this.sessionLocationCategory = sessionLocationCategory
        this.sessionLocationId = sessionLocationId
        this.canModify = canModify
        this.providerCorporationId = providerCorporationId
        this.providerCorporation = providerCorporation
        this.languages = languages
  }
}