import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Lock, Eye, Database, Mail } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={32} />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/signup">
              <Button variant="outline" size="sm">Sign Up</Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Back Button */}
        <div className="container px-4 pt-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
                  <p className="text-muted-foreground mt-1">Last updated: January 3, 2026</p>
                </div>
              </div>

              <Card className="mt-8">
                <CardContent className="p-8 space-y-8">
                  {/* Introduction */}
                  <section>
                    <p className="text-muted-foreground leading-relaxed">
                      At Dayflow HRMS, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Human Resource Management System.
                    </p>
                  </section>

                  {/* Information We Collect */}
                  <section className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Database className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
                        <div className="space-y-4 text-muted-foreground">
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                            <p>We collect information that you provide directly to us, including:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                              <li>Name, email address, and contact information</li>
                              <li>Employee ID and job-related information</li>
                              <li>Attendance and leave records</li>
                              <li>Payroll and salary information</li>
                              <li>Profile pictures and documents</li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                              <li>Device information and IP addresses</li>
                              <li>Browser type and operating system</li>
                              <li>Usage data and analytics</li>
                              <li>Cookies and similar tracking technologies</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* How We Use Your Information */}
                  <section className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Eye className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
                        <div className="space-y-2 text-muted-foreground">
                          <p>We use the collected information for the following purposes:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>To provide and maintain our HRMS services</li>
                            <li>To manage employee records and attendance</li>
                            <li>To process payroll and leave requests</li>
                            <li>To communicate important updates and notifications</li>
                            <li>To improve our services and user experience</li>
                            <li>To comply with legal obligations</li>
                            <li>To prevent fraud and ensure security</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Data Security */}
                  <section className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Lock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
                        <div className="space-y-2 text-muted-foreground">
                          <p>We implement appropriate technical and organizational measures to protect your personal information:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Encryption of data in transit and at rest</li>
                            <li>Role-based access control</li>
                            <li>Regular security audits and updates</li>
                            <li>Secure authentication mechanisms</li>
                            <li>Employee training on data protection</li>
                          </ul>
                          <p className="mt-3">
                            However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Information Sharing */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Information Sharing and Disclosure</h2>
                    <div className="text-muted-foreground space-y-2">
                      <p>We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>With your consent or at your direction</li>
                        <li>With authorized personnel within your organization</li>
                        <li>To comply with legal obligations or court orders</li>
                        <li>To protect our rights, property, or safety</li>
                        <li>With service providers who assist in our operations (under strict confidentiality agreements)</li>
                      </ul>
                    </div>
                  </section>

                  {/* Data Retention */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Data Retention</h2>
                    <p className="text-muted-foreground">
                      We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Employee data may be retained for legal and compliance purposes even after employment termination.
                    </p>
                  </section>

                  {/* Your Rights */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Your Rights</h2>
                    <div className="text-muted-foreground space-y-2">
                      <p>You have the following rights regarding your personal information:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><strong>Access:</strong> Request access to your personal data</li>
                        <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                        <li><strong>Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
                        <li><strong>Objection:</strong> Object to certain processing activities</li>
                        <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
                      </ul>
                    </div>
                  </section>

                  {/* Cookies */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Cookies and Tracking Technologies</h2>
                    <p className="text-muted-foreground">
                      We use cookies and similar tracking technologies to enhance your experience, analyze usage, and maintain security. You can control cookie preferences through your browser settings, though some features may not function properly if cookies are disabled.
                    </p>
                  </section>

                  {/* Children's Privacy */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Children's Privacy</h2>
                    <p className="text-muted-foreground">
                      Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware of such collection, we will take steps to delete the information promptly.
                    </p>
                  </section>

                  {/* Changes to Policy */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Changes to This Privacy Policy</h2>
                    <p className="text-muted-foreground">
                      We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                    </p>
                  </section>

                  {/* Contact */}
                  <section className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
                        <p className="text-muted-foreground">
                          If you have any questions about this Privacy Policy or our data practices, please contact us:
                        </p>
                        <div className="mt-3 space-y-1 text-muted-foreground">
                          <p>Email: privacy@dayflowhrms.com</p>
                          <p>Address: 123 Business Park, Tech City, TC 12345</p>
                          <p>Phone: +1 (555) 123-4567</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 mt-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Logo size={32} />
              <p className="text-sm text-muted-foreground">
                Modern HR management solution for businesses of all sizes
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                <li><Link href="/signup" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Dayflow HRMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
