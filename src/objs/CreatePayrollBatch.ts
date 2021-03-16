export default class CreatePayrollBatch {
  name?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  paycheckDate?: Date | null;
  public constructor(params: CreatePayrollBatch = {} as CreatePayrollBatch) {
    let { 
      name = "", 
      startDate = null,
      endDate = null,
      paycheckDate = null
    } = params;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.paycheckDate = paycheckDate;
  }
}