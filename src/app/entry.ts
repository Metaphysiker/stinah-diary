export interface Entry {
    content: string;
    _id?: number;
    animal_id?: number;
    updatedAt?: Date;
    createdAt?: Date;
    animal?: {
      name?: string,
      _id?: string 
    };
    images?: Array<any>;
}
