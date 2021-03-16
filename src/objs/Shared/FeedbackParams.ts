import FormField from "../Shared/FormField";

export default class FeedbackParams {
  message?: string | null;
  fromEmailAddress?: string | null;
  image?: string | null;
  public constructor(params: FeedbackParams = {} as FeedbackParams) {
    let { message = "", fromEmailAddress = "", image = "" } = params;
    this.message = message;
    this.fromEmailAddress = fromEmailAddress;
    this.image = image;
  }
}
