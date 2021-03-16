export default class ServiceSummary {
  serviceProvidedId?: number | null;
  clientId?: number | null;
  startTime?: Date | null;
  endTime?: Date | null;
  clientFirstName?: string | null;
  clientLastName?: string | null;
  service?: string | null;
  program?: string | null;
  serviceLocation?: string | null;
  groupId?: number | null;
  groupSize?: number | null;
  public constructor(params: ServiceSummary = {} as ServiceSummary) {
    let { 
      serviceProvidedId = 0, 
      clientId = 0 ,
      startTime = null,
      endTime = null,
      clientFirstName = null,
      clientLastName = null,
      service = null,
      program = null,
      serviceLocation = null,
      groupId = null,
      groupSize = null
    } = params;
    
    this.serviceProvidedId = serviceProvidedId;
    this.clientId = clientId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.clientFirstName = clientFirstName;
    this.clientLastName = clientLastName;
    this.service = service;
    this.program = program;
    this.serviceLocation = serviceLocation;
    this.groupId = groupId;
    this.groupSize = groupSize;
  }
}