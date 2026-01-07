"use client"

import type React from "react"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit, Mail, Phone, MapPin, Calendar, Building, Briefcase, Upload } from "lucide-react"
import { useState, useEffect } from "react"
import { initializeAdminUser, getCurrentUser, setProfileImage as saveProfileImageUtil, getProfileImage } from "@/lib/user-utils"
import { formatDate } from "@/lib/utils"

export default function AdminProfilePage() {
  // Initialize admin user
  useEffect(() => {
    initializeAdminUser()
  }, [])

  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState<string>("")
  const [profileData, setProfileData] = useState({
    id: 999,
    name: "Admin User",
    email: "admin@dayflow.com",
    phone: "+1 555 000 0000",
    address: "123 Admin Street, New York, NY 10001",
    department: "Administration",
    designation: "System Administrator",
    dateOfJoining: "2024-01-01",
    employeeCode: "ADMIN001",
  })

  useEffect(() => {
    const user = getCurrentUser()
    if (user && user.role === 'admin') {
      setProfileData({
        ...profileData,
        id: user.id,
        name: user.name,
        email: user.email,
      })
      
      // Load profile image
      const savedImage = getProfileImage(user.id)
      if (savedImage) {
        setProfileImage(savedImage)
      }
    }
  }, [])

  const handleSaveChanges = () => {
    // In a real app, you would update the admin user in the backend
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

      console.log("[Admin] Uploading profile picture:", file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setProfileImage(base64String)
        
        // Save profile image using utility function
        saveProfileImageUtil(profileData.id, base64String)
        
        console.log("[Admin] Profile picture saved to localStorage")
      }
      reader.onerror = () => {
        alert('Failed to read image file')
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <DashboardLayout role="admin" userName={profileData.name} userEmail={profileData.email}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Profile</h1>
            <p className="text-muted-foreground mt-1">View and manage your admin profile</p>
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
                    <AvatarFallback className="text-4xl">{profileData.name?.charAt(0) || 'A'}</AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    id="admin-profile-pic-upload"
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
                    <label htmlFor="admin-profile-pic-upload" className="cursor-pointer flex items-center justify-center">
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
      </div>
    </DashboardLayout>
  )
}
