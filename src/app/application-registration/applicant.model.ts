export interface Applicant {
    appNumber: string;
    firstName: string;
    middleName: string;
    lastName: string;
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phoneNumber: string;
    phoneType: string;
    altPhoneNumber?: string;
    altPhoneType?: string;  
    email: string;
    id: string;
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

 export interface States {
    code: string;
    name: string; 
}


export const States : States[] = [
    { name: "North Carolina", code: "NC" },
        { name: "Indiana", code: "IN" },
        { name: "Wyoming", code: "WY" },
        { name: "Utah", code: "UT" },
        { name: "Arizona", code: "AZ" },
        { name: "Montana", code: "MT" },
        { name: "Kentucky", code: "KY" },
        { name: "California", code: "CA" },
        { name: "Kansas", code: "KS" },
        { name: "Delaware", code: "DE" },
        { name: "Florida", code: "FL" },
        { name: "Pennsylvania", code: "PA" },
        { name: "Iowa", code: "IA" },
        { name: "Mississippi", code: "MS" },
        { name: "Illinois", code: "IL" },
        { name: "Texas", code: "TX" },
        { name: "Connecticut", code: "CT" },
        { name: "Georgia", code: "GA" },
        { name: "Maryland", code: "MD" },
        { name: "Virginia", code: "VA" },
        { name: "Idaho", code: "ID" },
        { name: "Oregon", code: "OR" },
        { name: "Vermont", code: "VT" },
        { name: "Maine", code: "ME" },
        { name: "Oklahoma", code: "OK" },
        { name: "Tennessee", code: "TN" },
        { name: "Alabama", code: "AL" },
        { name: "Arkansas", code: "AR" },
        { name: "South Carolina", code: "SC" },
        { name: "Washington", code: "WA" },
        { name: "Nebraska", code: "NE" },
        { name: "West Virginia", code: "WV" },
        { name: "Colorado", code: "CO" },
        { name: "Massachusetts", code: "MA" },
        { name: "Missouri", code: "MO" },
        { name: "Alaska", code: "AK" },
        { name: "North Dakota", code: "ND" },
        { name: "Wisconsin", code: "WI" },
        { name: "Nevada", code: "NV" },
        { name: "New York", code: "NY" },
        { name: "Rhode Island", code: "RI" },
        { name: "Hawaii", code: "HI" },
        { name: "South Dakota", code: "SD" },
        { name: "Minnesota", code: "MN" },
        { name: "New Jersey", code: "NJ" },
        { name: "Michigan", code: "MI" },
        { name: "New Mexico", code: "NM" },
        { name: "New Hampshire", code: "NH" },
        { name: "Louisiana", code: "LA" },
        { name: "Ohio", code: "OH" },
]
