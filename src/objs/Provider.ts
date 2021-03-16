import Language from './Language'
import Discipline from './Discipline'

export default class Provider {
    providerId?: number | null;
    legacyProviderId?: string | null;
    title?: string | null;
    firstName?: string | null;
    middleInitial?: string | null;
    lastName?: string | null;
    gender?: string | null;
    streetAddress?: string | null;
    streetAddressLine2?: string | null;
    city?: string | null;
    state?: string | null;
    zipCode?: string | null;
    homePhone?: string | null;
    mobilePhone?: string | null;
    workPhone?: string | null;
    preferredPhone?: string | null;
    emailAddress?: string | null;
    appStartDate?: string | null;
    languages?: Language[] | null;
    disciplines?: Discipline[] | null;

  public constructor(params: Provider = {} as Provider) {
    let {
        providerId = 0,
        legacyProviderId = "",
        title = "",
        firstName = "",
        middleInitial = "",
        lastName = "",
        gender = "",
        streetAddress = "",
        streetAddressLine2 = "",
        city = "",
        state = "",
        zipCode = "",
        homePhone = "",
        mobilePhone = "",
        workPhone = "",
        preferredPhone = "",
        emailAddress = "",
        appStartDate = "",
        languages = new Array<Language>(),
        disciplines = new Array<Discipline>(),
    } = params;
        this.providerId = providerId
        this.legacyProviderId = legacyProviderId
        this.title = title
        this.firstName = firstName
        this.middleInitial = middleInitial
        this.lastName = lastName
        this.gender = gender
        this.streetAddress = streetAddress
        this.streetAddressLine2 = streetAddressLine2
        this.city = city
        this.state = state
        this.zipCode = zipCode
        this.homePhone = homePhone
        this.mobilePhone = mobilePhone
        this.workPhone = workPhone
        this.preferredPhone = preferredPhone
        this.emailAddress = emailAddress
        this.appStartDate = appStartDate
        this.languages = languages
        this.disciplines = disciplines
  }
}