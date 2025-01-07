export interface SignupTypes {
  name: string;
  email: string;
  userName: string;
  station: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

export interface VerificationTypes {
  form: FormTypes;
  photo: string | null;
}

export interface FormTypes {
  name: string;
  mrn: string;
  fileNumber: string;
  dateOfBirth: string;
  phone: string;
  ethnicGroup: string;
  stateOforigin: string;
  residentialAddress: string;
  occupation: string;
  familyHouseName: string;
  fhrn: string;
  nin: string;
  bvn: string;
}

export interface VerifiedStudentsType {
  status: number;
  message: string;
  amount: number;
  data: StudentType[];
}

export interface StudentType {
  name: string;
  mrn: string;
  fileNumber: string;
  dateOfBirth: string;
  phone: string;
  ethnicGroup: string;
  stateOfOrigin: string;
  residentialAddress: string;
  occupation: string;
  familyHouseName: string;
  fhrn: string;
  nin: string;
  bvn: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  sequentialId?: number;
}
