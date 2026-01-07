import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileText, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export default function TermsOfServicePage() {
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
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
                  <p className="text-muted-foreground mt-1">Last updated: January 3, 2026</p>
                </div>
              </div>

              <Card className="mt-8">
                <CardContent className="p-8 space-y-8">
                  {/* Introduction */}
                  <section>
                    <p className="text-muted-foreground leading-relaxed">
                      Welcome to Dayflow HRMS. These Terms of Service ("Terms") govern your access to and use of our Human Resource Management System. By accessing or using our services, you agree to be bound by these Terms.
                    </p>
                  </section>

                  {/* Acceptance of Terms */}
                  <section className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-semibold mb-3">Acceptance of Terms</h2>
                        <div className="space-y-2 text-muted-foreground">
                          <p>By creating an account or using Dayflow HRMS, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must not access or use our services.</p>
                          <p>These Terms apply to all users, including administrators, HR managers, and employees.</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Account Registration */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Account Registration and Security</h2>
                    <div className="text-muted-foreground space-y-3">
                      <p>To use Dayflow HRMS, you must:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Provide accurate and complete registration information</li>
                        <li>Maintain the security of your account credentials</li>
                        <li>Be at least 18 years of age</li>
                        <li>Have the authority to bind your organization to these Terms</li>
                        <li>Notify us immediately of any unauthorized access</li>
                      </ul>
                      <p className="mt-3">You are responsible for all activities that occur under your account.</p>
                    </div>
                  </section>

                  {/* Service Description */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Service Description</h2>
                    <div className="text-muted-foreground space-y-2">
                      <p>Dayflow HRMS provides the following services:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Employee information management</li>
                        <li>Attendance tracking and monitoring</li>
                        <li>Leave request and approval workflows</li>
                        <li>Payroll processing and management</li>
                        <li>Reporting and analytics</li>
                        <li>Document storage and management</li>
                      </ul>
                      <p className="mt-3">We reserve the right to modify, suspend, or discontinue any part of our services at any time with reasonable notice.</p>
                    </div>
                  </section>

                  {/* User Responsibilities */}
                  <section className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-semibold mb-3">User Responsibilities</h2>
                        <div className="text-muted-foreground space-y-3">
                          <p>When using our services, you agree to:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Comply with all applicable laws and regulations</li>
                            <li>Use the service only for lawful business purposes</li>
                            <li>Maintain accurate and up-to-date employee information</li>
                            <li>Respect the privacy and rights of other users</li>
                            <li>Not attempt to gain unauthorized access to our systems</li>
                            <li>Not interfere with or disrupt the service</li>
                            <li>Not use automated systems to access the service without permission</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Prohibited Activities */}
                  <section className="space-y-4">
                    <div className="flex items-start gap-3">
                      <XCircle className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-semibold mb-3">Prohibited Activities</h2>
                        <div className="text-muted-foreground space-y-2">
                          <p>You must not:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Upload malicious code, viruses, or harmful content</li>
                            <li>Attempt to reverse engineer or decompile the service</li>
                            <li>Resell or redistribute access to the service</li>
                            <li>Impersonate another user or organization</li>
                            <li>Collect or harvest data from other users</li>
                            <li>Use the service to send spam or unsolicited communications</li>
                            <li>Violate any intellectual property rights</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Data Ownership */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Data Ownership and Licensing</h2>
                    <div className="text-muted-foreground space-y-3">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Your Data</h3>
                        <p>You retain all ownership rights to the data you submit to Dayflow HRMS. By using our services, you grant us a limited license to store, process, and display your data solely for the purpose of providing our services.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Our Intellectual Property</h3>
                        <p>The Dayflow HRMS platform, including its design, features, and functionality, is owned by us and protected by intellectual property laws. You may not copy, modify, or create derivative works without our express permission.</p>
                      </div>
                    </div>
                  </section>

                  {/* Payment Terms */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Payment and Subscription</h2>
                    <div className="text-muted-foreground space-y-2">
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                        <li>All fees are non-refundable unless otherwise stated</li>
                        <li>We reserve the right to change pricing with 30 days notice</li>
                        <li>Failure to pay may result in suspension or termination of services</li>
                        <li>You are responsible for all taxes associated with your subscription</li>
                      </ul>
                    </div>
                  </section>

                  {/* Service Availability */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Service Availability and Support</h2>
                    <div className="text-muted-foreground space-y-2">
                      <p>We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. We may perform scheduled maintenance with advance notice. Support is available via email during business hours.</p>
                    </div>
                  </section>

                  {/* Limitation of Liability */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
                    <div className="text-muted-foreground space-y-2">
                      <p className="font-semibold text-foreground">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>We are not liable for indirect, incidental, or consequential damages</li>
                        <li>Our total liability shall not exceed the amount paid by you in the past 12 months</li>
                        <li>We provide the service "as is" without warranties of any kind</li>
                        <li>We are not responsible for data loss due to user error or third-party actions</li>
                      </ul>
                    </div>
                  </section>

                  {/* Indemnification */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Indemnification</h2>
                    <p className="text-muted-foreground">
                      You agree to indemnify and hold harmless Dayflow HRMS from any claims, losses, damages, or expenses arising from your use of the service, violation of these Terms, or infringement of any third-party rights.
                    </p>
                  </section>

                  {/* Termination */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Termination</h2>
                    <div className="text-muted-foreground space-y-3">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">By You</h3>
                        <p>You may terminate your account at any time by contacting support. You remain responsible for all charges incurred prior to termination.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">By Us</h3>
                        <p>We may suspend or terminate your account if you violate these Terms, fail to pay, or engage in fraudulent activity. We will provide reasonable notice when possible.</p>
                      </div>
                    </div>
                  </section>

                  {/* Data Export */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Data Export and Deletion</h2>
                    <p className="text-muted-foreground">
                      Upon termination, you may request a copy of your data within 30 days. After this period, we will delete your data in accordance with our data retention policy, except as required by law.
                    </p>
                  </section>

                  {/* Dispute Resolution */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Dispute Resolution</h2>
                    <div className="text-muted-foreground space-y-2">
                      <p>Any disputes arising from these Terms shall be resolved through:</p>
                      <ol className="list-decimal list-inside space-y-1 ml-4">
                        <li>Good faith negotiation between the parties</li>
                        <li>Mediation if negotiation fails</li>
                        <li>Binding arbitration as a last resort</li>
                      </ol>
                      <p className="mt-3">These Terms are governed by the laws of the jurisdiction where our company is registered.</p>
                    </div>
                  </section>

                  {/* Changes to Terms */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Changes to These Terms</h2>
                    <p className="text-muted-foreground">
                      We may update these Terms from time to time. We will notify you of material changes via email or through the service. Your continued use after such notice constitutes acceptance of the updated Terms.
                    </p>
                  </section>

                  {/* Severability */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Severability</h2>
                    <p className="text-muted-foreground">
                      If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                    </p>
                  </section>

                  {/* Contact */}
                  <section className="space-y-4 border-t pt-6">
                    <h2 className="text-2xl font-semibold">Contact Information</h2>
                    <p className="text-muted-foreground">
                      If you have questions about these Terms of Service, please contact us:
                    </p>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Email: legal@dayflowhrms.com</p>
                      <p>Address: 123 Business Park, Tech City, TC 12345</p>
                      <p>Phone: +1 (555) 123-4567</p>
                    </div>
                  </section>

                  {/* Acknowledgment */}
                  <section className="bg-muted/50 p-6 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      By using Dayflow HRMS, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                    </p>
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
