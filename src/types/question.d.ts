export interface Question {
  id: number;
  answer?: number;
}

export interface Option {
  id: number;
  label: string;
}
export interface Answer {
  title?: string;
  data: Array<Question>;
  options: Array<Option>;
}
