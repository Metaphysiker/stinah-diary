export interface Entry {
    collection_name: string;
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
