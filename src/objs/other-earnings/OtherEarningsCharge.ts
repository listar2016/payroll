export default class OtherEarningsCharge {
    otherEarningsChargeId?: number | null
    isScheduledDeduction?: boolean | null
    providerId?: number | null
    remittanceReportId?: number | null
    otherEarningsRateId?: number | null
    earningsCodeId?: number | null
    durationMinutes?: number | null
    isHourlyAmount?: boolean | null
    customAmount?: number | null
    chargeDate?: Date | null
    note?: string | null
    programId?: number | null
    omniCorporationDivisionId?: number | null

    public constructor(params: OtherEarningsCharge = {} as OtherEarningsCharge) {
        let { 
            otherEarningsChargeId = 0,
            isScheduledDeduction = false,
            providerId = null,
            remittanceReportId = null,
            otherEarningsRateId = 0,
            earningsCodeId = null,
            durationMinutes = null,
            isHourlyAmount = false,
            customAmount = null,
            chargeDate = null,
            note = "",
            programId = null,
            omniCorporationDivisionId = null,
        } = params;
        
            this.otherEarningsChargeId = otherEarningsChargeId
            this.isScheduledDeduction = isScheduledDeduction
            this.providerId = providerId
            this.remittanceReportId = remittanceReportId
            this.otherEarningsRateId = otherEarningsRateId
            this.earningsCodeId = earningsCodeId
            this.durationMinutes = durationMinutes
            this.isHourlyAmount = isHourlyAmount
            this.customAmount = customAmount
            this.chargeDate = chargeDate
            this.note = note
            this.programId = programId
            this.omniCorporationDivisionId = omniCorporationDivisionId
    }
}