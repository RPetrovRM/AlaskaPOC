export interface Applicant {
    appNumber: number;
    firstName: string;
    middleName: string;
    lastName: string;
    id: number;
    lastUpdated: string;
    dateOfBirth: string;
    appType: string;
    programType: string;
    office: string;
    appDate: string;
    additionalHouseholdMembers: boolean;
    suffix?: string;
    gender: string;
    title: string;
    birthLastName: string;   
 }