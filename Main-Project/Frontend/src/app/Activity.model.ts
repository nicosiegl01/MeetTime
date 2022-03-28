export class Activity {
    constructor(
        private _id: number, 
        private _activity: string
    ){}

    get id(): number {
        return this._id;
      }
    
      set id(value: number) {
        this._id = value;
      }

      get activity(): string {
        return this._activity;
      }
    
      set activity(value: string) {
        this._activity = value;
      }
}