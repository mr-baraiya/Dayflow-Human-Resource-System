"use client"

import type React from "react"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit, Mail, Phone, MapPin, Calendar, Building, Briefcase, Upload, FileText, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import {
  getEmployees,
  updateEmployee,
  getDocuments,
  addDocument,
  deleteDocument,
  type Document,
} from "@/lib/local-storage"
import { getCurrentUser, setProfileImage as saveProfileImage, getProfileImage } from "@/lib/user-utils"
import { formatDate } from "@/lib/utils"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [documents, setDocuments] = useState<Document[]>([])
  const [profileImage, setProfileImage] = useState<string>("")
  const [profileData, setProfileData] = useState({
    id: 1,
    name: "John Doe",
    email: "john.doe@dayflow.com",
    phone: "+1 234 567 8901",
    address: "123 Main Street, New York, NY 10001",
    department: "Engineering",
    designation: "Senior Developer",
    dateOfJoining: "2024-01-15",
    employeeCode: "EMP001",
  })

  useEffect(() => {
    const currentUser = getCurrentUser()
    let currentEmployeeCode = "EMP001"

    if (currentUser) {
      currentEmployeeCode = currentUser.employeeId || "EMP001"
    }

    const employees = getEmployees()
    const currentEmployee = employees.find((e) => e.code === currentEmployeeCode)
    if (currentEmployee) {
      setProfileData({
        id: currentEmployee.id,
        name: currentEmployee.name,
        email: currentEmployee.email,
        phone: currentEmployee.phone,
        address: "123 Main Street, New York, NY 10001",
        department: currentEmployee.department,
        designation: currentEmployee.designation,
        dateOfJoining: currentEmployee.dateOfJoining,
        employeeCode: currentEmployee.code,
      })
      loadDocuments(currentEmployee.id)
      
      // Load profile image
      const savedImage = getProfileImage(currentEmployee.id)
      if (savedImage) {
        setProfileImage(savedImage)
      }
    }
  }, [])

  const loadDocuments = (employeeId: number) => {
    const docs = getDocuments(employeeId)
    setDocuments(docs)
  }

  const handleSaveChanges = () => {
    updateEmployee(profileData.id, {
      name: profileData.name,
      phone: profileData.phone,
    })
    setIsEditing(false)
  }

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      console.log("[v0] Uploading profile picture:", file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setProfileImage(base64String)
        
        // Save profile image using utility function
        saveProfileImage(profileData.id, base64String)
        
        console.log("[v0] Profile picture saved to localStorage")
      }
      reader.onerror = () => {
        alert('Failed to read image file')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log("[v0] Uploading document:", file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        const newDoc = addDocument({
          employeeId: profileData.id,
          name: file.name,
          type: file.type || "application/pdf",
          url: reader.result as string,
          uploadDate: new Date().toISOString().split("T")[0],
        })
        console.log("[v0] Document uploaded:", newDoc)
        loadDocuments(profileData.id)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteDocument = (id: number) => {
    if (confirm("Are you sure you want to delete this document?")) {
      deleteDocument(id)
      loadDocuments(profileData.id)
    }
  }

  return (
    <DashboardLayout role="employee" userName={profileData.name} userEmail={profileData.email}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground mt-1">View and manage your profile information</p>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "outline" : "default"}>
            {isEditing ? (
              "Cancel"
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-border lg:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profileImage || "/placeholder.svg?height=128&width=128"} />
                    <AvatarFallback className="text-4xl">{profileData.name?.charAt(0) || 'E'}</AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    id="profile-pic-upload"
                    className="hidden"
                    onChange={handleProfilePictureUpload}
                    accept="image/*"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full h-10 w-10"
                    asChild
                  >
                    <label htmlFor="profile-pic-upload" className="cursor-pointer flex items-center justify-center">
                      <Upload className="h-4 w-4" />
                    </label>
                  </Button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{profileData.name}</h2>
                  <p className="text-muted-foreground">{profileData.designation}</p>
                  <p className="text-sm text-primary mt-1">{profileData.employeeCode}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="bg-accent border-border"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-accent">
                        <span className="text-sm">{profileData.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-accent">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profileData.email}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="bg-accent border-border"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-accent">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{profileData.phone}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfJoining">Date of Joining</Label>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-accent">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formatDate(profileData.dateOfJoining)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      className="bg-accent border-border"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-accent">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profileData.address}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-accent">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profileData.department}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-accent">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profileData.designation}</span>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90" onClick={handleSaveChanges}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Documents</CardTitle>
            <div>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <Button asChild variant="outline" size="sm">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </label>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {documents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No documents uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-accent border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">Uploaded on {doc.uploadDate}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteDocument(doc.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
