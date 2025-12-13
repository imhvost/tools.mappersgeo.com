export interface Answer {
  answer?: string;
  val: string;
  points?: number;
  answers: Answer;
  report?: string;
  report_color: 'default' | 'green' | 'red' | 'orange' | 'black';
  sub_questions: Quiz[];
}

export interface Quiz {
  question: string;
  name: string;
  input_type: 'radio' | 'checkbox' | 'custom';
  answers: Answer[];
}

export interface Question {
  id: number;
  title: string;
  name: string;
  introduction?: string;
  quiz: Quiz;
  condition?: string;
  condition_alert?: string;
  condition_ok?: string;
  initial_score?: number;
}
