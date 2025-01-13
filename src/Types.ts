export type Ingredient = {
    id: number;
    name: string;
    portion: number; //not included (0), single portion (1), double portion (2)
  };

export type Pizza = {
    name: string;
    crust: string;
    ingrendients: Ingredient[];
}