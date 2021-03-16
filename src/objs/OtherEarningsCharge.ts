export default class OtherEarningsCharge {
  otherEarningsChargeId?: number | null;
  rateSummary?: string | null;
  type?: string | null;
  aDPCode?: string | null;
  program?: string | null;
  details?: string | null;
  amount?: number | null;
  date?: Date | null;
  isApproved?: boolean | null;

  public constructor(params: OtherEarningsCharge = {} as OtherEarningsCharge) {
    let {
      otherEarningsChargeId = 0,
      rateSummary = '',
      type = '',
      aDPCode = '',
      program = '',
      details = '',
      amount = 0,
      date = null,
      isApproved = null
    } = params;
    
    this.otherEarningsChargeId = otherEarningsChargeId;
    this.rateSummary = rateSummary;
    this.type = type;
    this.aDPCode = aDPCode;
    this.program = program;
    this.details = details;
    this.amount = amount;
    this.date = date;
    this.isApproved = isApproved;
  }
}
