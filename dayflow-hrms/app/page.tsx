import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  Calendar, 
  DollarSign, 
  FileText, 
  Shield, 
  BarChart3, 
  CheckCircle2 
} from "lucide-react"
import { Logo } from "@/components/ui/logo"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo size={32} />
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
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

      {/* Hero Section */}
      <section className="flex-1">
        <div className="container px-4 py-20 md:py-32">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Modern HR Management
                <span className="block text-primary">Simplified</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                Streamline your HR operations with Dayflow HRMS. Manage employees, track attendance, 
                process payroll, and handle leave requests all in one powerful platform.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Request Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
              Comprehensive HR tools designed to help you manage your workforce efficiently
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Employee Management</CardTitle>
                <CardDescription>
                  Complete employee profiles, onboarding, and document management
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Attendance Tracking</CardTitle>
                <CardDescription>
                  Real-time attendance monitoring with check-in/check-out capabilities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Leave Management</CardTitle>
                <CardDescription>
                  Simplified leave requests, approvals, and balance tracking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <DollarSign className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Payroll Processing</CardTitle>
                <CardDescription>
                  Automated salary calculations, deductions, and payment processing
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>
                  Insightful reports and analytics for better decision making
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Security & Compliance</CardTitle>
                <CardDescription>
                  Enterprise-grade security with role-based access control
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Time Tracking</CardTitle>
                <CardDescription>
                  Accurate time logs for projects and task management
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle2 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Easy Integration</CardTitle>
                <CardDescription>
                  Seamlessly integrate with your existing tools and workflows
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Why Choose Dayflow HRMS?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Save Time & Reduce Costs</h3>
                    <p className="text-muted-foreground">
                      Automate repetitive HR tasks and reduce administrative overhead
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Improve Employee Experience</h3>
                    <p className="text-muted-foreground">
                      Self-service portals and mobile access for better engagement
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Make Data-Driven Decisions</h3>
                    <p className="text-muted-foreground">
                      Access real-time analytics and insights for strategic planning
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Stay Compliant</h3>
                    <p className="text-muted-foreground">
                      Ensure compliance with labor laws and regulations
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-8 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-primary">10,000+</div>
                <p className="text-xl font-semibold">Employees Managed</p>
                <p className="text-muted-foreground">Trusted by businesses worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to Transform Your HR?
            </h2>
            <p className="text-lg opacity-90">
              Join hundreds of companies already using Dayflow HRMS to streamline their HR operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
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
                <li><Link href="#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
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
