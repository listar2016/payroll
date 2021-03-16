export default class SampleObject {
  subject?: string | null;
  content?: string | null;
  public constructor(params: SampleObject = {} as SampleObject) {
    let { subject = "", content = "" } = params;
    this.subject = subject;
    this.content = content;
  }
}
