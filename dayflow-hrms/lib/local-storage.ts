// Local storage utilities for managing HRMS data

export interface Employee {
  id: number
  name: string
  email: string
  phone: string
  code: string
  department: string
  designation: string
  status: "active" | "inactive"
  dateOfJoining: string
  salary: number
}

export interface AttendanceRecord {
  id: number
  employeeId: number
  employeeName: string
  employeeCode: string
  date: string
  checkIn: string
  checkOut: string
  status: "present" | "absent" | "half-day" | "leave"
  hours: string
}

export interface LeaveRequest {
  id: number
  employeeId: number
  employeeName: string
  employeeCode: string
  type: string
  startDate: string
  endDate: string
  days: number
  reason: string
  status: "pending" | "approved" | "rejected"
  appliedDate: string
}

// Added User interface
export interface User {
  id: number
  employeeId: string
  email: string
  password: string
  role: "employee" | "admin"
  verified: boolean
}

// Added Document interface
export interface Document {
  id: number
  employeeId: number
  name: string
  type: string
  url: string
  uploadDate: string
}

// Initialize with mock data if empty
const initializeEmployees = (): Employee[] => {
  return [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@dayflow.com",
      phone: "+1 234 567 8901",
      code: "EMP001",
      department: "Engineering",
      designation: "Senior Developer",
      status: "active",
      dateOfJoining: "2024-01-15",
      salary: 85000,
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah.smith@dayflow.com",
      phone: "+1 234 567 8902",
      code: "EMP002",
      department: "Marketing",
      designation: "Marketing Manager",
      status: "active",
      dateOfJoining: "2024-02-20",
      salary: 75000,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@dayflow.com",
      phone: "+1 234 567 8903",
      code: "EMP003",
      department: "Sales",
      designation: "Sales Executive",
      status: "active",
      dateOfJoining: "2024-03-10",
      salary: 65000,
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily.brown@dayflow.com",
      phone: "+1 234 567 8904",
      code: "EMP004",
      department: "HR",
      designation: "HR Specialist",
      status: "inactive",
      dateOfJoining: "2024-04-05",
      salary: 60000,
    },
  ]
}

const initializeAttendance = (): AttendanceRecord[] => {
  return [
    {
      id: 1,
      employeeId: 1,
      employeeName: "John Doe",
      employeeCode: "EMP001",
      date: "2026-01-03",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      status: "present",
      hours: "9h",
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: "Sarah Smith",
      employeeCode: "EMP002",
      date: "2026-01-03",
      checkIn: "08:45 AM",
      checkOut: "05:45 PM",
      status: "present",
      hours: "9h",
    },
    {
      id: 3,
      employeeId: 3,
      employeeName: "Mike Johnson",
      employeeCode: "EMP003",
      date: "2026-01-03",
      checkIn: "-",
      checkOut: "-",
      status: "absent",
      hours: "0h",
    },
    {
      id: 4,
      employeeId: 4,
      employeeName: "Emily Brown",
      employeeCode: "EMP004",
      date: "2026-01-03",
      checkIn: "09:00 AM",
      checkOut: "01:00 PM",
      status: "half-day",
      hours: "4h",
    },
  ]
}

const initializeLeaves = (): LeaveRequest[] => {
  return [
    {
      id: 1,
      employeeId: 1,
      employeeName: "John Doe",
      employeeCode: "EMP001",
      type: "Annual Leave",
      startDate: "2026-01-15",
      endDate: "2026-01-20",
      days: 6,
      reason: "Family vacation",
      status: "pending",
      appliedDate: "2026-01-02",
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: "Sarah Smith",
      employeeCode: "EMP002",
      type: "Sick Leave",
      startDate: "2026-01-10",
      endDate: "2026-01-12",
      days: 3,
      reason: "Medical appointment",
      status: "approved",
      appliedDate: "2026-01-01",
    },
  ]
}

// Employee CRUD operations
export const getEmployees = (): Employee[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("employees")
  if (!data) {
    const initial = initializeEmployees()
    localStorage.setItem("employees", JSON.stringify(initial))
    return initial
  }
  return JSON.parse(data)
}

export const addEmployee = (employee: Omit<Employee, "id">): Employee => {
  const employees = getEmployees()
  const newEmployee = { ...employee, id: Date.now() }
  employees.push(newEmployee)
  localStorage.setItem("employees", JSON.stringify(employees))
  return newEmployee
}

export const updateEmployee = (id: number, updates: Partial<Employee>): Employee | null => {
  const employees = getEmployees()
  const index = employees.findIndex((e) => e.id === id)
  if (index === -1) return null
  employees[index] = { ...employees[index], ...updates }
  localStorage.setItem("employees", JSON.stringify(employees))
  return employees[index]
}

export const deleteEmployee = (id: number): boolean => {
  const employees = getEmployees()
  const filtered = employees.filter((e) => e.id !== id)
  if (filtered.length === employees.length) return false
  localStorage.setItem("employees", JSON.stringify(filtered))
  return true
}

// Attendance CRUD operations
export const getAttendance = (): AttendanceRecord[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("attendance")
  if (!data) {
    const initial = initializeAttendance()
    localStorage.setItem("attendance", JSON.stringify(initial))
    return initial
  }
  return JSON.parse(data)
}

export const addAttendance = (record: Omit<AttendanceRecord, "id">): AttendanceRecord => {
  const records = getAttendance()
  const newRecord = { ...record, id: Date.now() }
  records.push(newRecord)
  localStorage.setItem("attendance", JSON.stringify(records))
  return newRecord
}

export const updateAttendance = (id: number, updates: Partial<AttendanceRecord>): AttendanceRecord | null => {
  const records = getAttendance()
  const index = records.findIndex((r) => r.id === id)
  if (index === -1) return null
  records[index] = { ...records[index], ...updates }
  localStorage.setItem("attendance", JSON.stringify(records))
  return records[index]
}

// Leave CRUD operations
export const getLeaves = (): LeaveRequest[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("leaves")
  if (!data) {
    const initial = initializeLeaves()
    localStorage.setItem("leaves", JSON.stringify(initial))
    return initial
  }
  return JSON.parse(data)
}

export const addLeave = (leave: Omit<LeaveRequest, "id">): LeaveRequest => {
  const leaves = getLeaves()
  const newLeave = { ...leave, id: Date.now() }
  leaves.push(newLeave)
  localStorage.setItem("leaves", JSON.stringify(leaves))
  return newLeave
}

export const updateLeave = (id: number, updates: Partial<LeaveRequest>): LeaveRequest | null => {
  const leaves = getLeaves()
  const index = leaves.findIndex((l) => l.id === id)
  if (index === -1) return null
  leaves[index] = { ...leaves[index], ...updates }
  localStorage.setItem("leaves", JSON.stringify(leaves))
  return leaves[index]
}

// User authentication
export const getUsers = (): User[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("users")
  if (!data) {
    const initial: User[] = [
      { id: 1, employeeId: "EMP001", email: "admin@dayflow.com", password: "admin123", role: "admin", verified: true },
      { id: 2, employeeId: "EMP002", email: "user@dayflow.com", password: "user123", role: "employee", verified: true },
    ]
    localStorage.setItem("users", JSON.stringify(initial))
    return initial
  }
  return JSON.parse(data)
}

export const addUser = (user: Omit<User, "id">): User => {
  const users = getUsers()
  const newUser = { ...user, id: Date.now() }
  users.push(newUser)
  localStorage.setItem("users", JSON.stringify(users))
  return newUser
}

// Initialize default admin user
export const initializeDefaultAdmin = (): void => {
  if (typeof window === "undefined") return
  
  const users = getUsers()
  const adminExists = users.some(u => u.email === "baraiyanayanbhai32@gmail.com")
  
  if (!adminExists) {
    addUser({
      employeeId: "ADMIN001",
      email: "baraiyanayanbhai32@gmail.com",
      password: "Nayan@1878",
      role: "admin",
      verified: true
    })
  }
}

// Document management
export const getDocuments = (employeeId?: number): Document[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("documents")
  const documents: Document[] = data ? JSON.parse(data) : []
  return employeeId ? documents.filter((d) => d.employeeId === employeeId) : documents
}

export const addDocument = (doc: Omit<Document, "id">): Document => {
  const documents = getDocuments()
  const newDoc = { ...doc, id: Date.now() }
  documents.push(newDoc)
  localStorage.setItem("documents", JSON.stringify(documents))
  return newDoc
}

export const deleteDocument = (id: number): boolean => {
  const documents = getDocuments()
  const filtered = documents.filter((d) => d.id !== id)
  if (filtered.length === documents.length) return false
  localStorage.setItem("documents", JSON.stringify(filtered))
  return true
}

export const checkIn = (employeeId: number, employeeName: string, employeeCode: string): AttendanceRecord => {
  const now = new Date()
  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  const date = now.toISOString().split("T")[0]

  const record: Omit<AttendanceRecord, "id"> = {
    employeeId,
    employeeName,
    employeeCode,
    date,
    checkIn: time,
    checkOut: "-",
    status: "present",
    hours: "0h",
  }

  return addAttendance(record)
}

export const checkOut = (attendanceId: number): AttendanceRecord | null => {
  const records = getAttendance()
  const record = records.find((r) => r.id === attendanceId)

  if (!record) return null

  const now = new Date()
  const checkOutTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

  // Calculate hours (simplified)
  const hours = Math.floor(Math.random() * 3) + 8 // 8-10 hours for demo

  return updateAttendance(attendanceId, {
    checkOut: checkOutTime,
    hours: `${hours}h`,
  })
}
