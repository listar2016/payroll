import RemittanceReport from './RemittanceReport'

export default class PayrollBatch {
  payrollBatchId?: number | null;
  name?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  paycheckDate?: Date | null;
  createdDate?: Date | null;
  closedDate?: Date | null;
  totalPayout?: number | null;
  remittanceReports?: RemittanceReport[];

  public constructor(params: PayrollBatch = {} as PayrollBatch) {
    let {
      payrollBatchId = 0,
      name = "",
      startDate = null,
      endDate = null,
      paycheckDate = null,
      createdDate = null,
      closedDate = null,
      totalPayout = 0,
      remittanceReports = new Array<RemittanceReport>(),
    } = params;
      this.payrollBatchId = payrollBatchId,
      this.name = name;
      this.startDate = startDate;
      this.endDate = endDate;
      this.paycheckDate = paycheckDate;
      this.createdDate = createdDate;
      this.closedDate = closedDate;
      this.totalPayout = totalPayout;
      this.remittanceReports = remittanceReports;
  }
}