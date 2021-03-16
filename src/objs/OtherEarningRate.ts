
export default class Provider {
  amount?: number | null;
  canModify?: boolean | null;
  earningsCodeId?: number | null;
  effectiveDate?: Date | null;
  isHourlyRate?: boolean | null;
  isInEffect?: boolean | null;
  otherEarningsRateId?: number | null;
  providerId?: number | null;

  public constructor(params: Provider = {} as Provider) {
    let {
      amount = 0,
      canModify = false,
      earningsCodeId = 0,
      effectiveDate = null,
      isHourlyRate = false,
      isInEffect = false,
      otherEarningsRateId = 0,
      providerId = 0,
    } = params;
      this.amount = amount;
      this.canModify = canModify;
      this.earningsCodeId = earningsCodeId;
      this.effectiveDate = effectiveDate;
      this.isHourlyRate = isHourlyRate;
      this.isInEffect = isInEffect;
      this.otherEarningsRateId = otherEarningsRateId;
      this.providerId = providerId;
  }
}