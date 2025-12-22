export interface Department {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    doctors: Doctor[];
};

export interface Doctor {
  id: number;
  firstname: string;
  lastname: string;
  gender: string;
  address: string;
  phonenum: string;
  avatar: string;
  bio?: string;
  certification?: string;
  education?: string;
  experience?: string;
  workinghour?: string;
}

export type DoctorProfile = {
  id: number;
  firstname: string;
  lastname: string;
  gender?: string;
  dob?: string;
  address?: string;
  phonenum?: string;
  avatar?: string;
  bio?: string;
  education?: string;
  experience?: string;
  certification?: string;
  workinghour?: string;
};

export interface Account {
  email: string;
  role: string;
  status: boolean;
}

export type AdminDTO = {
  id?: number | string;
  firstname?: string;
  lastname?: string;
  dob?: string;
  gender?: string;
  address?: string;
  phonenum?: string;
  avatar?: string;
  email?: string;
};

export type Post = {
    id: number;
	created: string;
	updated: string;
	title: string;
	type: string;
	content: string;
	image: string;
    account_email: string
}

export type Prediction = {
    id?: number;
    symptoms: string;
    prediction: string;
    datetime: string
}
