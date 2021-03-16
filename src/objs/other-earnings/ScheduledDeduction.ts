export default class ScheduledDeduction {
    scheduledDeductionId?: number | null;
    amount?: number | null;
    earningsCodeId?: number | null;
    providerId?: number | null;
    effectiveDate?: Date | null;
    isActive?: boolean | null;
    omniCorporationDivisionId?: number | null;

    public constructor(params: ScheduledDeduction = {} as ScheduledDeduction) {
        let { 
            scheduledDeductionId = 0,
            amount = 0,
            earningsCodeId = null,
            providerId = null,
            effectiveDate = null,
            isActive = false,
            omniCorporationDivisionId = null,
        } = params;
        
        this.scheduledDeductionId = scheduledDeductionId
        this.amount = amount
        this.earningsCodeId = earningsCodeId
        this.providerId = providerId
        this.effectiveDate = effectiveDate
        this.isActive = isActive
        this.omniCorporationDivisionId = omniCorporationDivisionId
    }
}