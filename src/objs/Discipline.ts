
export default class Discipline {
    disciplineId?: number | null;
    name?: string | null;
  
    public constructor(params: Discipline = {} as Discipline) {
      let {
        disciplineId = 0,
        name = "",
      } = params;
        this.disciplineId = disciplineId,
        this.name = name;
    }
  }