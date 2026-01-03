export interface User {
    id: string;
    email: string;
    name: string | null;
    role: 'ADMIN' | 'HR_OFFICER' | 'EMPLOYEE';
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface EmployeeProfile {
    id: string;
    phone: string | null;
    address: string | null;
    jobTitle: string | null;
    department: string | null;
    joiningDate: string | null;
    salary: number | null;
}

export interface LeaveRequest {
    id: string;
    type: 'SICK' | 'CASUAL' | 'EARNED';
    startDate: string;
    endDate: string;
    reason: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface User {
    id: string;
    email: string;
    name: string | null;
    role: 'ADMIN' | 'HR_OFFICER' | 'EMPLOYEE';
    employeeProfile?: EmployeeProfile | null;
}
