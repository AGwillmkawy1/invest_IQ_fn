import { Sectors, Stage } from "./enums";

export interface StartUp {
  id: string;
  email: string;
  name: string;
  phone: string;
  profilePic: string;
  stage: Stage;
  isActive: boolean;
  password: string;
  location: string;
  businessType: Sectors;
  growthRate: 0;
  cost: 0;
  capital: 0;
}

export interface Investor {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  profilePic: string;
  isActive: boolean;
}

export interface Fund {
  id: string;
  investorId: string;
  businessId: string;
  amount: number;
  startCost: number;
  endCost: number;
  numberOfDays: number;
  ROI: number;
}

export interface LoginReqDto {
  email: string;
  password: string;
  isInvestor: boolean;
}

export interface MessageDto {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  date: string;
}

export interface LoginRespDto {
  id: string;
  token: string;
  names: string;
  email: string;
  phone: string;
  stage?: string;
  profilePic: string;
}

export interface InvestorSignupDto {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  profilePic: string;
}

export interface StartUpSignupDto {
  email: string;
  name: string;
  phone: string;
  profilePic: string;
  stage: Stage;
  isActive: boolean;
  password: string;
  location: string;
  businessType: Sectors;
  growthRate: 0;
  cost: 0;
  capital: 0;
}

export type TStartUp = StartUpSignupDto & {
  id: string;
};

export interface Conversation {
  id: string;
  message: string;
  senderId: string;
  receiverId: string;
  isRead: boolean;
  createdAt: string;
}
