export default class ProviderCorporation {
    providerCorporationId?: number | null;
    isStaffingAgency?: boolean | null;
    name?: string | null;
    taxId?: string | null;
    streetAddress?: string | null;
    streetAddressLine2?: string | null;
    city?: string | null;
    state?: string | null;
    zipCode?: string | null;
    phoneNumber?: string | null;

  public constructor(params: ProviderCorporation = {} as ProviderCorporation) {
    let {
        providerCorporationId = 0,
        isStaffingAgency = false,
        name = "",
        taxId = "",
        streetAddress = "",
        streetAddressLine2 = "",
        city = "",
        state = "NY",
        zipCode = "",
        phoneNumber = "",
    } = params;
        this.providerCorporationId = providerCorporationId
        this.isStaffingAgency = isStaffingAgency
        this.name = name
        this.taxId = taxId
        this.streetAddress = streetAddress
        this.streetAddressLine2 = streetAddressLine2
        this.city = city
        this.state = state
        this.zipCode = zipCode
        this.phoneNumber = phoneNumber
  }
}