export interface Answer {
  answer?: string;
  val: string;
  points?: number;
  answers: Answer;
  report?: string;
  report_color: 'default' | 'green' | 'red' | 'orange' | 'black';
  sub_questions: Question[];
}

export interface Question {
  question: string;
  name: string;
  input_type: 'radio' | 'checkbox' | 'custom';
  answers: Answer[];
  do?: string;
  auditor_note?: string;
  desc?: string;
  condition?: string;
}

export interface Section {
  id: number;
  title: string;
  name: string;
  introduction?: string;
  quiz: Question[];
  condition?: string;
  condition_alert?: string;
  condition_ok?: string;
  initial_score?: number;
}

export interface Audit {
  [key: number]: Record<string, string>;
}

export interface QuizMeta {
  strings: Record<string, string>;
  urls: Record<string, string>;
}
