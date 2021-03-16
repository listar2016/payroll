import ServiceProvidedCharge from './ServiceProvidedCharge'
import OtherEarningsCharge from './OtherEarningsCharge'

export default class RemittanceReport {
  remittanceReportId?: number | null;
  providerId?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  socialSecurityNumber?: string | null;
  company?: string | null;
  programs?: string[];
  startDate?: Date | null;
  endDate?: Date | null;
  isApproved?: boolean | null;
  isFlagged?: boolean | null;
  totalPayout?: number | null;
  servicePayments?: ServiceProvidedCharge[];
  otherEarnings?: OtherEarningsCharge[];

  public constructor(params: RemittanceReport = {} as RemittanceReport) {
    let {
      remittanceReportId = 0,
      providerId = 0,
      firstName = "",
      lastName = "",
      socialSecurityNumber = "",
      company = "",
      programs = new Array<string>(),
      startDate = null,
      endDate = null,
      isApproved = null,
      isFlagged = null,
      totalPayout = 0,
      servicePayments = new Array<ServiceProvidedCharge>(),
      otherEarnings = new Array<OtherEarningsCharge>(),
    } = params;

    this.remittanceReportId = remittanceReportId;
    this.providerId = providerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.socialSecurityNumber = socialSecurityNumber;
    this.company = company;
    this.programs = programs;
    this.startDate = startDate;
    this.endDate = endDate;
    this.isApproved = isApproved;
    this.isFlagged = isFlagged;
    this.totalPayout = totalPayout;
    this.servicePayments = servicePayments;
    this.otherEarnings = otherEarnings;
  }
}