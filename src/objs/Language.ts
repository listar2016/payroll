
export default class Language {
    languageId?: number | null;
    name?: string | null;
  
    public constructor(params: Language = {} as Language) {
      let {
        languageId = 0,
        name = "",
      } = params;
        this.languageId = languageId,
        this.name = name;
    }
  }